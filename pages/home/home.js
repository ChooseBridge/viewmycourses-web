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
      <ALayout url={url}>
        <div className={style.bg}>
          <Content className={cln(commonStyle.container, style.center)}>
            <div className={style.headline}>
              <h1>我们想未来所想<br />而你，就是未来</h1>
              <div>输入学校名或教授名</div>

              {(!showInput) && (
                <Typed
                  strings={[
                    '下学期想上什么课？',
                    '工商管理学',
                    '高等数学',
                    '清华大学',
                  '大学英语',
                  '你的梦校是什么？',
                  'Stanford University',
                  '复旦大学',
                  '微观经济学',
                  'Harvard University',
                  '你在你现在的大学过得好吗？',
                  '北京大学',
                  '物理',
                  '政治哲学',
                  '上海交通大学',
                  '下学期想上谁的课？',
                  'Cornell University',
                  '环境科学',
                  '上海纽约大学',
                  '新闻学']}
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
                    src="/img/i1.jpg" />
                </a>

                <div className={style.textWrapper}>
                  <h4><a href="">高校生拿A攻略</a></h4>
                  <div className={style.date}>2018年3月16日</div>
                </div>
              </Col>
              <Col span={8} className={style.item}>
                <a href="">
                  <img
                    src="/img/i2.jpg" />
                </a>

                <div className={style.textWrapper}>
                  <h4><a href="">用户手册：高中生选校指南</a></h4>
                  <div className={style.date}>2018年3月16日</div>
                </div>
              </Col>
              <Col span={8} className={style.item}>
                <a href="">
                  <img
                    src="/img/i3.jpg" />
                </a>

                <div className={style.textWrapper}>
                  <h4><a href="">桥选出品——关于我们</a></h4>
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