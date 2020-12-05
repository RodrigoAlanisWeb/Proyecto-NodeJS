const { Schema,model } = require('mongoose');

const User = new Schema({
    'name': String,
    'nick_name': String,
    'email': {
        type: String,
        unique: true,
    },
    'password': {
        type: String,
        unique: true,
    },
    'image': {
        type: String,
        default: 'base.png',
    },
})

module.exports = model('User',User);