const passport = require('passport');
const {sendEmail} = require('../services/mailer');
const User = require('../models/user');
const Role = require('../models/role')
const bcrypt = require('bcryptjs');
const UserStatistics = require('../models/statistics');

class authController {
    async renderPage(req, res) {
        try {
            res.render('auth', {
                title: 'Авторизация/Регистрация',
                isAuthPage: true,
                loginError: req.flash('loginError'),
                registerError: req.flash('registerError'),
            });
        } catch (error) {
            console.error(error);
        }
    }

    async logout(req, res) {
       try {
           req.session.destroy(() => {
               res.redirect('/#login');
           });
       }  catch (error) {
           console.error(error);
       }
    }

    async login(req, res, next) {
        try {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.flash('loginError', info.message);
                    return res.redirect('/auth#login');
                }
                req.logIn(user, async (err) => {
                    if (err) {
                        req.flash('loginError', 'Ошибка при входе.');
                        return res.redirect('/auth#login');
                    }

                    await sendEmail(user.email, 'Добро пожаловать!', 'Вы успешно вошли в систему!');

                    req.session.isAuthenticated = true;
                    if (user.roles.includes('ADMIN')) {
                        req.session.isAdmin = true;

                        return res.redirect('/admin-panel');
                    }

                    res.redirect('/statistics');
                });
            })(req, res, next);
        } catch (error) {
            console.error(error);
        }
    }

    async registration(req, res, next) {
        try {
            const {email, name, password, confirmPassword, loginAfterRegister} = req.body;
            const candidate = await User.findOne({email});

            if (candidate) {
                req.flash('registerError', 'Пользователь с таким email уже существует.');
                res.redirect('/auth#register');
            } else {
                const hashPassword = await bcrypt.hash(password, 10);
                const userRole = await Role.findOne({value: 'USER'});
                const user = new User({
                    email,
                    name,
                    password: hashPassword,
                    roles: [userRole.value],
                });
                await user.save();

                const userStatistics = new UserStatistics({
                    user: user._id,
                });
                await userStatistics.save();

                user.statistics = userStatistics._id;
                await user.save();

                if (loginAfterRegister) {
                    req.login(user, async (error) => {
                        if (error) {
                            return next(error);
                        }
                        req.flash('success', 'Вы успешно зарегистрировались и вошли в систему');
                        req.session.isAuthenticated = true;

                        await sendEmail(user.email, 'Добро пожаловать!', 'Регистрация прошла успешно!');

                        return res.redirect('/statistics');
                    });

                    return;
                }

                req.flash('success', 'Вы успешно зарегистрировались.');
                await sendEmail(user.email, 'Добро пожаловать!', 'Регистрация прошла успешно!');

                return res.redirect('/auth#login');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getUsers(req, res) {
        try {
            const userRole = new Role();
            const adminRole = new Role({value: 'ADMIN'});

            await userRole.save();
            await adminRole.save()
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new authController();