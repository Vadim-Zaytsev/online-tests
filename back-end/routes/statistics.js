const {Router} = require('express');
const isAuth = require('../middleware/isAuth');
const UserStatistics = require('../models/statistics');
const User = require('../models/user');
const {ACTIONS} = require('../constants');
const router = Router();

router.get('/', async (req, res) => {
    const user = await User.findById(req.session.passport.user);
    const statistics = await UserStatistics.findById(user.statistics).lean();
    res.render('statistics', {
        title: 'Статистика',
        isStatistics: true,
        statistics
    });
});

router.post('/update', isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.session.passport.user);
        const statistics = await UserStatistics.findById(user.statistics);

        if (!statistics) {
            return res.status(404).json({success: false, message: 'Статистика пользователя не найдена.'});
        }

        switch (req.body.action) {
            case ACTIONS.ANSWER_TO_QUESTION:
                statistics.questions.totalAnswered += 1;

                if (req.body.isSuccess) {
                    statistics.questions.correctAnswers += 1;
                } else {
                    statistics.questions.incorrectAnswers += 1;
                }
                break;
            case ACTIONS.TICKET_SOLUTION:
                if (req.body.isSuccess) {
                    statistics.tickets.resolved += 1;
                } else {
                    statistics.tickets.unresolved += 1;
                }
                break;
        }

        await statistics.save();

        res.json({success: true, message: 'Статистика обновлена'});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Ошибка сервера'});
    }
});
module.exports = router;

