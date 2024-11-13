const {Router} = require('express');
const authControllers = require('../controllers/auth');
const router = Router();

router.get('/', authControllers.renderPage);

router.get('/logout', authControllers.logout);

router.post('/login', authControllers.login);

router.post('/register', authControllers.registration);

module.exports = router;