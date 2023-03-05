const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs')

const userSchema = new Schema({
    name: String,
    lastname: String,
    phone: Number,
    email: String,
    password: String,
    dependency: Object,
    status: String,
    rol: String,
    gender: String
})

userSchema.methods.encryptPassword = async password => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
};

userSchema.methods.matchPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

module.exports = model('user', userSchema)