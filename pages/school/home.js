import React from 'react';
import ALayout from '../../components/layout/index.js';
import {
  Layout,
  Breadcrumb,
  Button,
  Icon,
  Row,
  Col,
  Card,
} from 'antd';
import cla from 'classnames';
import client from '../../common/client';
import api from '../../common/api';
import style from '../../common/style/home.css';
import commonStyle from '../../common/style/index.css';

const {
  Content
} = Layout;

function renderDistrict(item) {
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={6} className={commonStyle.textCenter}>
        <div>综合得分</div>
        <div
          style={{fontSize:50}}
          className={style.schoolStyle}>
          {item.school_district_score}
        </div>
      </Col>
      <Col span={6}>
        <div>社会声誉：{item.social_reputation}</div>
        <div>学术水平：{item.academic_level}</div>
        <div>网络服务：{item.network_services}</div>
        <div>住宿条件：{item.accommodation}</div>
        <div>餐饮质量：{item.food_quality}</div>
      </Col>
      <Col span={6}>
        <div>校园地理位置：{item.campus_location}</div>
        <div>校园课外活动：{item.extracurricular_activities}</div>
        <div>校园基础设施：{item.campus_infrastructure}</div>
        <div>生活幸福指数：{item.life_happiness_index}</div>
        <div>校方与学生群体关系：{item.school_students_relations}</div>
      </Col>
    </Row>
  );
}

class School extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      school: {},
      tabList: [],
    };

    this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount() {
    client(api.getSchoolDetail)({
      query: {
        school_id: this.props.url.query.id
      }
    }).then(school => {
      let contentList = {};

      school.schoolDistrictInfo.map(item => {
        contentList[item.school_district_name] = renderDistrict(item);
      });

      this.setState({
        school,
        contentList,
        key: school.schoolDistrictInfo[0].school_district_name,
        tabList: school.schoolDistrictInfo.map(item => {
          return {
            key: item.school_district_name,
            tab: item.school_district_name,
          };
        })
      });
    });
  }

  onTabChange(key, type) {
    this.setState({
      [type]: key
    });
  }

  render() {
    const {
      url
    } = this.props;

    const {
      school,
      tabList,
      contentList,
    } = this.state;

    const {
      schoolInfo,
      ratesInfo,
    } = school;

    return (
      <ALayout title='学校主页' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            <Card className={style.wrap}>
              <Row style={{position:'relative'}}>
                <Col span={12}>
                {
                  schoolInfo &&
                  <Row type="flex" justify="space-around" align="middle">
                    <Col span={8} className={cla(commonStyle.textCenter)}>
                      <div>平均努力指数</div>
                      <div className={style.points}>{schoolInfo.effort}</div>
                    </Col>
                    <Col span={16}>
                      <Row>
                        <Col span={16}>
                          <span style={{fontSize:32}}>{schoolInfo.school_name}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={16}>{schoolInfo.country} {schoolInfo.province} <span className={style.colorBlue}><a href={schoolInfo.website_url}>网站</a></span></Col>
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
                }
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
              {contentList && contentList[this.state.key]}
            </Card>

            {
              ratesInfo &&
              <Card className={cla(style.wrap)}>
                <Row className={style.rowWrap}>
                  <Col span={24} className={style.textWrap}>{ratesInfo.length}位同学的点评</Col>
                </Row>
                {
                  ratesInfo.map((item, index) =>
                    <Row
                      key={`${item.school_district_name}${index}`}
                      type="flex"
                      className={style.rowWrap}>
                      <Card.Grid style={{width:'20%'}}>
                        <Col>
                          <div className={commonStyle.textCenter}>
                            <div>综合得分</div>
                            <div className={style.schoolStyle}>{item.score}</div>
                          </div>
                          <div>
                            <div>{item.student_name}</div>
                            <div>{item.school_district_name}</div>
                          </div>
                        </Col>
                      </Card.Grid>

                      <Card.Grid style={{width:'35%'}}>
                        <Col>
                          <div>{item.comment}</div>
                          <div className={style.likeWrap}>
                            <span style={{marginRight: 6}}>
                              <Icon type="like-o" style={{color:'red'}}/>98% 的人认为有用
                            </span>
                            <Icon type="dislike-o" />2% 的人认为没用
                          </div>
                        </Col>
                      </Card.Grid>

                      <Card.Grid style={{width:'45%'}}>
                        <Col>
                          <Row>
                            <Col span={12}>
                              <div>社会声誉：{item.social_reputation}</div>
                              <div>学术水平：{item.academic_level}</div>
                              <div>网络服务：{item.network_services}</div>
                              <div>住宿条件：{item.accommodation}</div>
                              <div>餐饮质量：{item.food_quality}</div>
                            </Col>
                            <Col span={12}>
                              <div>校园地理位置：{item.campus_location}</div>
                              <div>校园课外活动：{item.extracurricular_activities}</div>
                              <div>校园基础设施：{item.campus_infrastructure}</div>
                              <div>生活幸福指数：{item.life_happiness_index}</div>
                              <div>校方与学生群体关系：{item.school_students_relations}</div>
                            </Col>
                          </Row>
                        </Col>
                      </Card.Grid>
                    </Row>
                  )
                }
              </Card>
            }
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default School;