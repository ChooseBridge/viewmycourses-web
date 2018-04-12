import React, { Component } from 'react';
import { Row, Col, Icon, Tag } from 'antd';
import style from './style.css';
import cln from 'classnames';
import InfoPopover from '../info-popover';

const Score = ({ score }) => (
  <span className={cln({
    [style.good]: score >= 4,
    [style.normal]: score >= 2.5 && score < 4,
    [style.bad]: score < 2.5
  })}>{score}</span>
);

export default class extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onThumbsUp = () => {
    this.props.onThumbsUp(() => this.setState({ thumbsUp: true }));
  };

  onThumbsDown = () => {
    this.props.onThumbsDown(() => this.setState({ thumbsDown: true }));
  };

  render() {
    const { dark, rate } = this.props;
    const [year, month] = rate.created_at.split('-');
    const { thumbsUp, thumbsDown } = this.state;

    return (
      <Row className="rate">
        {
          dark ? false : <InfoPopover
            id={rate.create_student_id}
            placement="bottomLeft">
            <Col span={2} style={{ paddingTop: 11 }}>
              <img src="/img/user.png" />
            </Col>
          </InfoPopover>
        }
        <Col span={22}>
          <div className={cln(`ant-popover ant-popover-placement-${dark ? 'left' : 'right'}Top`, style.wrap)}>
            <div className="ant-popover-content">
              <div className="ant-popover-arrow" />
              <div className="ant-popover-inner">
                <div>
                  <div className="ant-popover-inner-content">
                    <div>
                      <Row gutter={0} type="flex">
                        <Col span={5} className={style.left}>
                          <div className={style.date}>{`${year}-${month}`}</div>
                          <div className={style.rate}>
                            <div>综合得分</div>
                            <div className={style.score}>
                              {rate.score >= 4 && <Icon type="smile" className={style.good} />}
                              {(rate.score >= 2.5 && rate.score < 4) && <Icon type="meh" className={style.normal} />}
                              {rate.score < 2.5 && <Icon type="frown" className={style.bad} />}

                              <span style={{ marginLeft: 5 }}>{rate.score}</span>
                            </div>
                            <div>
                              <div>{rate.major}专业</div>
                              <div>{rate.school_district_name}</div>
                            </div>
                          </div>
                        </Col>

                        <Col className={style.center} span={8}>
                          <div className={style.comment}>
                            {rate.comment}
                          </div>
                          <div>
                            <div>
                              <a className={style.like}
                              onClick={this.onThumbsUp}>
                                <Icon
                                  type="like-o"
                                  style={rate.is_thumbs_up ? {color: 'red'} : {color: '#000'}} />
                                {rate.thumbs_up_percent}%
                              </a>

                              <a className={style.unlike}
                              onClick={this.onThumbsDown}>
                                <Icon
                                  type="dislike-o"
                                  style={rate.is_thumbs_down ? { color: 'red' } : { color: '#000' }} />
                                {rate.thumbs_down_percent}%
                              </a>
                            </div>
                            {/*<div onClick={onThumbsDown}>*/}
                            {/*<a className={style.unlike}>*/}
                            {/*<Icon*/}
                            {/*type="dislike-o"*/}
                            {/*style={rate.is_thumbs_down ? { color: 'red' } : { color: '#000' }} />*/}
                            {/*{rate.thumbs_down_percent}% 没用*/}
                            {/*</a>*/}
                            {/*</div>*/}
                          </div>
                        </Col>

                        <Col span={11} className={style.right}>
                          <Col>
                            <Row>
                              <Col span={12}>
                                <div className={style.detailScore}>社会声誉：<Score score={rate.social_reputation} /></div>
                                <div className={style.detailScore}>学术水平：<Score score={rate.academic_level} /></div>
                                <div className={style.detailScore}>网络服务：<Score score={rate.network_services} /></div>
                                <div className={style.detailScore}>住宿条件：<Score score={rate.accommodation} /></div>
                                <div className={style.detailScore}>餐饮质量：<Score score={rate.food_quality} /></div>
                              </Col>
                              <Col span={12}>
                                <div className={style.detailScore}>校园地理位置：<Score score={rate.campus_location} /></div>
                                <div className={style.detailScore}>校园课外活动：<Score
                                  score={rate.extracurricular_activities} /></div>
                                <div className={style.detailScore}>校园基础设施：<Score score={rate.campus_infrastructure} />
                                </div>
                                <div className={style.detailScore}>生活幸福指数：<Score score={rate.life_happiness_index} />
                                </div>
                                <div className={style.detailScore}>校方与学生群体关系：<Score
                                  score={rate.school_students_relations} />
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        {
          dark ? <InfoPopover
            id={rate.create_student_id}
            placement="bottomRight">
            <Col span={2} style={{ paddingTop: 11, textAlign: 'right' }}>
              <img src="/img/user.png" />
            </Col>
          </InfoPopover> : false
        }
      </Row>
    );
  }
}