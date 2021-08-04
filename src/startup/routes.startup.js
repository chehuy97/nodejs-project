const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const error = require("../middlewares/error.middleware");
const homeRouter = require("../routes/home.route");
const authRouter = require("../routes/auth.router");

const routes = app => {
  app.use(cors({ origin: "*", credentials: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(cookieParser());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
    );
    next();
  });

  app.use('/', homeRouter)
  app.use('/auth', authRouter)
  // app.use(error);
};

module.exports = routes