import React from 'react';
import ALayout from '../components/layout/index.js';
import { Layout, Breadcrumb, Button } from 'antd';
// import style from '../common/style/home.css';
// import commonStyle from '../common/style/index.css';
import api from '../common/api';
import client from '../common/client';
import SchoolSelector from '../components/school-selector';

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
            <SchoolSelector dataSource={{
              "中国": [
                {
                  "school_id": 2,
                  "school_name": "中国科技大学",
                  "school_nick_name": "中科大"
                },
                {
                  "school_id": 5,
                  "school_name": "复旦大学",
                  "school_nick_name": "复旦"
                }
              ],
              "美国": [
                {
                  "school_id": 6,
                  "school_name": "Emory University",
                  "school_nick_name": "埃默里"
                }
              ]
            }}/>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Home;