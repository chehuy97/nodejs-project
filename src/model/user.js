const mongoose = require('mongoose')
const normalize = require('normalize-mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    gender: String,
    birthday: String,
    phone: String
})

userSchema.plugin(normalize)

module.exports = mongoose.model('user', userSchema)