import React from 'react';
import {
  Layout,
  Menu,
  Row,
  Col,
  Button,
  Dropdown,
  Affix
} from 'antd';
import Base from '../base/index.js';
import style from './style.css';
import SearchSchool from './search-school';
import SearchProfessor from './search-professor';
import queryString from 'query-string';
import SearchRate from './search-rate';
import Cookies from 'js-cookie';

const {
  Header,
  Footer
} = Layout;

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuContentKey: '',
      schoolChoose: 'name',
      professorChoose: 'proName',
      rateChoose: 'professor'
    };
  }

  componentDidMount() {
  }

  closeAll = () => {
    this.setState({
      menuContentKey: ''
    });
  };

  MenuClickHandler(item) {
    if (item.key === '3' || item.key === '4') {
      if (!this.props.url.query.user) {
        return location.href = this.props.url.query.loginUrl;
      }
    }

    // if (this.state.menuContentKey === item.key) {
    //   this.setState({
    //     menuContentKey: ''
    //   });
    //   return;
    // }

    this.setState({
      menuContentKey: item.key
    });
  }

  renderMenuContent(key) {
    switch (key) {
      case '2':
        return <SearchSchool closeAll={this.closeAll} onSubmit={this.goSearch} />;
      case '3':
        return <SearchProfessor closeAll={this.closeAll} onSubmit={this.goSearch} />;
      case '4':
        return <SearchRate closeAll={this.closeAll} onSubmit={this.goSearch} />;
      default:
        return false;
    }
  }

  goSearch(query) {
    location.href = '/search?' + queryString.stringify(query);
  }

  logout = () => {
    Cookies.remove('token');
    location.href = location.href;
  };

  render() {
    const {
      title,
      children,
      url
    } = this.props;

    const {
      menuContentKey
    } = this.state;

    return (
      <Base title={title} className={this.props.className}>
        <Layout>
          <Affix>
            <Header className={style.header}>
              <Row style={{ flex: 1 }}>
                <Col lg={{ span: 4 }} md={{ span: 5 }}>
                  <h2 className={style.logo}>
                    <a href="/">
                      桥选<span style={{ transform: 'scale(0.8)', display: 'inline-block' }}>®</span>校园
                    </a>
                  </h2>
                </Col>

                <Col lg={{ span: 20 }} md={{ span: 19 }}>
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    className={style.menu}
                    selectedKeys={[menuContentKey]}
                    onClick={item => this.MenuClickHandler(item)}
                    style={{ float: 'left' }}>
                    <Menu.Item key="1">关于我们</Menu.Item>
                    <Menu.Item key="2">查找高校</Menu.Item>
                    <Menu.Item key="3">查找教授</Menu.Item>
                    <Menu.Item key="4">我要点评</Menu.Item>
                  </Menu>


                  <div style={{ float: 'right', color: '#fff' }}>
                    {
                      url.query.user ? (
                        <Dropdown overlay={(
                          <Menu>
                            <Menu.Item>
                              <a href="/user">个人主页</a>
                            </Menu.Item>
                            <Menu.Item>
                              <a href="/user/message">消息中心</a>
                            </Menu.Item>
                            <Menu.Item>
                              <a href="javascript:;" onClick={this.logout}>退出登录</a>
                            </Menu.Item>
                          </Menu>
                        )}>
                          <a href="/user" style={{ color: '#fff' }}>{url.query.user.student.name}</a>
                        </Dropdown>
                      ) : <a href={url.query.loginUrl}><Button ghost type="primary">登录</Button></a>
                    }
                  </div>
                </Col>
              </Row>

              <input type="hidden" id="login-url" value={url.query.loginUrl} />
              {menuContentKey && this.renderMenuContent(menuContentKey)}
            </Header>
          </Affix>


          {children}

          <Footer className={style.footer}>
            <div>
              <a href="">关于我们</a>
              <a href="">加入我们</a>
              <a href="">联系我们</a>
              <a href="">使用规范</a>
              <a href="/privacy">隐私政策</a>
            </div>
            <div>备案号 xxxxxxxx</div>
          </Footer>
        </Layout>
      </Base>
    );
  }
}