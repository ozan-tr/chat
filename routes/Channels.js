const channelRoutes = (app, mongoose, User, Channel) => {
  //enter channel
  app.get("/chat/:sender/:reciever", (req, res, next) => {
    User.findOne({ mail: req.params.reciever })
      .exec()
      .then((rec) => {
        const sender = req.params.sender;
        const reciever = rec._id;

        let retMsg;

        Channel.findOne({
          $or: [
            {
              User1Id: sender,
              User2Id: reciever,
            },
            {
              User1Id: reciever,
              User2Id: sender,
            },
          ],
        })
          .exec()
          .then((channel) => {
            if (channel) {
              //exists
              if (channel.User1Id == sender) {
                //1st user
                retMsg = "Entered channel as User1";
              } else {
                //2nd user
                retMsg = "Entered channel as User2";
              }
            } else {
              console.log("channel created");
              channel = new Channel({
                _id: new mongoose.Types.ObjectId(),
                User1Id: sender,
                User2Id: reciever,
                history: [],
              });
              channel.save();
            }

            User.updateOne(
              { _id: sender },
              { $set: { currentChannel: channel._id } }
            )
              .exec()
              .then((updatedUser) => {
                if (updatedUser) {
                  res.status(200).json({
                    message: "channel updated",
                    userNo: retMsg,
                    newChannel: updatedUser.currentChannel,
                    channelContent: channel.history,
                  });
                }
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};
module.exports = channelRoutes;
