const env = process.env.NODE_ENV;
const TEST = env === 'test';
const PROD = env === 'prod' || env === 'production';
const DEV = !TEST && !PROD;

const config = {
  port: 3000,
};

if (PROD) {
  // config.apiHost = 'http://web-api:3002';
}

if (TEST) {
  // config.apiHost = 'http://web-api:3002';
}

if (DEV) {
  config.apiHost = 'http://school.anyquestion.top';
}

module.exports = config