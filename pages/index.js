import React from 'react';
import ALayout from '../components/layout/index.js';
import { Layout, Breadcrumb, Button } from 'antd';
// import style from '../common/style/home.css';
// import commonStyle from '../common/style/index.css';
import api from '../common/api';
import client from '../common/client';

const { Content } = Layout;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getCountry() {
    client(api.getSchoolGroupByCountry)();
  }

  render() {
    const {
      url
    } = this.props;

    return (
      <ALayout title='首页' url={url}>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            看我在这修改了内容诶！
            <Button onClick={this.getCountry}>国家</Button>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Home;