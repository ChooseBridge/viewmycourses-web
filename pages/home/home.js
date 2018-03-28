import React from 'react';
import ALayout from '../../components/layout/index.js';
import { Layout, Breadcrumb, Button, Input, Row, Col } from 'antd';
import commonStyle from '../../common/style/index.css';
import api from '../../common/api';
import client from '../../common/client';
import style from './style.css';
import cln from 'classnames';
import Typed from 'react-typed';
import SearchBar from './search-bar';
import trim from 'trim';

const { Content } = Layout;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      kw: ''
    };
  }

  focusHandler = () => {
    if (!this.props.url.query.user) {
      return location.href = this.props.url.query.loginUrl
    }

    this.setState({
      showInput: true
    });

    setTimeout(() => {

      document.getElementsByClassName(style.input)[0].getElementsByTagName('input')[0].focus();
    }, 300);
  };

  render() {
    const {
      url
    } = this.props;

    const { showInput } = this.state;

    return (
      <ALayout title='首页' url={url}>
        <div className={style.bg}>
          <Content className={commonStyle.container}>
            <div className={style.headline}>
              <h1>我们想未来所想<br />而你，就是未来</h1>
              <div>输入学校名或教授名</div>

              {(!showInput) && (
                <Typed
                  strings={[
                    '北京大学',
                    'University of Cambridge',
                    '中国人民大学',
                    'Stanford University',
                    '中国人民大学',
                    'California Institute of Technology']}
                  typeSpeed={40}
                  backSpeed={50}
                  attr="placeholder"
                  loop>
                  <input type="text" className={style.input} onFocus={this.focusHandler} />
                </Typed>
              )}

              {
                showInput &&
                <div onKeyDown={e => {
                  if (e.keyCode === 13) {
                    const kw = trim(document.getElementsByClassName(style.input)[0].getElementsByTagName('input')[0].value);
                    location.href = '/search?mode=all&name=' + kw;
                  }
                }}>
                  <SearchBar
                    className={style.input}
                    onBlur={() => {
                      this.setState({ showInput: trim(document.getElementsByClassName(style.input)[0].getElementsByTagName('input')[0].value) !== '' });
                    }}
                    onSelect={e => location.href = '/search?mode=all&name=' + trim(e)} />
                </div>
              }

            </div>

            <Row gutter={32} className={style.news}>
              <Col span={8} className={style.item}>
                <a href="">
                  <img
                    src="https://www.mckinsey.com/~/media/McKinsey/About%20Us/New%20at%20McKinsey/Digital%202020%20Helping%20companies%20set%20the%20stage%20for%20their%20digital%20future/blog-digital2020-thumb3.ashx?mw=677&car=42:25" />
                </a>

                <div className={style.textWrapper}>
                  <h4><a href="">数字20/20：帮助公司为数字化未来奠定基础</a></h4>
                  <div className={style.date}>2018年3月16日</div>
                </div>
              </Col>
              <Col span={8} className={style.item}>
                <a href="">
                  <img
                    src="https://www.mckinsey.com/~/media/McKinsey/About%20Us/New%20at%20McKinsey/Digital%202020%20Helping%20companies%20set%20the%20stage%20for%20their%20digital%20future/blog-digital2020-thumb3.ashx?mw=677&car=42:25" />
                </a>

                <div className={style.textWrapper}>
                  <h4><a href="">数字20/20：帮助公司为数字化未来奠定基础</a></h4>
                  <div className={style.date}>2018年3月16日</div>
                </div>
              </Col>
              <Col span={8} className={style.item}>
                <a href="">
                  <img
                    src="https://www.mckinsey.com/~/media/McKinsey/About%20Us/New%20at%20McKinsey/Digital%202020%20Helping%20companies%20set%20the%20stage%20for%20their%20digital%20future/blog-digital2020-thumb3.ashx?mw=677&car=42:25" />
                </a>

                <div className={style.textWrapper}>
                  <h4><a href="">数字20/20：帮助公司为数字化未来奠定基础</a></h4>
                  <div className={style.date}>2018年3月16日</div>
                </div>
              </Col>
            </Row>
          </Content>
        </div>

        {/*<Content className={cln(commonStyle.container, style.news)}>*/}

          {/*<h3 className={style.newsTitle}>最新资讯</h3>*/}

          {/**/}
        {/*</Content>*/}
      </ALayout>
    );
  }
}

export default Home;