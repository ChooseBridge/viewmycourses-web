import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Button,
  Radio,
  AutoComplete,
  Select
} from 'antd';
import Base from '../base/index.js';
import commonStyle from '../../common/style/index.css';
import style from './style.css';
import cla from 'classnames';
import SearchSchool from './search-school'
import SearchProfessor from './search-professor';
import queryString from 'query-string'
import SearchRate from './search-rate';

const {
  Header,
  Footer,
  Content
} = Layout;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Option = Select.Option;

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
    if (this.state.menuContentKey == item.key) {
      this.setState({
        menuContentKey: ''
      });
      return;
    }

    this.setState({
      menuContentKey: item.key
    });
  }

  onRadioChangeHandler = (e) => {
    const {
      menuContentKey
    } = this.state;

    switch (menuContentKey) {
      case '2':
        this.setState({
          schoolChoose: e.target.value
        });
        return;
      case '3':
        this.setState({
          professorChoose: e.target.value
        });
        return;
      case '4':
        this.setState({
          rateChoose: e.target.value
        });
        return;
    }
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
        return <div></div>;
    }
  }

  goSearch(query) {
    location.href = '/search?' + queryString.stringify(query)
  }

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
      <Base title={title}>
        <Layout>
          <Header className={style.header}>
            <Row style={{ flex: 1 }}>
              <Col lg={{ span: 4 }} md={{ span: 5 }}>
                <h2 className={style.logo}><a href="/">桥选®校园</a></h2>
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
                    url.query.user ? url.query.user.name : <a href={url.query.loginUrl}><Button>登录</Button></a>
                  }
                </div>
              </Col>
            </Row>

            <input type="hidden" id="login-url" value={url.query.loginUrl} />
          </Header>

          {menuContentKey && this.renderMenuContent(menuContentKey)}

          {children}

          <Footer className={style.footer}>
            <div>
              <a href="">关于我们</a>
              <a href="">加入我们</a>
              <a href="">联系我们</a>
              <a href="">使用规范</a>
              <a href="">隐私政策</a>
            </div>
            <div>备案号 xxxxxxxx</div>
          </Footer>
        </Layout>
      </Base>
    );
  }
}