import React from 'react';
import {
  Popover,
  Row,
  Col,
} from 'antd';
import cla from 'classnames';
import client from '../../common/client';
import api from '../../common/api';

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
          <div>
            <Row>
              <Col span={12} style={{ fontWeight: 800 }}>大学</Col>
              <Col span={12}>{student.school_name}</Col>
            </Row>
            <Row>
              <Col span={12} style={{ fontWeight: 800 }}>专业</Col>
              <Col span={12}>{student.major}</Col>
            </Row>
            <Row>
              <Col span={12} style={{ fontWeight: 800 }}>高考地</Col>
              <Col span={12}>{student.exam_province}</Col>
            </Row>
            <Row>
              <Col span={12} style={{ fontWeight: 800 }}>毕业年份</Col>
              <Col span={12}>
                {
                  student.is_graduate == 0 ?
                  '在读'
                  :
                  student.graduate_year
                }
              </Col>
            </Row>
          </div>
          :
          <div>
            <Row>
              <Col span={12} style={{ fontWeight: 800 }}>高中</Col>
              <Col span={12}>{student.school_name}</Col>
            </Row>
            <Row>
              <Col span={12} style={{ fontWeight: 800 }}>毕业年份</Col>
              <Col span={12}>
                {
                  student.is_graduate == 0 ?
                  '在读'
                  :
                  student.graduate_year
                }
              </Col>
            </Row>
          </div>
        }
      </div>
    );

    return (
      <Popover
        key={id}
        content={content}
        placement={placement}
        title={student && student.name}
        trigger="click"
        visible={visible}
        onVisibleChange={this.handleVisibleChange}>
        {children}
      </Popover>
    );
  }
}

export default InfoPopover;