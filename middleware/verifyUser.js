exports.userExist = (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
    }
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};
exports.userAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
    }
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};
