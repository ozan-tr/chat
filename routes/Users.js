const userRoutes = (app, fs, mongoose, User) => {
  app.get("/check/:userId", (req, res, next) => {
    const userId = req.params.userId;
    User.findOne({ _id: userId })
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
