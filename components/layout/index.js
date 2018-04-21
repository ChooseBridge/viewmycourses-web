import React from 'react';
import {
  Layout,
  Menu,
  Row,
  Col,
  Button,
  Dropdown,
  Affix,
  Badge,
  Icon
} from 'antd';
import Base from '../base/index.js';
import style from './style.css';
import SearchSchool from './search-school';
import SearchProfessor from './search-professor';
import queryString from 'query-string';
import SearchRate from './search-rate';
import Cookies from 'js-cookie';
import className from 'classnames';

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
    const { small } = this.state;
    switch (key) {
      case '2':
        return <SearchSchool closeAll={this.closeAll} onSubmit={this.goSearch} small={small} />;
      case '3':
        return <SearchProfessor closeAll={this.closeAll} onSubmit={this.goSearch} small={small} />;
      case '4':
        return <SearchRate closeAll={this.closeAll} onSubmit={this.goSearch} small={small} />;
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

  openMenu = () => {
    if (this.state.small) {
      this.setState({ small: false });
    }
    else {
      this.setState({ small: true });
    }
    this.closeAll();
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
              <Row style={{ width: '100%' }}>
                <Col lg={{ span: 3 }} md={{ span: 5 }} sm={{ span: 12 }} xs={{ span: 12 }} style={{margin:0}}>
                  <h2 className={style.logo}>
                    <a href="/">
                      桥选<span style={{
                      transform: 'scale(0.5)',
                      display: 'inline-block',
                      fontWeight: 'normal',
                      position: 'relative',
                      top: -4
                    }}>®</span>校园
                    </a>
                  </h2>
                </Col>

                <Col md={{ span: 0 }} sm={{ span: 12 }} xs={{ span: 12 }}
                     style={{ lineHeight: '64px', textAlign: 'right' }}>
                  <Icon type="menu" className={style.navIcon} onClick={this.openMenu} />
                </Col>

                <Col lg={{ span: 21 }} md={{ span: 19 }} sm={{ span: 0 }} xs={{ span: 0 }}>
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
                      url.query.user && (
                        <Badge count={url.query.user.unread}>
                          <a href="/user/message" style={{ color: '#fff' }}>
                            <Icon type="inbox" style={{ fontSize: 20 }} />
                          </a>
                        </Badge>
                      )
                    }

                    {
                      url.query.user && <span style={{ margin: '0 10px' }}>|</span>
                    }

                    {
                      url.query.user ? (
                        <Dropdown overlay={(
                          <Menu>
                            <Menu.Item>
                              <a href="/user">个人主页</a>
                            </Menu.Item>
                            <Menu.Item>
                              <a href="javascript:;" onClick={this.logout}>退出登录</a>
                            </Menu.Item>
                          </Menu>
                        )}>
                          <a href="/user" style={{ color: '#fff' }}>
                            {url.query.user.student.name}
                          </a>
                        </Dropdown>
                      ) : <a href={url.query.loginUrl}><Button ghost type="primary">登录</Button></a>
                    }
                  </div>
                </Col>
              </Row>

              <div className={className([style.miniMenu], {
                [style.showMiniMenu]: this.state.small
              })}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  className={style.menuSmall}
                  selectedKeys={[menuContentKey]}
                  onClick={item => this.MenuClickHandler(item)}>
                  <Menu.Item key="1">关于</Menu.Item>
                  <Menu.Item key="2">查高校</Menu.Item>
                  <Menu.Item key="3">查教授</Menu.Item>
                  <Menu.Item key="4">点评</Menu.Item>
                </Menu>
              </div>

              <input type="hidden" id="login-url" value={url.query.loginUrl} />
              {menuContentKey && this.renderMenuContent(menuContentKey)}
            </Header>
          </Affix>


          {children}

          <Footer className={style.footer}>
            <div>
              <a href="/about">关于我们</a>
              <a href="/join">加入我们</a>
              <a href="/contact">联系我们</a>
              <a href="/terms">使用协议</a>
              <a href="/privacy">隐私政策</a>
              <a href="/copyright">版权声明</a>
            </div>
            <div>备案号 xxxxxxxx</div>
          </Footer>
        </Layout>
      </Base>
    );
  }
}