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
              <div><h2>消息中心</h2></div>
              <div className={style.record}>[2018-03-19] 您创建的 <span className={commonStyle.colorBlue}>复旦大学</span> 已通过审核</div>
              <div className={style.record}>[2018-03-18] 您创建的 <span className={commonStyle.colorBlue}>刘强东</span> 教授已通过审核</div>
              <div className={style.record}>[2018-03-18] 您的邮箱已通过验证</div>
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Message;