
const userRoutes = require('./users');


const appRouter = (app, fs,mongoose,User) => {
console.log(User)
  app.get('/', (req, res) => {
    res.send("route");
  });

  
  userRoutes(app, fs,mongoose,User);

};


module.exports = appRouter;