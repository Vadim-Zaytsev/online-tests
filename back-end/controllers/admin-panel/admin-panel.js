const Question = require('../../models/question');
const Ticket = require('../../models/ticket');
const Counter = require('../../models/counter');

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

    async createQuestion(req, res) {
        try {
            let counter = await Counter.findOne({name: 'questionCounter'});

            if (!counter) {
                counter = new Counter({name: 'questionCounter', count: 1});
            } else {
                counter.count++;
            }

            await counter.save();

            const question = new Question({
                questionNumber: counter.count,
                question: req.body.question,
                answers: req.body.answers,
            });

            await question.save();

            res.status(200).json({ message: 'Вопрос был успешно сохранен.'});
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при сохранении вопроса.', error: error });
            console.error(error);
        }
    }
}

module.exports = new adminPanelController();