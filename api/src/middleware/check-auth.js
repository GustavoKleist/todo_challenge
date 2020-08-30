//DEPENDENCES
const JWT = require("jsonwebtoken");
//SECRET
const env = require("../../env.json");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token, env.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
};
