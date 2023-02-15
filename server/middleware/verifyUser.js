const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const catchAsyncError = require("../utils/catchAsyncError");

verifyUser = catchAsyncError(async (req, res, next) => {
  const jwt_token = req.headers["x-access-token"];
  if (!jwt_token) next(new ApiError("no access token found", 401));

  const user = jwt.verify(jwt_token, process.env.TOKEN_KEY);
  req.user = user;
  next();
});

module.exports = verifyUser;
