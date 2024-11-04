const {Schema, model} = require('mongoose');
// const Question = require('./question');

const ticketSchema = new Schema({
    ticketNumber: {
        type: Number,
        required: true,
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
    }],
});

module.exports = model('Ticket', ticketSchema);

