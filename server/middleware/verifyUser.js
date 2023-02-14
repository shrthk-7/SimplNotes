const jwt = require("jsonwebtoken");

verifyUser = (req, res, next) => {
  const jwt_token = req.headers["x-access-token"];

  if (!jwt_token) next();

  try {
    const user = jwt.verify(jwt_token, process.env.TOKEN_KEY);
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "user not found",
    });
    next(error);
  }
};

module.exports = verifyUser;
