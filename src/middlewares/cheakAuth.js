const { token } = require("morgan");
const jwt = require("../../utils/jwt");

function cheakAuth(req, res, next) {
  try {
    const accessToken = req?.cookies?.accessToken;

    if (!accessToken) {
      throw new Error("AccessToken is Missing or Invalid Access Token");
    }

    req.user = jwt.verifyAcessToken(accessToken);

    next() ;
  } catch (error) {
    next(error);
  }
}

module.exports = cheakAuth;
