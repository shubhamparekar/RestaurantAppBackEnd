const jwt = require("jsonwebtoken");
const { UnauthorizedError, NotFoundError } = require("../error/index");

const requireAuth = async (req, res, next) => {
  const token = req.cookie.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, (err, decodedToken) => {
      if (err) {
        throw new UnauthorizedError("Unauthorized user");
      } else {
        next();
      }
    });
  } else {
    throw new NotFoundError("User not found");
  }
};

module.exports = { requireAuth };
