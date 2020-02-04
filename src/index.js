const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const projectRouter = require("./routers/project");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(userRouter);
app.use(projectRouter);

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
