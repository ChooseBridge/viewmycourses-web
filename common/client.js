const requiredEdu = require('./required-edu').default;

function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
}

module.exports = api => opt => {

  return new Promise((resolve, reject) => {
    api(Object.assign({}, {
      headers: { token: getCookie('token') }
    }, opt))
      .then(resolve, e => {
        if (e.errorCode === 1002) {
          return location.href = document.getElementById('login-url').value;
        }

        if (e.errorCode === 1007) {
          requiredEdu();
        }

        reject(e);
      });
  });

};