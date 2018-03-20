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
import style from '../../common/style/message.css';
import commonStyle from '../../common/style/index.css';

const {
  Content
} = Layout;

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const {
      url
    } = this.props;

    return (
      <ALayout title="消息中心" url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            <Card>
              11
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Message;