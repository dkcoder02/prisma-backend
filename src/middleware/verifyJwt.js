const prisma = require("../../prisma/index.js");
const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "You are not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "You are not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Authentication Error", error);
  }
};

module.exports = verifyJwt;
