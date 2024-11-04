const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    statistics: {
        type: Schema.Types.ObjectId,
        ref: 'UserStatistics',
    }
}, { timestamps: true });

module.exports = model('User', userSchema);