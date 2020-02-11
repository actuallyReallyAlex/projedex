const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const projectRouter = require("./routers/project");
const ghRouter = require("./routers/gh");
const cors = require("cors");

const app = express();

app.use(express.json());

const whitelistDomains = [
  "https://projedex.netlify.com",
  "http://localhost:5000",
  "https://api.github.com",
  "https://github.com",
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

app.use(userRouter);
app.use(projectRouter);
app.use(ghRouter);

module.exports = app;
