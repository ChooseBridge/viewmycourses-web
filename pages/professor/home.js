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
import ProfessorRate from '../../components/professor-rate/index';

const {
  Content
} = Layout;

const Option = Select.Option;

class Professor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      professor: this.props.url.query.professor,
      rateInfo: this.props.url.query.professor.rateInfo,
    };

    this.handleChange = this.handleChange.bind(this);
    this.thumbsProfessor = this.thumbsProfessor.bind(this);
    this.onThumbsUp = this.onThumbsUp.bind(this);
    this.onThumbsDown = this.onThumbsDown.bind(this);
  }

  handleChange(e) {
    console.log(e);

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
      rateInfo,
    });
  }

  getProfessorDetail() {
    client(api.getProfessorDetail)({
      query: {
        professor_id: this.props.url.query.id
      }
    }).then(professor => {
      this.setState({
        professor,
      });
    });
  }

  thumbsProfessor() {
    client(api.thumbsUpProfessor)({
      query: {
        professor_id: this.props.url.query.id
      }
    }).then(res => {
      // console.log(res);
      this.getProfessorDetail();
    });
  }

  onThumbsUp(professor_rate_id) {
    client(api.thumbsUpProfessorRate)({
      query: {
        professor_rate_id,
      }
    }).then(res => {
      // console.log(res);
      this.getProfessorDetail();
    }).catch(() => {
      message.error('您已经点击过没用了');
    });
  }

  onThumbsDown(professor_rate_id) {
    client(api.thumbsDownProfessorRate)({
      query: {
        professor_rate_id,
      }
    }).then(res => {
      // console.log(res);
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
                      <Col span={4}><Avatar size="large" icon="user" /></Col>
                      <Col span={20}>
                        <Row>
                          <Col span={16}>
                            <span style={{ fontSize: 32, marginRight: 6 }}>
                              {professorInfo.professor_full_name}
                            </span>
                            {
                              professorInfo.is_thumbs_up ? <Icon
                                  onClick={this.thumbsProfessor}
                                  type="heart"
                                  style={{ color: 'red' }} />
                                : <Icon
                                  onClick={this.thumbsProfessor}
                                  type="heart-o" />
                            }
                            <span style={{ marginLeft: 5 }}>{professorInfo.thumbs_up_num}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={16}>{professorInfo.country}{professorInfo.province} {professorInfo.school}</Col>
                        </Row>
                        <Row>
                          <Col span={16}>心理学教授</Col>
                        </Row>
                        <Row>
                          <Col span={16} className={commonStyle.colorBlue} style={{ marginBottom: 20 }}>提交修正</Col>
                        </Row>
                        <Row>
                          <Col span={9}>
                            <a href={`/professor/${url.query.id}/rate`}>
                              <Button type="primary">点评它的课程</Button>
                            </a>
                          </Col>
                          <Col span={7}>
                            <Button type="primary" style={{ backgroundColor: '#737373', border: 'none' }}>分享</Button>
                            {/*<Share/>*/}
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
                  <div style={{ marginBottom: 10 }}>看看其他同学对这位教授的评分情况</div>
                  <Row>
                    {
                      coursesInfo &&
                      coursesInfo.map(item =>
                        <Col key={item.course_id} span={6}>
                          {item.effort} <span className={commonStyle.colorBlue}>{item.course_code}</span>
                        </Col>
                      )
                    }
                  </Row>
                </Col>
              </Row>
            </Card>

            <Card className={style.wrap} style={{marginBottom: 0}}>
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
        </Content>
      </ALayout>
    );
  }
}

export default Professor;