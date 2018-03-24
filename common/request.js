const request = require('superagent');
const setPrefix = require('superagent-prefix');
const config = require('../config');

// const request = superagent.agent();

module.exports = opt => {
  const prefix = setPrefix(config.apiHost);

  const defaultOpt = {
    type: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  const option = Object.assign({}, defaultOpt, opt);

  option.headers = Object.assign({}, defaultOpt.headers, opt.headers || {});

  let requestType = option.type.toLocaleLowerCase();

  if (requestType === 'delete') {
    requestType = 'del';
  }

  const r = request[requestType](option.url);

  r.use(prefix);

  if (option.query) {
    r.query(option.query);
  }

  if (['put', 'post', 'del'].indexOf(requestType) > -1 && option.body) {
    r.send(option.body);
  }

  for (const [k, v] of Object.entries(option.headers)) {
    r.set(k, v);
  }

  return new Promise((resolve, reject) => {
    r.then(res => {
      if (res.body.success) {
        resolve(res.body.data);
      }
      else {
        reject(new Error(res.body.errorCode));
      }
    });
  });

};