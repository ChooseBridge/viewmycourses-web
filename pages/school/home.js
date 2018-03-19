import React from 'react';
import ALayout from '../../components/layout/index.js';
import {
  Layout,
  Breadcrumb,
  Button,
  Icon,
  Avatar,
  Row,
  Col,
  Tag,
  Select,
  Card,
} from 'antd';
import cla from 'classnames';
import style from '../../common/style/home.css';
import commonStyle from '../../common/style/index.css';

const {
  Content
} = Layout;

const Option = Select.Option;

const tabList = [{
  key: 'tab1',
  tab: '综合评分',
}, {
  key: 'tab2',
  tab: '邯郸路校区',
},{
  key: 'tab3',
  tab: '世界路校区',
},{
  key: 'tab4',
  tab: '中原路校区',
}];

const contentList = {
  tab1: <Row type="flex" justify="space-around" align="middle">
    <Col span={6} className={commonStyle.textCenter}>
      <div>综合得分</div>
      <div style={{fontSize:50}} className={style.schoolStyle}>4.5</div>
    </Col>
    <Col span={6}>
      <div>社会声誉：4</div>
      <div>学术水平：4</div>
      <div>网络服务：4.5</div>
      <div>住宿条件：5</div>
      <div>餐饮质量：5</div>
    </Col>
    <Col span={6}>
      <div>校园地理位置：4.0</div>
      <div>校园课外活动：4.5</div>
      <div>校园基础设施：5</div>
      <div>生活幸福指数：4</div>
      <div>校方与学生群体关系：5</div>
    </Col>
  </Row>,
  tab2: <Row type="flex" justify="space-around" align="middle">
    <Col span={6} className={commonStyle.textCenter}>
      <div>综合得分</div>
      <div style={{fontSize:50}} className={style.schoolStyle}>4.5</div>
    </Col>
    <Col span={6}>
      <div>社会声誉：4</div>
      <div>学术水平：4</div>
      <div>网络服务：4.5</div>
      <div>住宿条件：5</div>
      <div>餐饮质量：5</div>
    </Col>
    <Col span={6}>
      <div>校园地理位置：4.0</div>
      <div>校园课外活动：4.5</div>
      <div>校园基础设施：5</div>
      <div>生活幸福指数：4</div>
      <div>校方与学生群体关系：5</div>
    </Col>
  </Row>,
  tab3: <Row type="flex" justify="space-around" align="middle">
    <Col span={6} className={commonStyle.textCenter}>
      <div>综合得分</div>
      <div style={{fontSize:50}} className={style.schoolStyle}>4.5</div>
    </Col>
    <Col span={6}>
      <div>社会声誉：4</div>
      <div>学术水平：4</div>
      <div>网络服务：4.5</div>
      <div>住宿条件：5</div>
      <div>餐饮质量：5</div>
    </Col>
    <Col span={6}>
      <div>校园地理位置：4.0</div>
      <div>校园课外活动：4.5</div>
      <div>校园基础设施：5</div>
      <div>生活幸福指数：4</div>
      <div>校方与学生群体关系：5</div>
    </Col>
  </Row>,
  tab4: <Row type="flex" justify="space-around" align="middle">
    <Col span={6} className={commonStyle.textCenter}>
      <div>综合得分</div>
      <div style={{fontSize:50}} className={style.schoolStyle}>4.5</div>
    </Col>
    <Col span={6}>
      <div>社会声誉：4</div>
      <div>学术水平：4</div>
      <div>网络服务：4.5</div>
      <div>住宿条件：5</div>
      <div>餐饮质量：5</div>
    </Col>
    <Col span={6}>
      <div>校园地理位置：4.0</div>
      <div>校园课外活动：4.5</div>
      <div>校园基础设施：5</div>
      <div>生活幸福指数：4</div>
      <div>校方与学生群体关系：5</div>
    </Col>
  </Row>,
};

const gridStyle = {
  // width: '25%',
  textAlign: 'center',
};

class School extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: 'tab1',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount() {

  }

  handleChange(e) {
    console.log(e);
  }

  onTabChange(key, type) {
    console.log(key, type);
    this.setState({ [type]: key });
  }

  render() {
    const {
      url
    } = this.props;

    return (
      <ALayout title='学校主页' url={url}>
        <Content style={{ padding: '0 160px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={style.bgWrap}>
            <Card className={style.wrap}>
              <Row style={{position:'relative'}}>
                <Col span={12}>
                  <Row type="flex" justify="space-around" align="middle">
                    <Col span={8} className={cla(commonStyle.textCenter)}>
                      <div>平均努力指数</div>
                      <div className={style.points}>4.5</div>
                    </Col>
                    <Col span={16}>
                      <Row>
                        <Col span={16}>
                          <span style={{fontSize:32}}>圣约翰大学</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={16}>牙买加 纽约 <span className={style.colorBlue}>网站</span></Col>
                      </Row>
                      <Row>
                        <Col span={16} className={commonStyle.colorBlue} style={{marginBottom:20}}>提交修正</Col>
                      </Row>
                      <Row>
                        <Col span={12}><Button type="primary">为这所高校评分</Button></Col>
                        <Col span={4}><Button type="primary" style={{backgroundColor:'#737373',border:'none'}}>分享</Button></Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col className={style.tagWrap} span={12}>
                  <div><h2>每日推荐</h2></div>
                  <Row>
                    <Col span={4}><Icon type="smile" style={{ fontSize: 48, color: '#66dc66' }} /></Col>
                    <Col span={12}>
                      <div className={style.schoolStyle}>Snbino 安东尼</div>
                      <div style={{color:'#9e9e9e'}}>189条评论</div>
                    </Col>
                    <Col span={8} className={cla(commonStyle.textRight, style.schoolStyle)}>5.0</Col>
                  </Row>
                </Col>
              </Row>
            </Card>

            <Card
              className={style.wrap}
              style={{ width: '100%' }}
              tabList={tabList}
              activeTabKey={this.state.key}
              onTabChange={key => this.onTabChange(key, 'key')}>
              {contentList[this.state.key]}
            </Card>

            <Card className={cla(style.wrap)}>
              <Row>
                <Col span={24} className={style.textWrap}>2位同学的点评</Col>
              </Row>

              <Row className={style.rowWrap}>
                <Col span={4}>
                  <Card>
                    <div className={commonStyle.textCenter}>
                      <div>综合得分</div>
                      <div className={style.schoolStyle}>4.5</div>
                    </div>
                    <div>
                      <div>2018</div>
                      <div>心理学专业</div>
                      <div>邯郸路校区</div>
                    </div>
                  </Card>
                </Col>
                <Col span={10}>
                  <Card>
                    <div>伟大的大学，它来这里工作很好，并且教授真的有你，并帮助你获得实习和工作。</div>
                    <div className={style.likeWrap}>
                      <span style={{marginRight: 6}}>
                        <Icon type="like-o" style={{color:'red'}}/>98% 的人认为有用
                      </span>
                      <Icon type="dislike-o" />2% 的人认为没用
                    </div>
                  </Card>
                </Col>
                <Col span={10}>
                  <Card>
                    <Row>
                      <Col span={12}>
                        <div>社会声誉：4</div>
                        <div>学术水平：4</div>
                        <div>网络服务：4.5</div>
                        <div>住宿条件：5</div>
                        <div>餐饮质量：5</div>
                      </Col>
                      <Col span={12}>
                        <div>校园地理位置：4.0</div>
                        <div>校园课外活动：4.5</div>
                        <div>校园基础设施：5</div>
                        <div>生活幸福指数：4</div>
                        <div>校方与学生群体关系：5</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default School;