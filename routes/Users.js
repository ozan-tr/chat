const userRoutes = (app, fs, mongoose, User) => {
  app.get("/check/:user", (req, res, next) => {
    User.findOne({_id:req.params.user})
      .exec()
      .then((userData) => {
        console.log(userData);
        if (userData) {
          res.status(200).send();
        } else {
          res.status(404).send();
        }
      });
  });

  app.get("/getData/:user", (req, res, next) => {
    User.findOne({_id:req.params.user})
      .exec()
      .then((userData) => {
        if (userData) {

          let fList=[]

          userData.friends.forEach(fmail => {
            console.log(fmail);
            User.findOne({mail:fmail}).then(friend=>{
              fList.push({mail:friend.mail,username:friend.username})
            })
          })

          setTimeout(()=>{
            res.status(200).json(
              {
                username: userData.username,
                friends: fList,
                currentChannel: userData.currentChannel
              }
            );
          },1000)


        } else {
          res.status(404).send();
        }
      });
  });



  app.get("/signup/:username/:password/:mail", (req, res, next) => {
    const username = req.params.username;
    const password = req.params.password;
    const mail = req.params.mail;
    User.findOne({ mail: mail })
      .exec()
      .then((userData) => {
        if (userData) {
          res.status(400).json({
            message: "Mail already taken",
          });
          return;
        } else {
          let newId = new mongoose.Types.ObjectId();
          const user = new User({
            _id: newId,
            username: username,
            password: password,
            role: "user",
            mail: mail,
            friends: [],
            currentChannel: null,
          });
          user
            .save()
            .then((result) => {
              console.log(result);
              res.status(200).json({
                message: "sign up succes",
                mail: mail,
                password: password,
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  });

  app.get("/login/:mail/:password", (req, res, next) => {
    const mail = req.params.mail;
    const password = req.params.password;

    User.findOne({ mail: mail })
      .exec()
      .then((userData) => {
        if (userData) {
          if (userData.password == password) {
            res.status(200).json({
              message: "Logged in",
              userId: userData._id,
            });
          } else {
            res.status(400).json({ message: "Wrong password" });
          }
        } else {
          res.status(404).json({ message: "User doesn't exist" });
        }
      })
      .catch((err) => console.log(err));
  });
};
module.exports = userRoutes;
