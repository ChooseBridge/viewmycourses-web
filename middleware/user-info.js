const api = require('../common/api');

module.exports = (req, res, next) => {
  return next();
  const headers = {};

  if (req.cookies && req.cookies.token) {
    headers.token = req.cookies.token;
  }

  api.getStudent({ headers }).then(user => {
    req.user = user;
    next();
  }, next);
};