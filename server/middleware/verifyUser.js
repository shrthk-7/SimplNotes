const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
verifyUser = (req, res, next) => {
  try {
    const jwt_token = req.headers["x-access-token"];
    if (!jwt_token) return next(new ApiError("no access token found", 401));

    const user = jwt.verify(jwt_token, process.env.TOKEN_KEY);
    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(`auth token verification failed: ${err.message}`, 401));
  }
};

module.exports = verifyUser;
