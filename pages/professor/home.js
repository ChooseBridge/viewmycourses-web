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
import client from '../../common/client';
import api from '../../common/api';
import style from '../../common/style/home.css';
import commonStyle from '../../common/style/index.css';
import Share from '../../components/share';

const {
  Content
} = Layout;

const Option = Select.Option;

class Professor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      professor: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.thumbsProfessor = this.thumbsProfessor.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.getProfessorDetail();
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

  getStudent() {
    client(api.getStudent)({}).then(res => {
      console.log(res);
    });
  }

  handleChange(e) {
    console.log(e);
  }

  thumbsProfessor() {
    client(api.thumbsUpProfessor)({
      query: {
        professor_id: this.props.url.query.id
      }
    }).then(res => {
      console.log(res);
      this.getProfessorDetail();
    });
  }

  render() {
    const {
      url
    } = this.props;

    const {
      professor
    } = this.state;

    const {
      professorInfo,
      rateInfo,
      coursesInfo,
      schoolCategoryInfo,
      tagsInfo,
    } = professor;

    return (
      <ALayout title='教授主页' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            <Card className={style.wrap}>
            {
              professorInfo &&
              <Row style={{position:'relative'}}>
                <Col span={12}>
                  <Row>
                    <Col span={4}><Avatar size="large" icon="user" /></Col>
                      <Col span={20}>
                        <Row>
                          <Col span={16}>
                            <span style={{fontSize:32,marginRight:6}}>
                              {professorInfo.professor_full_name}
                            </span>
                            {
                              professorInfo.is_thumbs_up ?
                              <Icon
                                onClick={this.thumbsProfessor}
                                type="heart"
                                style={{color:'red'}}/>
                              :
                              <Icon
                                onClick={this.thumbsProfessor}
                                type="heart-o" />
                            }
                            <span style={{marginLeft:5}}>{professorInfo.thumbs_up_num}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={16}>{professorInfo.country}{professorInfo.province} {professorInfo.school}</Col>
                        </Row>
                        <Row>
                          <Col span={16}>心理学教授</Col>
                        </Row>
                        <Row>
                          <Col span={16} className={commonStyle.colorBlue} style={{marginBottom:20}}>提交修正</Col>
                        </Row>
                        <Row>
                          <Col span={9}><Button type="primary">点评它的课程</Button></Col>
                          <Col span={7}>
                            <Button type="primary" style={{backgroundColor:'#737373',border:'none'}}>分享</Button>
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

            <Card className={cla(style.wrap) }>
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
                  <div style={{marginBottom: 10}}>看看其他同学对这位教授的评分情况</div>
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

            <Card className={style.wrap}>
              <Row className={style.rowWrap}>
                {
                  rateInfo &&
                  <Col span={12} className={style.textWrap}>{rateInfo.length}位同学的点评</Col>
                }
                <Col span={12} className={commonStyle.textRight}>
                  <Select
                    placeholder="按课程筛选"
                    style={{ width: 200 }}
                    onChange={this.handleChange}>
                    {
                      coursesInfo &&
                      coursesInfo.map(item =>
                        <Option
                          key={item.course_id}
                          value={item.course_id}>{item.course_code}
                        </Option>
                      )
                    }
                  </Select>
                </Col>
              </Row>

              {
                rateInfo &&
                rateInfo.map((item, index) =>
                  <Row
                    key={index}
                    type="flex"
                    className={style.rowWrap}>
                    <Card.Grid style={{width:'20%',position:'relative'}}>
                      <Col className={cla(commonStyle.textCenter, commonStyle.verticalHorizontalCenter)}>
                        <div>努力指数</div>
                        <div className={style.points}>{item.effort}</div>
                      </Col>
                    </Card.Grid>

                    <Card.Grid style={{width:'80%'}}>
                      <Col className={style.rateWrap}>
                        <Row>
                          <Col span={6}>{item.course_code}</Col>
                          <Col span={18}>
                            {
                              item.tag.split(',').map(tag =>
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
                        <Row>
                          <Col span={6}>是否记录出勤：{item.is_attend == 1 ? '是' : '否'}</Col>
                          <Col span={18}>
                            {item.comment}
                            <div className={style.likeWrap}>
                              <span style={{marginRight: 6}}>
                                <Icon type="like-o" style={{color:'red'}}/>98% 的人认为有用
                              </span>
                              <Icon type="dislike-o" />2% 的人认为没用
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Card.Grid>
                  </Row>
                )
              }
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Professor;