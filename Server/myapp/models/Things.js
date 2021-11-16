const { Schema, model } = require('mongoose');

var Things = new Schema({
    name: String,
})

module.exports = model('Things', Things);