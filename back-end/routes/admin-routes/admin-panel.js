const {Router} = require('express');
const isAdmin = require('../../middleware/isAdmin');
const adminPanelController = require('../../controllers/admin-panel');
const isAuth = require('../../middleware/isAuth');
const Question = require('../../models/question');
const router = Router();

router.get('/', isAdmin, adminPanelController.renderPage);

router.get('/questions', isAuth, isAdmin, async (req, res) => {
    const questions = await Question.find().lean();

    res.render('admin-questions', {
        title: 'Список вопросов',
        // isQuestions: true,
        questions,
    });
});

module.exports = router;