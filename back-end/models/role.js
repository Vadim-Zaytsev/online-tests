const {Schema, model} = require('mongoose');

const roleSchema = new Schema({
    value: {
        type: String, unique: true, default: 'USER'
    },
});

module.exports = model('Roles', roleSchema);