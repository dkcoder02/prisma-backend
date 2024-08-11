const express = require("express");
const {
  signUp,
  currentUser,
  logout,
  loginUser,
  userPosts,
} = require("../controllers/user.controller.js");
const verifyJwt = require("../middleware/verifyJwt.js");

const router = express.Router();

router.post("/signup", signUp);
router.get("/", verifyJwt, currentUser);
router.get("/logout", logout);
router.post("/login", verifyJwt, loginUser);
router.get("/my-post", verifyJwt, userPosts);

module.exports = router;
