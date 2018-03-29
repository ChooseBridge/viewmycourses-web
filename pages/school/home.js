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
  message
} from 'antd';
import cla from 'classnames';
import client from '../../common/client';
import api from '../../common/api';
import style from '../../common/style/home.css';
import commonStyle from '../../common/style/index.css';
// import SchoolRate from '../../components/school-rate';
import SchoolRate from '../../components/school-rate-2';

const {
  Content
} = Layout;

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

    // console.log(school);

    school.schoolDistrictInfo.map(item => {
      contentList[item.school_district_name] = renderDistrict(item);
    });

    console.log(school);

    this.state = {
      key: school.schoolDistrictInfo[0] && school.schoolDistrictInfo[0].school_district_name,
      school,
      contentList,
      tabList: school.schoolDistrictInfo.map(item => {
        return {
          key: item.school_district_name,
          tab: item.school_district_name
        };
      })
    };

    this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      listHeight: this.list.offsetHeight
    });
    window.addEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    this.setState({
      dense: true
    });

    clearTimeout(this.t);
    this.t = setTimeout(() => {
      this.setState({
        dense: false
      });
    }, 50);
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

  onThumbsUp(school_rate_id) {
    client(api.thumbsUpSchoolRate)({
      query: {
        school_rate_id
      }
    }).then(res => {
      // console.log(res);
      this.getSchoolDetail();
    }).catch(() => {
      message.error('您已点击过认为没用了');
    });
  }

  onThumbsDown(school_rate_id) {
    client(api.thumbsDownSchoolRate)({
      query: {
        school_rate_id
      }
    }).then(res => {
      // console.log(res);
      this.getSchoolDetail();
    }).catch(() => {
      message.error('您已点击过认为有用了');
    });
  }

  render() {
    const {
      url
    } = this.props;

    const {
      school,
      tabList,
      contentList
    } = this.state;

    const {
      schoolInfo,
      ratesInfo,
      randomProfessor
    } = school;

    return (
      <ALayout title='学校主页' url={url}>
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
                  <div><span style={{ fontSize: 32 }}>{schoolInfo.school_name}</span></div>
                  <Row>
                    <Col span={12}>
                      <div>{schoolInfo.country} {schoolInfo.province} <span className={style.colorBlue}><a
                        href={schoolInfo.website_url}>网站</a></span></div>
                      <div><a href="/professor/create">提交修正</a></div>
                      <Row style={{ marginTop: 24 }}>
                        <Col span={12}><a href={`/school/rate?id=${this.props.url.query.id}`}><Button type="primary">为这所高校评分</Button></a></Col>
                        <Col span={4}><Button type="primary"
                                              style={{ backgroundColor: '#737373', border: 'none' }}>分享</Button></Col>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <div><h2>每日推荐</h2></div>
                      <Row>
                        <Col span={4}><Icon type="smile" style={{ fontSize: 48, color: '#66dc66' }} /></Col>
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
                          className={cla(commonStyle.textRight, style.schoolStyle)}>
                          {randomProfessor.effort}
                        </Col>
                      </Row>
                    </Col>
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
                  <Col span={24} className={style.textWrap}>{ratesInfo.length}位同学的点评</Col>
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
                    onThumbsDown={() => this.onThumbsDown(item.school_rate_id)}
                    onThumbsUp={() => this.onThumbsUp(item.school_rate_id)} />
                )
              }
            </div>

            <Card className={style.wrap}>
              <h1>这些评论对你有用吗?帮助你的同学</h1>
              <div>
                <a href={`/school/rate?id=${this.props.url.query.id}`}>
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