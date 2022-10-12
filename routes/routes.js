
const userRoutes = require('./Users');
const channelRoutes = require('./Channels');

const appRouter = (app, fs,mongoose,User,Message,Channel) => {
console.log(User)
  app.get('/', (req, res) => {
    res.send("route");
  });

  
  userRoutes(app, fs,mongoose,User);
  channelRoutes(app,mongoose,User,Message,Channel)

};


module.exports = appRouter;