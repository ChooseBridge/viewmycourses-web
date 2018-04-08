const api = require('../common/api');

module.exports = (req, res, next) => {
  const headers = {};
  if (!req.cookies) {
    return next();
  }

  if (req.cookies && req.cookies.token) {
    headers.token = req.cookies.token;
  }

  console.log('user-info');

  Promise.all([
    api.getStudent({ headers }),
    api.getUnreadCount({ headers })
  ]).then(([user, unread]) => {
    req.user = user;
    req.user.unread = unread.count;
    next();
  }, () => {
    next();
  });
};