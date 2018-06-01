const env = process.env.NODE_ENV;
const TEST = env === 'test';
const PROD = env === 'prod' || env === 'production';
const DEV = !TEST && !PROD;

const config = {
  port: 3000,
  apiHost: 'https://api.viewmycourses.com/',
  loginUrl: 'https://i.choosebridge.com/oauth/authorize?client_id=999&redirect_uri=https://api.viewmycourses.com/callback&response_type=code&state=',
  loginRedirectPrefix: 'https://www.viewmycourses.com'
};

if (PROD) {
  // config.apiHost = 'http://web-api:3002';
}

if (TEST) {
  // config.apiHost = 'http://web-api:3002';
}

if (DEV) {
}

module.exports = config
