const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { populate } = require("../models/post");
const Post = require("../models/post");

// @router GET api/posts
// @des GET Post
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @router POST api/posts
// @des Create Post
// @access Private

router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //Simple Validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "Happy Learing", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @router PUT api/posts/id
// @des UPDATE Post
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "title is required" });
  try {
    let updatePost = {
      title,
      description: description || "",
      url: url.startsWith("https://") ? url : `https://${url}` || "",
      status: status || "TO LEARN",
    };
    // Condition is the post have to existed and Just the author of the post have to updating.
    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });

    //User not authorised to update post or post not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent Process",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// @router DELETE api/posts/id
// @des delete Post
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteConditon = { id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteConditon);

    //user not authoried or not post not found

    if (!deletePost)
      return res
        .status(401)
        .json({ success: false, message: "user or post not found" });

    res.json({
      success: true,
      message: "Post have been deleted",
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: "Internal Server Error" });
  }
});

module.exports = router;
