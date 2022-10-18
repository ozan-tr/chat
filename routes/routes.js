const userRoutes = require("./Users");
const channelRoutes = require("./Channels");
const messageRoutes = require("./Messages");

const path = require("path");

const appRouter = (app, fs, mongoose, User, Message, Channel) => {
  userRoutes(app, fs, mongoose, User);
  channelRoutes(app, mongoose, User, Channel);
  messageRoutes(app, mongoose, User, Channel, Message);
};

module.exports = appRouter;
