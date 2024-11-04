const {Schema, model} = require('mongoose');

const counterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    count: {
        type: Number,
        required: true,
    },
});

module.exports = model('Counter', counterSchema);
