const express = require("express");
const router = express.Router();

//model
const { User, Post } = require("../models");

//create Users
router.post("/users", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newUser = await User.create({ name, email, role });
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

//get Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "sm went wrong" });
  }
});

//get oneUser
router.get("/users/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: { uuid },
      include: "posts",
    });
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "sm went wrong" });
  }
});

//create a post
router.post("/posts", async (req, res) => {
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
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({ include: "user" });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error in creating posts" });
  }
});

//update User
router.put("/users/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const { name, email, role } = req.body;
    await User.update(
      {
        name,
        email,
        role,
      },
      {
        where: { uuid },
      }
    );
    res.status(200).json({ msg: "User details updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "error updating user details" });
  }
});

//delete User
router.delete("/users/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    await User.destroy({
      where: { uuid },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting data" });
    console.error(error);
  }
});

module.exports = router;
