const channelRoutes = (app,mongoose,User,Channel) => {

    //enter channel
    app.get('/chat/:sender/:reciever', (req,res,next) => {
        const sender = req.params.sender
        const reciever = req.params.reciever


    
        Channel.findOne(
            {
                User1Id: sender||reciever,
                User2Id: sender||reciever
            }
        ).exec().then(channel =>{
            if (channel) {//exists
                if(channel.User1Id == sender){//1st user
                    
                    res.status(200).json({
                        message: "Entered channel as User1",
                        channelId: channel._id
                    })
                }
                else{//2nd user
                    res.status(200).json({
                        message: "Entered channel as User2",
                        channelId: channel._id
                    })
                    }
            }
            else{ 
                    channel=new Channel({
                        _id:new mongoose.Types.ObjectId(),
                        User1Id:sender,
                        User2Id:reciever,
                        history:[]
                    })
                    channel.save()
             }

             User.updateOne({_id: sender},{$set: {currentChannel: channel._id}}).exec().then(updatedUser =>{
                if (updatedUser) {
                    res.status(200).json({
                        message: "channel updated",
                        newChannel: updatedUser.currentChannel
                    })
                }
            })
            .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
    })


    

}
module.exports=channelRoutes