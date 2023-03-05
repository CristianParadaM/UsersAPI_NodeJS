const { Schema, model } = require('mongoose');

const depSchema = new Schema({
    name: String,
    tel: Number,
})

module.exports = model('dependencies', depSchema)