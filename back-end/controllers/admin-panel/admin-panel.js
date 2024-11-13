const Question = require('../../models/question');

class adminPanelController {
    async renderIndexPage(req, res) {
        try {
            res.render('admin-panel', {
                title: 'Панель администратора',
                isAdminPanel: true,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async renderQuestionPage(req, res) {
        try {
            const questions = await Question.find().lean();

            res.render('admin-questions', {
                title: 'Список вопросов',
                questions,
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new adminPanelController();