const { Schema,model } = require('mongoose');

const Post = new Schema({
    'title': String,
    'description': String,
    'user': String,
    'categoria': String,
    'date': {
        type: String,
        default: new Date(),
    },
});

module.exports = model('Post',Post);