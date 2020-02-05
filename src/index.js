const app = require("./app");
const port = process.env.PORT;

app.get("/", (req, res) => res.send("Projedex Application"));

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
