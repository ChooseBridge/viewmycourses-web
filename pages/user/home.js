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

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    client(api.getStudent)().then(res => {
      this.setState({
        ratesInfo: res.ratesInfo,
        student: res.student,
      });
    });
  }

  renderSchoolRate(item, key) {
    const {
      school_name,
      school_district_name,
      score,
      comment,
      social_reputation,
      academic_level,
      network_services,
      accommodation,
      food_quality,
      campus_location,
      extracurricular_activities,
      campus_infrastructure,
      life_happiness_index,
      school_students_relations,
    } = item;

    return (
      <div key={key}>
        <div className={style.schoolName}>
          <span className={commonStyle.colorBlue}>{school_name}</span> {school_district_name}
        </div>
        <Row type="flex" justify="start" align="middle">
          <Col span={3} className={commonStyle.textCenter}>
            <div>综合得分</div>
            <div className={style.schoolPoints}>{score}</div>
          </Col>
          <Col span={21}>
            <div>{comment}</div>
            <div style={{color: '#a6a6a2',marginTop:10}}>
              <Row>
                <Col span={4}>社会声誉：{social_reputation}</Col>
                <Col span={5}>学术水平：{academic_level}</Col>
                <Col span={5}>网络服务：{network_services}</Col>
                <Col span={5}>住宿条件：{accommodation}</Col>
                <Col span={5}>餐饮质量：{food_quality}</Col>
              </Row>
              <Row>
                <Col span={4}>校园地理位置：{campus_location}</Col>
                <Col span={5}>校园课外活动：{extracurricular_activities}</Col>
                <Col span={5}>校园基础设施：{campus_infrastructure}</Col>
                <Col span={5}>生活幸福指数：{life_happiness_index}</Col>
                <Col span={5}>校方与学生群体关系：{school_students_relations}</Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  renderProfessorRate(item, key) {
    const {
      effort,
      school_name,
      professor_name,
      course_code,
      course_category_name,
      course_name,
      is_attend,
      difficult_level,
      homework_num,
      quiz_num,
      course_related_quiz,
      spend_course_time_at_week,
      grade,
      tag,
    } = item;

    return (
      <div key={key}>
        <div className={style.schoolName}>
          <span className={commonStyle.colorBlue}>{course_code}</span> {school_name} {professor_name}
        </div>
        <Row type="flex" justify="start" align="middle">
          <Col span={3} className={commonStyle.textCenter}>
            <div>努力指数</div>
            <div className={style.schoolPoints}>{effort}</div>
          </Col>
          <Col span={21}>
            <div>
              <Row>
                <Col>
                  {
                    tag.split(',').map(tag =>
                      <Tag
                        key={tag}
                        color="#ddd"
                        className={style.tag}>
                        {tag}
                      </Tag>
                    )
                  }
                </Col>
              </Row>
            </div>
            <div>伟大的大学，它来这里工作很好，并且教授真的有你，并帮助你获得实习和工作伟大的大学，它来这里工作很好，并且教授真的有你，并帮助你获得实习和工作伟大的大学，它来这里工作很好，并且教授真的有你，并帮助你获得实习和工作.</div>
            <div style={{color: '#a6a6a2',marginTop:10}}>
              <Row>
                <Col span={6}>课程类别：{course_category_name}</Col>
                <Col span={6}>课程编号：{course_code}</Col>
                <Col span={6}>课程名：{course_name}</Col>
                <Col span={6}>是否出勤：{is_attend}</Col>
                <Col span={6}>课程难度：{difficult_level}</Col>
                <Col span={6}>笔头作业量：{homework_num}</Col>
                <Col span={6}>每月考试数：{quiz_num}</Col>
                <Col span={6}>课程与考试内容相关度：{course_related_quiz}</Col>
                <Col span={6}>每周课堂外所花总时间：{spend_course_time_at_week}</Col>
                <Col span={6}>你的成绩：{grade}</Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const {
      url
    } = this.props;

    const {
      ratesInfo,
      student
    } = this.state;

    return (
      <ALayout title='个人主页' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            <Card className={style.wrap}>
              <Row>
                <Col span={12}>
                  <Row>
                    <Col span={4}><Avatar size="large" icon="user" /></Col>
                    <Col span={20}>
                      <Row>
                        <Col>
                          {
                            student &&
                            <span style={{fontSize:32}}>{student.name}</span>
                          }
                        </Col>
                      </Row>
                      <Row type="flex" justify="start">
                        <Col span={5} style={{fontWeight:800}}>大学</Col>
                        <Col span={7}>复旦大学</Col>
                        <Col span={5} style={{fontWeight:800}}>高中</Col>
                        <Col span={7}>杨浦高级中学</Col>
                      </Row>
                      <Row type="flex" justify="space-between">
                        <Col span={5} style={{fontWeight:800}}>专业</Col>
                        <Col span={7}>心理学</Col>
                        <Col span={5} style={{fontWeight:800}}>毕业年份</Col>
                        <Col span={7}>2015</Col>
                      </Row>
                      <Row type="flex" justify="space-between">
                        <Col span={5} style={{fontWeight:800}}>高考地</Col>
                        <Col span={7}>上海</Col>
                        <Col span={5}></Col>
                        <Col span={7}></Col>
                      </Row>
                      <Row type="flex" justify="space-between">
                        <Col span={5} style={{fontWeight:800}}>毕业年份</Col>
                        <Col span={7}>2019</Col>
                        <Col span={5}></Col>
                        <Col span={7}></Col>
                      </Row>
                      <Row>
                        <Col span={16} style={{marginTop:20}}>
                          <Button type="primary">编辑个人资料</Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>

            <Card className={cla(style.wrap) }>
              <div>我的评论</div>
              {
                ratesInfo &&
                Object.keys(ratesInfo).map(key => {
                  if (ratesInfo[key].rate_type == 'school') {
                    return this.renderSchoolRate(ratesInfo[key], key);
                  }

                  if (ratesInfo[key].rate_type == 'professor') {
                    return this.renderProfessorRate(ratesInfo[key], key);
                  }
                })
              }
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default User;