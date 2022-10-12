const messageRoutes = (app,mongoose,User,Channel,Message) => {

    app.get("/send/:sender",(req,res)=>{
        messageData=req.body
        User.findOne({_id:req.params.sender}).exec().then(user=>{
            
            const channelId=user.currentChannel

            if(channelId){
                console.log(channelId)
                const message=new Message({
                    _id:new mongoose.Types.ObjectId(),
                    content:req.query.content,
                    date: new Date(),
                    channelId:channelId,
                    sender:req.params.sender
                })
    
                message.save()
                
                Channel.findOne({_id: channelId}).exec().then(channel =>{
                    if (channel) {
                        channel.history.push(message)
                        channel.save()
                        res.status(200).json({
                            message: "message sent",
                            content:req.query.content,
                        })
                    }else{
                        res.status(400).json({
                            message: "wrong channel"
                        })
                    }
                }).catch(err => console.log(err))
        
            }else{
                res.status(400).json({
                    message: "invalid channel",
                })
            }
        
        
        
        })





    })

}
module.exports=messageRoutes