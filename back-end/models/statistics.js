const { Schema, model } = require('mongoose');

const userStatisticsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tickets: {
        resolved: {
            type: Number,
            default: 0
        },
        unresolved: {
            type: Number,
            default: 0
        }
    },
    questions: {
        totalAnswered: {
            type: Number,
            default: 0
        },
        correctAnswers: {
            type: Number,
            default: 0
        },
        incorrectAnswers: {
            type: Number,
            default: 0
        }
    },
    exams: {
        totalExams: {
            type: Number,
            default: 0
        },
        passedExams: {
            type: Number,
            default: 0
        },
        failedExams: {
            type: Number,
            default: 0
        }
    }
}, { timestamps: true });

module.exports = model('UserStatistics', userStatisticsSchema);
