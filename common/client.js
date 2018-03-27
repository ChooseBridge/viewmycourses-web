const { Modal, Button } = require('antd');

const confirm = Modal.confirm;

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
          confirm({
            title: '请验证edu邮箱',
            content: '该功能需要验证edu邮箱后使用',
            okText: '前往修改邮箱',
            cancelText: '取消',
            onOk() {
              location.href = '/user'
            }
          });
        }

        reject(e);
      })
  });

};