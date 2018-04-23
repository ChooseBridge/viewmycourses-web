import React from 'react';
import ALayout from '../../components/layout/index.js';
import {
  Layout,
  Breadcrumb,
  Button,
  Icon,
  Avatar,
  Row,
  Col,
  Tag,
  Card,
} from 'antd';
import cla from 'classnames';
import client from '../../common/client';
import api from '../../common/api';
import style from '../../common/style/message.css';
import commonStyle from '../../common/style/index.css';

const {
  Content
} = Layout;

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInfo: [],
    };
  }

  componentDidMount() {
    this.getStudentMessage();
  }

  getStudentMessage() {
    client(api.getStudentMessage)().then(res => {
      this.setState({
        messageInfo: res.messageInfo,
      });
    });
  }

  renderMessage(item) {
    let href, msgArr;

    if (item.type == 'success') {
      msgArr = item.message.split(item.name);

      if (item.info_type == 'professor') {
        href = `/professor/${item.id}`;
      }

      if (item.info_type === 'professor_rate') {
        href = `/professor/${item.professor_id}`;
      }

      if (item.info_type == 'school') {
        href = `/school/${item.id}`;
      }

      if (item.info_type == 'school_rate') {
        href = `/school/${item.school_id}`;
      }


      return (
        <div
          key={item.created_at}
          className={style.record}>
          [{item.created_at}] {msgArr[0]} <a href={href}>{item.name}</a> {msgArr[1] || ''}
        </div>
      );
    }

    if (item.type == 'fail') {
      return (
        <div
          key={item.created_at}
          className={style.record}>
          [{item.created_at}] {item.message}
        </div>
      );
    }
  }

  render() {
    const {
      url
    } = this.props;

    const {
      messageInfo
    } = this.state;

    return (
      <ALayout title="消息中心" url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            <Card>
              <div><h2>消息中心</h2></div>
              {
                messageInfo.map(item => this.renderMessage(item))
              }
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Message;