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
  Card
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
        data: res
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
      school_students_relations
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
            <div style={{ color: '#a6a6a2', marginTop: 10 }}>
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
      written_homework_num,
      quiz_num,
      course_related_quiz,
      spend_course_time_at_week,
      grade,
      tag,
      comment
    } = item;

    const changeDifficultLevel = (difficult_level) => {
      switch (difficult_level) {
        case '1':
          return '容易';
        case '2':
          return '较易';
        case '3':
          return '中等';
        case '4':
          return '较难';
        case '5':
          return '困难';
      }
    };

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
            <div>
              {comment}
            </div>
            <div style={{ color: '#a6a6a2', marginTop: 10 }}>
              <Row>
                <Col span={6}>课程类别：{course_category_name}</Col>
                <Col span={6}>课程编号：{course_code}</Col>
                <Col span={6}>课程名：{course_name}</Col>
                <Col span={6}>是否出勤：{is_attend}</Col>
                <Col span={6}>课程难度：{changeDifficultLevel(difficult_level)}</Col>
                <Col span={6}>书面作业量：{homework_num}</Col>
                {/*<Col span={6}>书面作业量：{written_homework_num}</Col>*/}
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
      student,
      data
    } = this.state;

    let vipLeftDay = 0;

    if (data && data.isVip) {
      vipLeftDay = Math.round(((new Date(data.vipExpireTime)) - (new Date())) / 86400000);
    }

    return (
      <ALayout title='个人主页' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            <Card className={style.wrap}>
              <Row>
                <Col span={12}>
                  <Row>
                    {
                      student &&
                      <Col span={20}>
                        <Row type="flex" align="middle">
                          <Col span={4}><Avatar size="large" icon="user" /></Col>
                          <Col>
                            <span style={{ fontSize: 32 }}>{student.name}</span>
                          </Col>
                        </Row>
                        {
                          student.education_status == 1 ?
                          <Row type="flex">
                            <Col span={4}></Col>
                            <Col span={17} style={{ marginRight: 6 }}>
                              <div><span style={{fontWeight: 800, marginRight: 10}}>大学</span> {student.school_name || 'N/A'}</div>
                              <div><span style={{fontWeight: 800, marginRight: 10}}>专业</span> {student.major || 'N/A'}</div>
                              <div>
                                <span style={{fontWeight: 800, marginRight: 10}}>{
                                  student.school_status == '国内' ?
                                  '高考地'
                                  :
                                  '高中所在省份/联邦州'
                                }</span>
                                {student.exam_province || 'N/A'}
                              </div>
                              <div>
                                <span style={{fontWeight: 800, marginRight: 10}}>毕业年份</span>
                                {
                                  student.is_graduate == 0 ?
                                  '在读'
                                  :
                                  (student.graduate_year || 'N/A')
                                }
                              </div>
                            </Col>
                          </Row>
                          :
                          <Row type="flex">
                            <Col span={4}></Col>
                            <Col style={{ fontWeight: 800, marginRight: 6 }}>
                              <div>高中</div>
                              <div>毕业年份</div>
                            </Col>

                            <Col>
                              <div>{student.school_name || 'N/A'}</div>
                              <div>
                                {
                                  student.is_graduate == 0 ?
                                  '在读'
                                  :
                                  (student.graduate_year || 'N/A')
                                }
                              </div>
                            </Col>
                          </Row>
                        }
                        <Row>
                          <Col span={4}></Col>
                          <Col span={20} style={{ marginTop: 20 }}>
                            {student &&
                            <a target="_blank" href={`https://i.choosebridge.com/profile/${student.name}/edit`}><Button type="primary">编辑个人资料</Button></a>}
                          </Col>
                        </Row>
                      </Col>
                    }
                  </Row>
                </Col>
                <Col span={12}>
                  {
                    data &&
                    <div style={{ paddingTop: 48 }}>
                      <Row>
                        <Col span={12} style={{textAlign: 'center'}}>
                          <div>您当前的 RP 值</div>
                          <div style={{fontSize:40, color: '#8bc34a', margin: 10}}>{data.points}</div>
                        </Col>
                        <Col span={12} style={{textAlign: 'center'}}>
                          <div>您的高校学生社群特权</div>
                          <div style={{ margin: 10}}>剩余 <span style={{fontSize:40, color: vipLeftDay < 30 ? '#e91e1e' : '#8bc34a'}}>{vipLeftDay}</span> 天</div>
                        </Col>
                      </Row>

                      <div style={{textAlign:'center'}}>
                        {
                          student.is_email_edu === 0 ? <div>
                            已经是大学生了？使用你的
                            <a href="https://i.choosebridge.com/account" target="_blank">高校邮箱绑定</a>
                            即可享受高校学生社群特权！
                          </div> : <div>
                            特权就快到期了？快去<span style={{color:"#1890ff"}}>撰写点评</span>或
                            <a href="https://i.choosebridge.com/invite" target="_blank">邀请好友</a>
                            提升你的RP值来<a href="https://i.choosebridge.com/redeem" target="_blank">兑换特权</a>吧！
                          </div>
                        }
                      </div>
                    </div>
                  }
                </Col>
              </Row>
            </Card>

            <Card className={cla(style.wrap)}>
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