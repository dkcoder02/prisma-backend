const getJwtToken = require("../helpers/getJwtToken");

const cookieToken = (user, res) => {
  const token = getJwtToken(user.id);

  const options = {
    httpOnly: true,
    maxAge: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  };
  user.password = undefined;
  res.cookie("token", token, options).json({ success: true, token, user });
};

module.exports = cookieToken;
