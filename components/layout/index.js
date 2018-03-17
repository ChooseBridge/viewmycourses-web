import React from 'react';
import {
	Layout,
	Menu,
	Breadcrumb,
	Row,
	Col
} from 'antd';
import Base from '../base/index.js';
import commonStyle from '../../common/style/index.css';
import style from './style.css';
import cla from 'classnames';

const {
	Header,
	Footer,
	Content
} = Layout;

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menuContentKey: ''
		};
	}

	componentDidMount() {

	}

	MenuClickHandler(item) {
		if (this.state.menuContentKey == item.key) {
			this.setState({
				menuContentKey: '',
			});
			return;
		}

		this.setState({
			menuContentKey: item.key,
		});
	}

	renderMenuContent(key) {
		switch(key) {
			case '2':
				return (
					<div>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col
								className={cla(commonStyle.textCenter)}
								span={12}
								offset={6}>
								查找你的学校
							</Col>
						</Row>
					</div>
				);
			case '3':
				return <div>3333</div>;
			case '4':
				return <div>4444</div>;
			default:
				return <div></div>;
		}
	}

	render() {
		const {
			title,
			children,
		} = this.props;

		const {
			menuContentKey
		} = this.state;

		return (
			<Base title={title}>
  				<Layout>
	  				<Header className={style.header}>
				        <h2 className={style.logo}>桥选®校园</h2>
				        <Menu
				          theme="dark"
				          mode="horizontal"
				          className={style.menu}
				          onClick={item => this.MenuClickHandler(item)}>

					        <Menu.Item key="1">关于我们</Menu.Item>
					        <Menu.Item key="2">查找高校</Menu.Item>
					        <Menu.Item key="3">查找教授</Menu.Item>
					        <Menu.Item key="4">我要点评</Menu.Item>
				        </Menu>
				    </Header>

					{menuContentKey && this.renderMenuContent(menuContentKey)}

    				{children}

					<Footer style={{ textAlign: 'center' }}>
        				Ant Design ©2016 Created by Ant UED
      				</Footer>
				</Layout>
  			</Base>
		);
	}
}