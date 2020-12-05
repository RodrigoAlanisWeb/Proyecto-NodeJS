const { Schema,model } = require('mongoose');

const Categoria = new Schema({
    'name': String,
});

module.exports = model('Categoria',Categoria);