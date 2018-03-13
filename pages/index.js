import React from 'react';
import Base from '../components/base/index.js';
import { Layout, Menu, Breadcrumb } from 'antd';
import style from './style.css';

const { Header, Footer, Content } = Layout;

export default () => (
  <Base title="首页">
    <Layout>
      <Header className={style.header}>
        <h2 className={style.logo}>桥选®校园</h2>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          className={style.menu}
        >
          <Menu.Item key="1">关于我们</Menu.Item>
          <Menu.Item key="2">查找高校</Menu.Item>
          <Menu.Item key="3">查找教授</Menu.Item>
          <Menu.Item key="4">我要点评</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  </Base>
);