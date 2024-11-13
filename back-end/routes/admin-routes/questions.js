const { Router } = require('express');
const Question = require('../../models/question');
const isAuth = require('../../middleware/isAuth');
const Counter = require('../../models/counter');
const isAdmin = require('../../middleware/isAdmin');
const router = Router();

router.get('/', isAuth, isAdmin, async (req, res) => {
    const questions = await Question.find().lean();

    res.render('admin-questions', {
        title: 'Список вопросов',
        // isQuestions: true,
        questions,
    });
});