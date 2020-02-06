const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const projectRouter = require("./routers/project");
const ghRouter = require("./routers/gh");

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(projectRouter);
app.use(ghRouter);

module.exports = app;
