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
  message,
  Select,
  Avatar
} from 'antd';
import cla from 'classnames';
import client from '../../common/client';
import api from '../../common/api';
import style from '../../common/style/home.css';
import commonStyle from '../../common/style/index.css';
// import SchoolRate from '../../components/school-rate';
import SchoolRate from '../../components/school-rate-2';
import Share from '../../components/share';
import Thumb from '../../components/thumb/index';
import Amend from '../../components/amend';
import requiredEdu from '../../common/required-edu';

const {
  Content
} = Layout;

const { Option } = Select;

function renderDistrict(item) {
  return (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={6} className={commonStyle.textCenter}>
        <div>综合得分</div>
        <div
          style={{ fontSize: 50 }}
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

    let contentList = {};

    const {
      school
    } = props.url.query;

    console.log(this.props.url.query);

    school.schoolDistrictInfo.map(item => {
      contentList[item.school_district_name] = renderDistrict(item);
    });

    this.state = {
      key: school.schoolDistrictInfo[0] && school.schoolDistrictInfo[0].school_district_name,
      school,
      contentList,
      tabList: school.schoolDistrictInfo.map(item => {
        return {
          key: item.school_district_name,
          tab: item.school_district_name
        };
      }),
      ratesInfo: school.ratesInfo
    };

    this.onTabChange = this.onTabChange.bind(this);
    this.thumbsSchool = this.thumbsSchool.bind(this);
  }

  componentDidMount() {
    this.setState({
      listHeight: this.list.offsetHeight
    });

    window.addEventListener('scroll', this.onScroll);

    const tabs = document.getElementsByClassName('ant-tabs-tab');

    for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.marginRight = '10px';
    }
  }

  onScroll = () => {
    // this.setState({
    //   dense: true
    // });

    // clearTimeout(this.t);
    // this.t = setTimeout(() => {
    //   this.setState({
    //     dense: false
    //   });
    // }, 50);
  };

  onTabChange(key, type) {
    this.setState({
      [type]: key
    });
  }

  getSchoolDetail() {
    client(api.getSchoolDetail)({
      query: {
        school_id: this.props.url.query.id
      }
    }).then(school => {
      this.setState({
        school

      });
    });
  }

  onThumbsUp(school_rate_id, done) {
    client(api.thumbsUpSchoolRate)({
      query: {
        school_rate_id
      }
    }).then(res => {
      // console.log(res);
      this.getSchoolDetail();
      done();
    }).catch(() => {
      message.error('您已经投过票了');
    });
  }

  onThumbsDown(school_rate_id, done) {
    client(api.thumbsDownSchoolRate)({
      query: {
        school_rate_id
      }
    }).then(res => {
      // console.log(res);
      this.getSchoolDetail();
      done();
    }).catch(() => {
      message.error('您已经投过票了');
    });
  }

  thumbsSchool() {
    client(api.thumbsUpSchool)({
      query: {
        school_id: this.props.url.query.id
      }
    }).then(res => {
      this.getSchoolDetail();
    });
  }

  handleChange = (e) => {
    const {
      school
    } = this.state;

    let ratesInfo;

    if (e == 'all') {
      ratesInfo = school.ratesInfo;
    } else {
      ratesInfo = school.ratesInfo.filter(item => item.school_district_name == e);
    }

    this.setState({
      ratesInfo
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
      ratesInfo
    } = this.state;

    const {
      schoolInfo,
      randomProfessor,
      schoolDistrictInfo
    } = school;

    return (
      <ALayout title={`${schoolInfo.school_name}`} url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>

            <Card className={commonStyle.bgWrap} style={{ marginBottom: 10 }}>
              <Row type="flex" justify="space-around" align="middle">
                <Col span={3} className={commonStyle.textCenter}>
                  <div>综合得分</div>
                  <div className={style.points}>
                    {schoolInfo.school_score}
                  </div>
                </Col>

                <Col span={21}>
                  <Row type="flex" align="middle">
                    <Col>
                      <span style={{ fontSize: 32 }}>{schoolInfo.school_name}</span>
                      <Thumb
                        info={schoolInfo}
                        onThumbs={this.thumbsSchool} />
                      <span style={{ marginLeft: 5 }}>{schoolInfo.thumbs_up_num}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <div>{schoolInfo.city}, {schoolInfo.province} {schoolInfo.country} <span
                        className={style.colorBlue}>
                        <a href={schoolInfo.website_url} target="_blank">网站</a></span>
                      </div>

                      <Amend
                        amendType='school'
                        id={this.props.url.query.id} />

                      <Row style={{ marginTop: 24 }}>
                        <Col span={10}>
                          <a
                            onClick={e => {
                              if (!url.query.user.student.is_email_edu) {
                                e.preventDefault();
                                requiredEdu();
                              }
                            }}
                            href={`/school/${this.props.url.query.id}/rate`}>
                            <Button type="primary">为这所高校评分</Button>
                          </a>
                        </Col>
                        <Col span={14}>
                          <Share />
                        </Col>
                      </Row>
                    </Col>
                    {randomProfessor && (
                      <Col span={12}>
                        <div><h2 style={{ margin: 0 }}>每日推荐</h2></div>
                        <Row>
                          <Col span={4}>
                            <Avatar size="large" icon="user" style={{ marginTop: 15 }} />
                          </Col>
                          <Col span={12}>
                            <div className={style.schoolStyle}>
                              <a href={`/professor/${randomProfessor.professor_id}`}>
                                {randomProfessor.professor_full_name}
                              </a>
                            </div>
                            <div style={{ color: '#9e9e9e' }}>{randomProfessor.rate_num}条评论</div>
                          </Col>
                          <Col
                            span={8}
                            className={cla(commonStyle.textRight)}>
                            <div className={style.schoolStyle}>{randomProfessor.effort}</div>
                            <div>课程平均努力指数</div>
                          </Col>
                        </Row>
                      </Col>
                    )}
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
              <Card className={style.wrap} style={{ marginBottom: 30 }}>
                <Row>
                  <Col span={12} className={style.textWrap}>{ratesInfo.length}位同学的点评</Col>

                  <Col span={12} className={commonStyle.textRight}>
                    {
                      schoolDistrictInfo && <Select
                      placeholder="按课程筛选"
                      style={{ width: 200 }}
                      defaultValue="all"
                      onChange={this.handleChange}>
                      <Option value="all">全部</Option>
                      {
                        schoolDistrictInfo.map(item =>
                          <Option
                            key={item.school_district_id}
                            value={item.school_district_name}>{item.school_district_name}
                          </Option>
                        )
                      }
                    </Select>
                    }
                  </Col>
                </Row>
              </Card>
            }

            <div
              className={cla({ 'dense': this.state.dense })}
              ref={ref => this.list = ref}
              style={{ height: this.state.listHeight }}>

              {
                ratesInfo && ratesInfo.map((item, index) =>
                  <SchoolRate
                    rate={item} key={index}
                    dark={index % 2 !== 0}
                    onThumbsDown={done => this.onThumbsDown(item.school_rate_id, done)}
                    onThumbsUp={done => this.onThumbsUp(item.school_rate_id, done)} />
                )
              }
            </div>

            <Card className={style.wrap} style={{ textAlign: 'center' }}>
              <h1>想让学弟学妹们更加了解你的学校？</h1>
              <div>
                <a
                  onClick={e => {
                    if (!url.query.user.student.is_email_edu) {
                      e.preventDefault();
                      requiredEdu();
                    }
                  }}
                  href={`/school/${this.props.url.query.id}/rate`}>
                  <Button
                    size="large"
                    style={{ width: 250 }}
                    type="primary">
                    为这个校园评分
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default School;