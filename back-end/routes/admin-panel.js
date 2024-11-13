const {Router} = require('express');
const isAdmin = require('../middleware/isAdmin');
const adminPanelController = require('../controllers/admin-panel/admin-panel');
const isAuth = require('../middleware/isAuth');
const Question = require('../models/question');
const router = Router();

router.get('/', isAuth, isAdmin, adminPanelController.renderIndexPage);

router.get('/safe-handling-of-weapons/questions', isAuth, isAdmin, adminPanelController.renderQuestionPage);

module.exports = router;