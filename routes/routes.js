
const userRoutes = require('./Users');
const channelRoutes = require('./Channels');
const messageRoutes = require('./Messages');

const appRouter = (app, fs,mongoose,User,Message,Channel) => {
console.log(User)
  app.get('/', (req, res) => {
    res.send("route");
  });

  
  userRoutes(app, fs,mongoose,User);
  channelRoutes(app,mongoose,User,Channel)
  messageRoutes(app,mongoose,User,Channel,Message)

};


module.exports = appRouter;