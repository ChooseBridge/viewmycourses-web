const config = require('../config');

module.exports = (req, res, next) => {
  return next();
  if (req.user) {
    next();
  }

  else {
    const uri = req.protocol + '://' + req.get('host') + req.originalUrl;

    res.redirect(301, `${config.loginUrl}${uri}`);
  }
};