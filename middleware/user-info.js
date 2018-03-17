const api = require('../common/api');

module.exports = (req, res, next) => {
  api.getStudent({
    headers: { token: req.cookies && req.cookies.token }
  }).then(user => {
    req.user = user;
    next();
  }, next);
};