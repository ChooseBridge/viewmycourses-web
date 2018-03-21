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
import Share from '../../components/share';

const {
  Content
} = Layout;

const Option = Select.Option;

class Professor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

  }

  handleChange(e) {
    console.log(e);
  }

  render() {
    const {
      url
    } = this.props;

    return (
      <ALayout title='教授主页' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            <Card className={style.wrap}>
              <Row style={{position:'relative'}}>
                <Col span={12}>
                  <Row>
                    <Col span={4}><Avatar size="large" icon="user" /></Col>
                    <Col span={20}>
                      <Row>
                        <Col span={16}>
                          <span style={{fontSize:32,marginRight:6}}>刘强东</span>
                          <Icon type="heart-o" />
                          <Icon type="heart" style={{color:'red'}}/>
                          132
                        </Col>
                      </Row>
                      <Row>
                        <Col span={16}>纽约新泽西州 圣约翰大学</Col>
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
            </Card>


            <Card className={cla(style.wrap) }>
              <Row>
                <Col span={4} className={cla(commonStyle.textCenter, style.pointWrap)}>
                  <div>平均努力指数</div>
                  <div className={style.points}>4.5</div>
                </Col>
                <Col span={20} className={style.classWrap}>
                  <h2>所教课程</h2>
                  <div>看看其他同学对这位教授的评分情况</div>
                  <Row>
                    <Col span={6}>4.5 <span className={commonStyle.colorBlue}>PCS0001</span></Col>
                    <Col span={6}>4.5 <span className={commonStyle.colorBlue}>PCS0001</span></Col>
                    <Col span={6}>4.5 <span className={commonStyle.colorBlue}>PCS0001</span></Col>
                    <Col span={6}>4.5 <span className={commonStyle.colorBlue}>PCS0001</span></Col>
                    <Col span={6}>4.5 <span className={commonStyle.colorBlue}>PCS0001</span></Col>
                    <Col span={6}>4.5 <span className={commonStyle.colorBlue}>PCS0001</span></Col>
                    <Col span={6}>4.5 <span className={commonStyle.colorBlue}>PCS0001</span></Col>
                    <Col span={6}>4.5 <span className={commonStyle.colorBlue}>PCS0001</span></Col>
                  </Row>
                </Col>
              </Row>
            </Card>

            <Card className={cla(style.wrap)}>
              <Row>
                <Col span={12} className={style.textWrap}>2位同学的点评</Col>
                <Col span={12} className={commonStyle.textRight}>
                  <Select
                    placeholder="按课程筛选"
                    style={{ width: 200 }}
                    onChange={this.handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Col>
              </Row>

              <Row className={cla(style.rowWrap)}>
                <Col span={4} className={cla(commonStyle.textCenter, style.pointWrap)}>
                  <div>努力指数</div>
                  <div className={style.points}>4.5</div>
                </Col>
                <Col span={20} className={style.rateWrap}>
                  <Row>
                    <Col span={6}>PYS100C</Col>
                    <Col span={18}>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>是否记录出勤：是</Col>
                    <Col span={18}>
                      人们说Hogan博士的课程比实际要容易得多。不要轻易接受A，记笔记，参加课堂并审阅他发布的幻灯片。他在每次考试前发表评论表，如果你知道他们的一切，你应该没问题。提前至少2天给自己学习。即使事实听起来没用，研究它们
                      <div className={style.likeWrap}>
                        <span style={{marginRight: 6}}>
                          <Icon type="like-o" style={{color:'red'}}/>98% 的人认为有用
                        </span>
                        <Icon type="dislike-o" />2% 的人认为没用
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className={cla(style.rowWrap)}>
                <Col span={4} className={cla(commonStyle.textCenter, style.pointWrap)}>
                  <div>努力指数</div>
                  <div className={style.points}>4.5</div>
                </Col>
                <Col span={20} className={style.rateWrap}>
                  <Row>
                    <Col span={6}>PYS100C</Col>
                    <Col span={18}>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                      <Tag color="#ddd" className={style.tag}>爱心</Tag>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>是否记录出勤：是</Col>
                    <Col span={18}>
                      人们说Hogan博士的课程比实际要容易得多。不要轻易接受A，记笔记，参加课堂并审阅他发布的幻灯片。他在每次考试前发表评论表，如果你知道他们的一切，你应该没问题。提前至少2天给自己学习。即使事实听起来没用，研究它们
                      <div className={style.likeWrap}>
                        <span style={{marginRight: 6}}>
                          <Icon type="like-o" style={{color:'red'}}/>98% 的人认为有用
                        </span>
                        <Icon type="dislike-o" />2% 的人认为没用
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Professor;