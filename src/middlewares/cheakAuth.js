const { token } = require("morgan");
const jwt = require("../../utils/jwt");

function cheakAuth(req, res, next) {
  try {
    const accessToken = req?.cookies?.accessToken;

    if (!accessToken) {
      next(new Error("AccessToken is Missing or Invalid Access Token"));
    }

    const decodedToken = jwt.verifyAcessToken(token);
    req.user = decodedToken.user;

    next() ;
  } catch (error) {
    next(error);
  }
}

module.exports = cheakAuth;
