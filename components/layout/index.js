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
import RegionCascader from '../../components/region-cascader';

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
      rateChoose: 'presonal'
    };

    this.onRadioChangeHandler = this.onRadioChangeHandler.bind(this);
    this.onSelectChangeHandler = this.onSelectChangeHandler.bind(this);
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
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

  onRadioChangeHandler(e) {
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

  onSelectChangeHandler(e) {
    console.log(e);
  }

  onInputChangeHandler(e) {
    console.log(e);
  }

  renderFindSchool() {
    const {
      schoolChoose
    } = this.state;

    return (
      <div className={style.menuWrap}>
        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <h2>查找你的学校</h2>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <RadioGroup onChange={this.onRadioChangeHandler} value={schoolChoose}>
              <RadioButton value="name">按名称</RadioButton>
              <RadioButton value="region">按区域</RadioButton>
            </RadioGroup>
          </Col>
        </Row>

        {
          schoolChoose == 'name' ? <Row className={style.row}>
              <Col
                className={cla(commonStyle.textCenter)}
                span={12}
                offset={6}>
                <AutoComplete
                  style={{ width: 200, height: 32 }}
                  placeholder="学校名称"
                  onChange={this.onInputChangeHandler} />
              </Col>
            </Row>
            : <Row className={style.row}>
              <Col
                className={cla(commonStyle.textCenter)}
                span={12}
                offset={6}>
                <RegionCascader style={{ width: 200 }} onChange={e => console.log(e)} />
              </Col>
            </Row>
        }

        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <Button style={{ width: 200 }} type="primary">搜索</Button>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <a href="javascript:;" onClick={this.closeAll}>关闭</a>
          </Col>
        </Row>
      </div>
    );
  }

  renderFindProfessor() {
    const {
      professorChoose
    } = this.state;

    return (
      <div className={style.menuWrap}>
        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <h2>查找你的教授</h2>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <RadioGroup onChange={this.onRadioChangeHandler} value={professorChoose}>
              <RadioButton value="proName">按名称</RadioButton>
              <RadioButton value="school">按学校</RadioButton>
            </RadioGroup>
          </Col>
        </Row>

        {
          professorChoose == 'proName' ? <div>
              <Row className={style.row}>
                <Col
                  className={cla(commonStyle.textCenter)}
                  span={12}
                  offset={6}>
                  <div>I'm looking for a professor at</div>
                </Col>
              </Row>

              <Row className={style.row}>
                <Col
                  className={cla(commonStyle.textCenter)}
                  span={12}
                  offset={6}>
                  <AutoComplete
                    style={{ width: 200, height: 32 }}
                    placeholder="学校名称"
                    onChange={this.onInputChangeHandler} />
                </Col>
              </Row>

              <Row className={style.row}>
                <Col
                  className={cla(commonStyle.textCenter)}
                  span={12}
                  offset={6}>
                  <div>named</div>
                </Col>
              </Row>

              <Row className={style.row}>
                <Col
                  className={cla(commonStyle.textCenter)}
                  span={12}
                  offset={6}>
                  <AutoComplete
                    style={{ width: 200, height: 32 }}
                    placeholder="教授名字"
                    onChange={this.onInputChangeHandler} />
                </Col>
              </Row>
            </div>
            : <div>
              <Row className={style.row}>
                <Col
                  className={cla(commonStyle.textCenter)}
                  span={12}
                  offset={6}>
                  I'm looking for a professor at
                  <AutoComplete
                    style={{ width: 200, height: 32, paddingLeft: 4 }}
                    placeholder="学校名字"
                    onChange={this.onInputChangeHandler} />
                </Col>
              </Row>

              <Row className={style.row}>
                <Col
                  className={cla(commonStyle.textCenter)}
                  span={12}
                  offset={6}>
                  in the
                  <Select
                    placeholder="请选择学校"
                    style={{ width: 200, height: 32, paddingLeft: 4, paddingRight: 4 }}
                    onChange={this.onSelectChangeHandler}>
                    <Option value="学校1">学校1</Option>
                    <Option value="学校2">学校2</Option>
                    <Option value="学校3">学校3</Option>
                    <Option value="学校4">学校4</Option>
                  </Select>
                  department
                </Col>
              </Row>
            </div>
        }

        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <Button style={{ width: 200 }} type="primary">搜索</Button>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <a href="javascript:;" onClick={this.closeAll}>关闭</a>
          </Col>
        </Row>
      </div>
    );
  }

  renderComment() {
    const {
      rateChoose
    } = this.state;

    return (
      <div className={style.menuWrap}>
        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <h2>我要点评</h2>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <RadioGroup onChange={this.onRadioChangeHandler} value={rateChoose}>
              <RadioButton value="professor">教授</RadioButton>
              <RadioButton value="school">学校</RadioButton>
            </RadioGroup>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <div>I want to rate</div>
          </Col>
        </Row>

        {
          rateChoose == 'professor' ? <Row className={style.row}>
              <Col
                className={cla(commonStyle.textCenter)}
                span={12}
                offset={6}>
                <AutoComplete
                  style={{ width: 200, height: 32 }}
                  placeholder="教授名字"
                  onChange={this.onInputChangeHandler} />
              </Col>
            </Row>
            : <Row className={style.row}>
              <Col
                className={cla(commonStyle.textCenter)}
                span={12}
                offset={6}>
                <AutoComplete
                  style={{ width: 200, height: 32 }}
                  placeholder="学校名称"
                  onChange={this.onInputChangeHandler} />
              </Col>
            </Row>
        }

        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <Button style={{ width: 200 }} type="primary">搜索</Button>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col
            className={cla(commonStyle.textCenter)}
            span={12}
            offset={6}>
            <a href="javascript:;" onClick={this.closeAll}>关闭</a>
          </Col>
        </Row>
      </div>
    );
  }

  renderMenuContent(key) {
    switch (key) {
      case '2':
        return this.renderFindSchool();
      case '3':
        return this.renderFindProfessor();
      case '4':
        return this.renderComment();
      default:
        return <div></div>;
    }
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