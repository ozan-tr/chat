const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    role: String,
    mail: String
})
const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    senderId: String,
    recieverId:String,
    mail:String
})

const user =mongoose.model('User', userSchema)
const message=mongoose.model("Message",messageSchema)



exports.User=user
exports.Message=message


module.exports = {   
    User:user,
    Message:message

}