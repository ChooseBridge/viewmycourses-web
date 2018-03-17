function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
}

module.exports = api => opt => {
  return api(Object.assign({}, {
    headers: { token: getCookie('token') }
  }, opt))
    .catch(e => {
      if (e.errorCode === 1002) {
        location.href = document.getElementById('login-url').value
      }
    });
};