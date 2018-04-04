const { Modal } = require('antd');

export default () => Modal.confirm({
  title: '请验证高校邮箱',
  content: '该功能需要验证高校邮箱后使用',
  okText: '前往修改邮箱',
  cancelText: '取消',
  onOk() {
    location.href = '/user';
  }
});