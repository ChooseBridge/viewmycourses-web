import React from 'react';
import {
  Modal,
  Input,
  AutoComplete,
  message,
} from 'antd';
import client from '../../common/client';
import api from '../../common/api';

const {
  TextArea
} = Input;

class Amend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
    };

    this.setTextAreaValue = this.setTextAreaValue.bind(this);
  }

  componentDidMount() {}

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const {
      textAreaVal
    } = this.state;

    const {
      amendType,
      id,
    } = this.props;

    console.log(textAreaVal);

    if (!textAreaVal) {
      message.error('请填写修正内容');
      return;
    }

    this.setState({
      confirmLoading: true,
    });

    let apiName, body;

    if (amendType == 'school') {
      apiName = 'createSchoolComment';
      body = {
        school_id: id,
        comment: textAreaVal,
      };
    } else if (amendType == 'professor') {
      apiName = 'createProfessorComment';
      body = {
        professor_id: id,
        comment: textAreaVal,
      };
    }

    client(api[apiName])({
      body,
    }).then(() => {
      Modal.success({
        title: '提交成功',
        content: '感谢您的帮助',
        okText: '确定',
        cancelText: '取消',
      });

      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }).catch(() => {
      Modal.error({
        title: '提交失败',
        content: '您提交的内容有误，请重新提交',
        okText: '确定',
        cancelText: '取消',
      });

      this.setState({
        confirmLoading: false,
      });
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  setTextAreaValue(e) {
    this.setState({
      textAreaVal: e,
    });
  }

  render() {
    const {
      visible,
      confirmLoading,
      isFocus,
    } = this.state;

    return (
      <div>
        <a onClick={this.showModal}>提交修正</a>
        <Modal
          title="提交修正"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="提交">
          <AutoComplete
            autoFocus
            style={{width: '100%'}}
            onChange={this.setTextAreaValue}>
            <TextArea
              style={{ resize: 'none', height: 150}} />
          </AutoComplete>
        </Modal>
      </div>
    );
  }
}

export default Amend;