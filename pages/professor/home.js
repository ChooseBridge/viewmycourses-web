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
  message
} from 'antd';
import cla from 'classnames';
import client from '../../common/client';
import api from '../../common/api';
import style from '../../common/style/home.css';
import commonStyle from '../../common/style/index.css';
import Share from '../../components/share';
// import ProfessorRate from '../../components/professor-rate/index';
import ProfessorRate from '../../components/professor-rate-2/index';
import Thumb from '../../components/thumb/index';
import Amend from '../../components/amend';
import requiredEdu from '../../common/required-edu';

const {
  Content
} = Layout;

const Option = Select.Option;

class Professor extends React.Component {
  constructor(props) {
    super(props);

    const {
      professor
    } = this.props.url.query;

    console.log(professor);

    this.state = {
      professor,
      rateInfo: professor.rateInfo
    };

    this.handleChange = this.handleChange.bind(this);
    this.thumbsProfessor = this.thumbsProfessor.bind(this);
    this.onThumbsUp = this.onThumbsUp.bind(this);
    this.onThumbsDown = this.onThumbsDown.bind(this);
  }

  componentDidMount() {
    this.setState({
      listHeight: this.list.offsetHeight
    });

    window.addEventListener('scroll', this.onScroll);
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

  handleChange(e) {
    const {
      professor
    } = this.state;

    let rateInfo;

    if (e == 'all') {
      rateInfo = professor.rateInfo;
    } else {
      rateInfo = professor.rateInfo.filter(item => item.course_code == e);
    }

    this.setState({
      rateInfo
    });
  }

  getProfessorDetail() {
    client(api.getProfessorDetail)({
      query: {
        professor_id: this.props.url.query.id
      }
    }).then(professor => {
      this.setState({
        professor
      });
    });
  }

  thumbsProfessor() {
    client(api.thumbsUpProfessor)({
      query: {
        professor_id: this.props.url.query.id
      }
    }).then(res => {
      this.getProfessorDetail();
    });
  }

  onThumbsUp(professor_rate_id) {
    client(api.thumbsUpProfessorRate)({
      query: {
        professor_rate_id
      }
    }).then(res => {
      this.getProfessorDetail();
    }).catch(() => {
      message.error('您已经点击过没用了');
    });
  }

  onThumbsDown(professor_rate_id) {
    client(api.thumbsDownProfessorRate)({
      query: {
        professor_rate_id
      }
    }).then(res => {
      this.getProfessorDetail();
    }).catch(() => {
      message.error('您已经点击过有用了');
    });
  }

  render() {
    const {
      url
    } = this.props;

    const {
      professor,
      rateInfo
    } = this.state;

    const {
      professorInfo,
      coursesInfo,
      schoolCategoryInfo,
      tagsInfo
    } = professor;

    return (
      <ALayout title='教授主页' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            <Card className={style.wrap}>
              {
                professorInfo &&
                <Row style={{ position: 'relative' }}>
                  <Col span={12}>
                    <Row>
                      <Col span={20}>
                        <Row type="flex" align="middle">
                          <Col span={4}><Avatar size="large" icon="user" /></Col>
                          <Col>
                            <span style={{ fontSize: 32 }}>
                              {professorInfo.professor_full_name}
                            </span>
                          </Col>
                          <Col>
                            <Thumb
                              info={professorInfo}
                              onThumbs={this.thumbsProfessor} />
                            <span style={{ marginLeft: 5 }}>{professorInfo.thumbs_up_num}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={4}></Col>
                          <Col span={20}>{professorInfo.country}{professorInfo.province} {professorInfo.school}</Col>
                        </Row>
                        {/*<Row>*/}
                        {/*<Col span={16}>心理学教授</Col>*/}
                        {/*</Row>*/}
                        <Row>
                          <Col span={4}></Col>
                          <Col span={20} className={commonStyle.colorBlue} style={{ marginBottom: 20 }}>
                            <Amend
                              amendType='professor'
                              id={this.props.url.query.id} />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={4}></Col>
                          <Col span={11}>
                            <a
                              onClick={e => {
                                if (!url.query.user.student.is_email_edu) {
                                  e.preventDefault();
                                  requiredEdu();
                                }
                              }}
                              href={`/professor/${url.query.id}/rate`}>
                              <Button type="primary">点评该教授的课程</Button>
                            </a>
                          </Col>
                          <Col span={9}>
                            <Share/>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col className={style.tagWrap} span={12}>
                    {
                      Object.keys(tagsInfo).map(key =>
                        <Tag
                          key={key}
                          color="#ddd"
                          className={style.tag}>{key}（{tagsInfo[key]}）
                        </Tag>
                      )
                    }
                  </Col>
                </Row>
              }
            </Card>

            <Card className={cla(style.wrap)}>
              <Row type="flex">
                <Col span={6} className={commonStyle.textCenter}>
                  <div>平均努力指数</div>
                  {
                    professorInfo &&
                    <div className={style.points}>{professorInfo.effort}</div>
                  }
                </Col>

                <Col span={18} className={style.classWrap}>
                  <h2>所教课程</h2>
                  <div style={{ marginBottom: 10 }}>看看同学们在这些课程上的努力程度</div>
                  <Row>
                    {
                      coursesInfo &&
                      coursesInfo.map(item =>
                        <Col key={item.course_id} span={6}>
                          <span className={commonStyle.colorBlue}>{item.course_code}</span> {item.effort}
                        </Col>
                      )
                    }
                  </Row>
                </Col>
              </Row>
            </Card>

            <Card className={style.wrap} style={{ marginBottom: 30 }}>
              <Row>
                {
                  rateInfo &&
                  <Col span={12} className={style.textWrap}>{rateInfo.length}位同学的点评</Col>
                }
                <Col span={12} className={commonStyle.textRight}>
                  <Select
                    placeholder="按课程筛选"
                    style={{ width: 200 }}
                    defaultValue="all"
                    onChange={this.handleChange}>
                    <Option value="all">全部</Option>
                    {
                      coursesInfo &&
                      coursesInfo.map(item =>
                        <Option
                          key={item.course_id}
                          value={item.course_code}>{item.course_code}
                        </Option>
                      )
                    }
                  </Select>
                </Col>
              </Row>
            </Card>

            <div
              className={cla({ 'dense': this.state.dense })}
              ref={ref => this.list = ref}
              style={{ height: this.state.listHeight }}>


              {
                rateInfo &&
                rateInfo.map((item, index) =>
                  <ProfessorRate
                    onThumbsUp={() => this.onThumbsUp(item.professor_rate_id)}
                    onThumbsDown={() => this.onThumbsDown(item.professor_rate_id)}
                    key={index}
                    rate={item}
                    dark={index % 2 !== 0} />
                )
              }
            </div>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Professor;