import React from 'react';
import style from './style.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import Base from '../base/index.js';

const { Header, Footer, Content } = Layout;

export default class extends React.Component {
	constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {

    }

    render() {
		const {
			title,
			children,
		} = this.props;

		return (
  			<Base title={title}>
  				<Layout>
	  				<Header className={style.header}>
				        <h2 className={style.logo}>桥选®校园</h2>
				        <Menu
				          theme="dark"
				          mode="horizontal"
				          defaultSelectedKeys={['2']}
				          className={style.menu}>

					        <Menu.Item key="1">关于我们</Menu.Item>
					        <Menu.Item key="2">查找高校</Menu.Item>
					        <Menu.Item key="3">查找教授</Menu.Item>
					        <Menu.Item key="4">我要点评</Menu.Item>
				        </Menu>
				    </Header>

    				{children}

					<Footer style={{ textAlign: 'center' }}>
        				Ant Design ©2016 Created by Ant UED
      				</Footer>
				</Layout>
  			</Base>
		);
    }
}
