const Question = require('../../models/question');
const Ticket = require('../../models/ticket');

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

    async renderTicketsPage(req, res) {
        try {
            const tickets = await Ticket.find().populate('questions').lean();

            res.render('admin-tickets', {
                title: 'Список Билетов',
                tickets,
            });
        } catch (error) {
            console.error(error);
        }
    }

    async renderCreateQuestionPage(req, res) {
        try {
            res.render('create-question', {
                title: 'Создать вопрос',
                isCreateQuestion: true
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new adminPanelController();