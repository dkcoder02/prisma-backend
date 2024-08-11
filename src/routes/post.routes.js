const express = require("express");

const verifyJwt = require("../middleware/verifyJwt.js");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} = require("../controllers/post.controller.js");

const router = express.Router();

router.get("/all", getAllPosts);

router.use(verifyJwt);
router.post("/create-post", createPost);
router.patch("/update-post/:id", updatePost);
router.delete("/delete-post/:id", deletePost);

module.exports = router;
