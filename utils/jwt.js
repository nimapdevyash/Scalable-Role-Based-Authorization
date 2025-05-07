const jwt = require("jsonwebtoken");

module.exports = {
  createAcessToken: (data) => jwt.sign(data, process.env.JWT_SECRET),
  verifyAcessToken: (token) => jwt.verify(token, process.env.JWT_SECRET),
};
