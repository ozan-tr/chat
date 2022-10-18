const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    role: String,
    mail: String,
    friends:Array,
    currentChannel:String
})

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    channelId:String,
    content:String,
    date:Date,
    sender:String
})

const channelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    User1Id: String,
    User2Id:String,
    history: Array
})

const user =mongoose.model('User', userSchema)
const message=mongoose.model("Message",messageSchema)
const channel=mongoose.model("Channel",channelSchema)


exports.User=user
exports.Message=message
exports.Channel=channel


module.exports = {   
    User:user,
    Message:message,
    Channel:channel

}