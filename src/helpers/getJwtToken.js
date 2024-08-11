const jwt = require("jsonwebtoken");

const getJwtToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1 days",
  });
};

module.exports = getJwtToken;
