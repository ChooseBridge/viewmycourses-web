const config = require('../config');

module.exports = (req, res, next) => {
  if (req.user) {
    return next();
  }

  // const uri = req.protocol + '://' + req.get('host') + req.originalUrl;
  const uri = config.loginRedirectPrefix + req.originalUrl;

  res.redirect(301, `${config.loginUrl}${uri}`);
};