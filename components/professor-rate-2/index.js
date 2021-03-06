import React, { Component } from 'react';
import { Row, Col, Icon, Tag } from 'antd';
import style from './style.css';
import cln from 'classnames';
import client from '../../common/client';
import api from '../../common/api';
import InfoPopover from '../info-popover';

function homeWorkPipe(num) {
  const m = '很少，较少，适中，较多，很多'.split('，');
  return m[num];
}

export default class extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onThumbsUp = () => {
    this.props.onThumbsUp(() => this.setState({
      thumbsUp: true
    }));
  }


  onThumbsDown = () => {
    this.props.onThumbsDown(() => this.setState({
      thumbsDown: true
    }));
  }

  difficultFilter = level => {
    const names = {
      1: '容易',
      2: '较易',
      3: '中等',
      4: '较难',
      5: '很难'
    };
    return names[level];
  }

  render() {
    const { dark, rate } = this.props;
    const { thumbsUp, thumbsDown } = this.state;
    const [year, month] = rate.created_at.date.split('-');

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
                    <Row gutter={0} type="flex">
                      <Col span={5} className={style.left}>
                        <div className={style.date}>{`${year}-${month}`}</div>
                        <div className={style.rate}>
                          <div>努力指数</div>
                          <div className={style.score}>
                            {/*{rate.effort >= 4 && <Icon type="smile" className={style.good} />}*/}
                            {/*{(rate.effort >= 2.5 && rate.effort < 4) && <Icon type="meh" className={style.normal} />}*/}
                            {/*{rate.effort < 2.5 && <Icon type="frown" className={style.bad} />}*/}

                            <span style={{ marginLeft: 5 }}>{rate.effort}</span>
                          </div>
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className={style.class}><Icon type="book" className={style.iconClass} /> {rate.course_code}
                        </div>
                        <div className={style.items}>
                          <div><strong>课程类别:</strong> {rate.course_category_name}</div>
                          <div><strong>课程名:</strong><br />{rate.course_name}</div>
                          <div><strong className={style.label}>是否记出勤:</strong> {rate.is_attend === 1 ? '是' : '否'}</div>
                          <div><strong>课程难度:</strong> {this.difficultFilter(rate.difficult_level)}</div>
                          <div><strong>书面作业量:</strong> {homeWorkPipe(rate.homework_num - 1)}</div>
                          {/*<div><strong>每月考试数:</strong> {rate.quiz_num}</div>*/}
                          <div><strong>我的成绩:</strong> {rate.grade}</div>
                        </div>
                      </Col>
                      <Col className={style.right} span={13}>
                        <div className={style.tags}>
                          {
                            rate.tag.split(',').map(t => <Tag key={t} className={style.tag}>{t}</Tag>)
                          }
                        </div>

                        <div className={style.comment}>
                          {rate.comment}
                        </div>

                        <div>
                          <span onClick={this.onThumbsUp}>
                            <a className={style.like}>
                              <Icon type="like-o" style={rate.is_thumbs_up ? { color: 'red' } : { color: '#000' }} />
                              {rate.thumbs_up_percent}%
                            </a>
                          </span>
                          <span onClick={this.onThumbsDown}>
                            <a className={style.unlike}>
                              <Icon type="dislike-o"
                                    style={rate.is_thumbs_down ? { color: 'red' } : { color: '#000' }} />
                              {rate.thumbs_down_percent}%
                            </a>
                          </span>
                        </div>
                      </Col>
                    </Row>
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