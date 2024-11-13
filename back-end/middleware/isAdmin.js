function isAdmin (req, res, next) {
    if (!req.session.isAdmin) {
        return res.redirect('/auth');
    }

    next();
}

module.exports = isAdmin;