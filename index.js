require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
var path = require('path');
const {User,Message,Channel} = require('./models/methods.js');

async function Connect() {
  await mongoose.connect(process.env.DB_TOKEN);
}

Connect()
  .then(() => {
    console.log("Connected to the database");

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //app.use(morgan("combined"));

    app.use(
      cors({
        origin: "*",
      })
    );

    var htmlPath = path.join(__dirname, 'CLIENT');

    app.use(express.static(htmlPath));

    const routes = require("./routes/routes.js")(app, fs, mongoose,User,Message,Channel);

    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 8000;
    }

    const server = app.listen(port, () => {
      console.log("Listening on %s...", server.address().address);
    });
  })
  .catch((err) => console.log(err));
