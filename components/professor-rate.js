import React, { Component } from 'react';
import { Row, Col, Icon, Tag } from 'antd';
import style from './style.css';
import cln from 'classnames';

export default class extends Component {
  render() {
    const { dark, rate } = this.props;
    console.log(this.props.rate);

    return (
      <div className={cln(style.wrap, { [style.dark]: dark })}>
        <Row gutter={0} type="flex">
          <Col span={5} className={style.left}>
            <div className={style.date}>2018/03</div>
            <div className={style.rate}>
              <div>努力指数</div>
              <div className={style.score}>
                {rate.effort >= 4 && <Icon type="smile" className={style.good} />}
                {(rate.effort >= 2.5 && rate.effort < 4) && <Icon type="meh" className={style.normal} />}
                {rate.effort < 2.5 && <Icon type="frown" className={style.bad} />}

                {rate.effort}
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={style.class}><Icon type="book" className={style.iconClass} /> {rate.course_code}</div>
            <div className={style.items}>
              <div><strong className={style.label}>是否记出勤:</strong> {rate.is_attend === 1 ? '是' : '否'}</div>
              <div><strong>课程难度:</strong> {rate.difficult_level}</div>
              <div><strong>笔头作业量:</strong> {rate.homework_num}</div>
              <br />
              <div><strong>每月考试数:</strong> {rate.quiz_num}</div>
              <div><strong>课程与考试内容相关度:</strong> {rate.course_related_quiz}</div>
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
              <a href="" className={style.like}><Icon type="like-o" />98% 的人认为有用</a>
              <a href="" className={style.unlike}><Icon type="dislike-o" />2% 的人认为没用</a>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}