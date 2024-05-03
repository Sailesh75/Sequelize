const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { sequelize } = require("./models");

app.use(express.json());
app.use("/", require("./routes"));

app.listen(port, async () => {
  console.log(`Server up at localhost:${port}`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
