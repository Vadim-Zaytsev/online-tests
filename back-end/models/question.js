const {Schema, model} = require('mongoose');

const questionSchema = new Schema({
    questionNumber: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answers: [
        {
            answer: {
                type: String,
                required: true,
            },
            isCorrect: {
                type: Boolean,
                required: true,
            }
        }
    ],
});

module.exports = model('Question', questionSchema);

