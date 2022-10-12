const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    nameColor: String,
    password: String,
    thumbUps: Array,
    thumbDowns: Array,
    role: String,
    email: String
})

module.exports = mongoose.model('User', userSchema)