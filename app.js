const express = require("express");
const app = express();
const { sequelize, User, Post } = require("./models");
// const { where } = require("sequelize");
const port = process.env.PORT || 5000;

app.use(express.json());

//create Users
app.post("/users", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newUser = await User.create({ name, email, role });
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//get Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "sm went wrong" });
  }
});

//get oneUser
app.get("/users/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: { uuid },
      include:'posts'
    });
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "sm went wrong" });
  }
});

//create a post
app.post("/posts", async (req, res) => {
  try {
    const { userUuid, body } = req.body;
    const user = await User.findOne({ where: { uuid: userUuid } });
    const newPost = await Post.create({ body, userId: user.id });
    return res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error in creating posts" });
  }
});


//read posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({include:'user'});
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error in creating posts" });
  }
});

app.listen(port, async () => {
  console.log(`Server up at localhost:${port}`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
