const jwt = require("jsonwebtoken");

module.exports = {
  createAcessToken: (data) => jwt.sign(user, process.env.JWT_SECRET, data),
  verifyAcessToken: () => jwt.verify(token, process.env.JWT_SECRET),
};
