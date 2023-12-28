const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

//@route GET api/posts
//@desc Get posts
//@access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
      "createdAt",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route PUT api/posts
//@desc Update posts
//@access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //ValidationError
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }
  try {
    let updatedPost = {
      title,
      description: description || "",
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
    };
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    //User not authorized to update post
    if (!updatedPost)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized or Posts not found" });

    //All conditions are met

    res.json({
      success: true,
      message: "Note updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //ValidationError
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: !url
        ? `https://youtube.com/results?search_query=${title}`
        : url.startsWith("https://")
        ? url
        : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "Happy Learning", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    //User not authorized or Post not found
    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or User not authorized",
      });
    }
    res.json({
      success: true,
      message: "Delete succesfully",
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
