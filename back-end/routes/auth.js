const {Router} = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserStatistics = require('../models/statistics');
const { sendEmail } = require('../services/mailer');
const router = Router();


router.get('/', (req, res) => {
    res.render('auth', {
        title: 'Авторизация/Регистрация',
        isAuthPage: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError'),
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/#login');
    });
});

router.post('/login', (req, res, next) => {
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
            res.redirect('/statistics');
        });
    })(req, res, next);
});

router.post('/register', async (req, res, next) => {
    try {
        const {email, name, password, confirmPassword, loginAfterRegister} = req.body;
        const candidate = await User.findOne({email});

        if (candidate) {
            req.flash('registerError', 'Пользователь с таким email уже существует.');
            res.redirect('/auth#register');
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email,
                name,
                password: hashPassword,
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
            }

            req.flash('success', 'Вы успешно зарегистрировались.');
            await sendEmail(user.email, 'Добро пожаловать!', 'Регистрация прошла успешно!');

            return res.redirect('/auth#login');
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;