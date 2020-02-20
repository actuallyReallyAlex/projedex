const express = require("express");
const path = require("path");
require("./db/mongoose");

const userRouter = require("./routers/user");
const projectRouter = require("./routers/project");
const ghRouter = require("./routers/gh");
const cors = require("cors");
const Sentry = require("@sentry/node");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

Sentry.init({
  dsn: "https://11a8f63857134e91b049f0452e9d0330@sentry.io/2448589",
  environment: process.env.NODE_ENV
});

const app = express();

app.use(Sentry.Handlers.requestHandler());

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

const whitelistDomains = [
  "https://projedex.netlify.com",
  "http://localhost:5000",
  "http://localhost:3000",
  "https://api.github.com",
  "https://github.com",
  "https://www.projedex.com",
  "http://www.projedex.com",
  undefined // ? Issue? Check for HOST
];

const corsOptions = {
  origin: (origin, cb) => {
    if (whitelistDomains.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      console.log(`API Refused to allow: ${origin}`);
      cb(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../../dist")));

app.use(userRouter);
app.use(projectRouter);
app.use(ghRouter);

app.use(Sentry.Handlers.errorHandler());

module.exports = app;
