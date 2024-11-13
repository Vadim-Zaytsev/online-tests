const { Router } = require('express');
const Question = require('../models/question');
const isAuth = require('../middleware/isAuth');
const Counter = require('../models/counter');
const {shuffleAnswer} = require('../utils');
const router = Router();

router.get('/', isAuth, async (req, res) => {
    const questions = await Question.find().lean();
    questions.forEach(q => shuffleAnswer(q.answers));

    res.render('questions', {
        title: 'Вопросы',
        isQuestions: true,
        questions,
    });
});

router.get('/create-question', isAuth, async (req, res) => {
    res.render('create-question', {
        title: 'Создать вопрос',
        isCreateQuestion: true
    });
});

router.get('/list', isAuth, async (req, res) => {
    try {
        const questions = await Question.find().lean();

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении данных', error });
    }
});

router.post('/create-question', isAuth, async (req, res) => {
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
})

module.exports = router;

