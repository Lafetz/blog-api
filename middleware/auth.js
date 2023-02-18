const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.TOP_KEY);
    req.user = data; //

    next();
  } catch (err) {
    next();
  }
};
module.exports = verifyToken;
