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

  }

  render() {
    const {
      url
    } = this.props;

    return (
      <ALayout title='个人主页' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={style.bgWrap}>
            <Card className={style.wrap}>
              <Row>
                <Col span={12}>
                  <Row>
                    <Col span={4}><Avatar size="large" icon="user" /></Col>
                    <Col span={20}>
                      <Row>
                        <Col>
                          <span style={{fontSize:32}}>刘强东</span>
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

              <div>
                <div className={style.schoolName}>
                  <span className={commonStyle.colorBlue}>复旦大学</span> 邯郸路校区
                </div>
                <Row type="flex" justify="start" align="middle">
                  <Col span={3} className={commonStyle.textCenter}>
                    <div>综合得分</div>
                    <div className={style.schoolPoints}>4.5</div>
                  </Col>
                  <Col span={21}>
                    <div>伟大的大学，它来这里工作很好，并且教授真的有你，并帮助你获得实习和工作伟大的大学，它来这里工作很好，并且教授真的有你，并帮助你获得实习和工作伟大的大学，它来这里工作很好，并且教授真的有你，并帮助你获得实习和工作.</div>
                    <div style={{color: '#a6a6a2',marginTop:10}}>
                      <Row>
                        <Col span={4}>社会声誉：4</Col>
                        <Col span={5}>社会声誉：4</Col>
                        <Col span={5}>社会声誉：4</Col>
                        <Col span={5}>社会声誉：4</Col>
                        <Col span={5}>社会声誉：4</Col>
                      </Row>
                      <Row>
                        <Col span={4}>校园地理位置：4</Col>
                        <Col span={5}>校园课外活动：4</Col>
                        <Col span={5}>校园基础设施：4</Col>
                        <Col span={5}>生活幸福指数：4</Col>
                        <Col span={5}>校方与学生群体关系：4</Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>

              <div>
                <div className={style.schoolName}>
                  <span className={commonStyle.colorBlue}>复旦大学</span> 邯郸路校区
                </div>
                <Row type="flex" justify="start" align="middle">
                  <Col span={3} className={commonStyle.textCenter}>
                    <div>努力指数</div>
                    <div className={style.schoolPoints}>4.5</div>
                  </Col>
                  <Col span={21}>
                    <div>
                      <Row>
                        <Col>
                          <Tag color="#ddd" className={style.tag}>爱心（2）</Tag>
                          <Tag color="#ddd" className={style.tag}>责任心（2）</Tag>
                          <Tag color="#ddd" className={style.tag}>上课好（3）</Tag>
                          <Tag color="#ddd" className={style.tag}>厉害（2）</Tag>
                          <Tag color="#ddd" className={style.tag}>有趣（5）</Tag>
                          <Tag color="#ddd" className={style.tag}>幽默（2）</Tag>
                          <Tag color="#ddd" className={style.tag}>提供教材（7）</Tag>
                          <Tag color="#ddd" className={style.tag}>风趣（1）</Tag>
                          <Tag color="#ddd" className={style.tag}>内容详细（2）</Tag>
                          <Tag color="#ddd" className={style.tag}>不做作（9）</Tag>
                          <Tag color="#ddd" className={style.tag}>上进心（12）</Tag>
                        </Col>
                      </Row>
                    </div>
                    <div>伟大的大学，它来这里工作很好，并且教授真的有你，并帮助你获得实习和工作伟大的大学，它来这里工作很好，并且教授真的有你，并帮助你获得实习和工作伟大的大学，它来这里工作很好，并且教授真的有你，并帮助你获得实习和工作.</div>
                    <div style={{color: '#a6a6a2',marginTop:10}}>
                      <Row>
                        <Col span={4}>社会声誉：4</Col>
                        <Col span={5}>社会声誉：4</Col>
                        <Col span={5}>社会声誉：4</Col>
                        <Col span={5}>社会声誉：4</Col>
                        <Col span={5}>社会声誉：4</Col>
                      </Row>
                      <Row>
                        <Col span={4}>校园地理位置：4</Col>
                        <Col span={5}>校园课外活动：4</Col>
                        <Col span={5}>校园基础设施：4</Col>
                        <Col span={5}>生活幸福指数：4</Col>
                        <Col span={5}>校方与学生群体关系：4</Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>

            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default User;