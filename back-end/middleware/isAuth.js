function isAuth (req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth');
    }

    next();
}

module.exports = isAuth;