import React from 'react';
import {
  Modal,
  Input,
  AutoComplete,
} from 'antd';
import cla from 'classnames';
import client from '../../common/client';
import api from '../../common/api';
import commonStyle from '../../common/style/index.css';

const { TextArea } = Input;

class Amend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
    };

    this.setTextAreaValue = this.setTextAreaValue.bind(this);
  }

  componentDidMount() {
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });

    console.log(this.state.textAreaVal);

    //TODO 提交修正信息
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
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
      // amendUrl
    } = this.props;

    const {
      visible,
      confirmLoading,
    } = this.state;

    return (
      <div>
        <a onClick={this.showModal}>提交修正</a>
        <Modal title="提交修正"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="提交">
          <AutoComplete
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