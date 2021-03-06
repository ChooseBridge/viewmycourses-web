import React from 'react';
import {
  Popover,
  Row,
  Col,
} from 'antd';
import cla from 'classnames';
import client from '../../common/client';
import api from '../../common/api';
import style from './style.css';

class InfoPopover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    client(api.getStudentById)({
      query: {
        student_id: this.props.id,
      }
    }).then(res => {
      this.setState({
        student: res.student
      });
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({
      visible
    });
  }

  getGraduateLabel = is_graduate => is_graduate ? '毕业年份' : '预计毕业年份'

  render() {
    const {
      children,
      id,
      placement,
    } = this.props;

    const {
      visible,
      student,
    } = this.state;

    const content = (
      student &&
        <div>
        {
          student.education_status == 1 ?
          <Row type="flex">
            <Col className={cla(style.wrap, style.title)}>
              <div>大学</div>
              <div>专业</div>
              <div>
                {
                  student.school_status == '国内' ?
                  '高考地'
                  :
                  '高中所在省份/联邦州'
                }
              </div>
              <div>{this.getGraduateLabel(student.is_graduate)}</div>
            </Col>

            <Col className={style.wrap}>
              <div>{student.school_name}</div>
              <div>{student.major}</div>
              <div>{student.exam_province}</div>
              <div>
                {student.graduate_year}
              </div>
            </Col>
          </Row>
          :
          <Row type="flex">
            <Col className={cla(style.wrap, style.title)}>
              <div>高中</div>
              <div>{this.getGraduateLabel(student.is_graduate)}</div>
            </Col>

            <Col className={style.wrap}>
              <div>{student.school_name}</div>
              <div>
                {student.graduate_year}
              </div>
            </Col>
          </Row>
        }
      </div>
    );

    return (
      <Popover
        key={id}
        content={content}
        placement={placement}
        // title={student && student.name}
        // trigger="click"
        visible={visible}
        onVisibleChange={this.handleVisibleChange}>
        {children}
      </Popover>
    );
  }
}

export default InfoPopover;