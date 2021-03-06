import React, { Component } from 'react';
import { Row, Col, Icon, Tag } from 'antd';
import style from './style.css';
import cln from 'classnames';

const Score = ({ score }) => (
  <span className={cln({
    [style.good]: score >= 4,
    [style.normal]: score >= 2.5 && score < 4,
    [style.bad]: score < 2.5
  })}>{score}</span>
);

export default class extends Component {
  render() {
    const { dark, rate, onThumbsUp, onThumbsDown} = this.props;

    return (
      <div className={cln(style.wrap, { [style.dark]: dark })}>
        <Row gutter={0} type="flex">
          <Col span={5} className={style.left}>
            <div className={style.date}>{rate.created_at.date}</div>
            <div className={style.rate}>
              <div>综合得分</div>
              <div className={style.score}>
                {rate.score >= 4 && <Icon type="smile" className={style.good} />}
                {(rate.score >= 2.5 && rate.score < 4) && <Icon type="meh" className={style.normal} />}
                {rate.score < 2.5 && <Icon type="frown" className={style.bad} />}

                <span style={{marginLeft: 5}}>{rate.score}</span>
              </div>
              <div>
                <div>{rate.major}专业</div>
                <div>{rate.school_district_name}</div>
              </div>
            </div>
          </Col>
          <Col className={style.center} span={10}>
            <div className={style.comment}>
              {rate.comment}
            </div>

            <div>
              <span onClick={onThumbsUp}>
                <a className={style.like}>
                  <Icon
                    type="like-o"
                    style={rate.is_thumbs_up ? {color: 'red'} : {color: '#000'}}/>
                  {rate.thumbs_up_percent}% 的人认为有用
                </a>
              </span>
              <span onClick={onThumbsDown}>
                <a className={style.unlike}>
                  <Icon
                    type="dislike-o"
                    style={rate.is_thumbs_down ? {color: 'red'} : {color: '#000'}}/>
                  {rate.thumbs_down_percent}% 的人认为没用
                </a>
              </span>
            </div>
          </Col>

          <Col span={9} className={style.right}>
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
                  <div className={style.detailScore}>校园课外活动：<Score score={rate.extracurricular_activities} /></div>
                  <div className={style.detailScore}>校园基础设施：<Score score={rate.campus_infrastructure} /></div>
                  <div className={style.detailScore}>生活幸福指数：<Score score={rate.life_happiness_index} /></div>
                  <div className={style.detailScore}>校方与学生群体关系：<Score score={rate.school_students_relations} /></div>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}