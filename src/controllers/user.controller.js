const prisma = require("../../prisma/index.js");
const cookieToken = require("../utils/cookieToken");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide all the details" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    // send token in cookie
    cookieToken(user, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const currentUser = async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({ success: true, message: "Logged out" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .json({ success: false, error: "email and password is required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User does not exits with this email!",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    return res
      .status(200)
      .json({ success: true, user, message: "User logged in successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const userPosts = async (req, res) => {
  try {
    const posts = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        posts: true,
      },
    });

    res.json({ success: true, posts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { signUp, currentUser, logout, loginUser, userPosts };
