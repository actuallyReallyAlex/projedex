const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const projectRouter = require("./routers/project");
const ghRouter = require("./routers/gh");
const cors = require("cors");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.use(userRouter);
app.use(projectRouter);
app.use(ghRouter);

module.exports = app;
