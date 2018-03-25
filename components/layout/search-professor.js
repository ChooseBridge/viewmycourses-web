import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  AutoComplete,
  Radio,
  Select
} from 'antd';
import commonStyle from '../../common/style/index.css';
import style from './style.css';
import cla from 'classnames';
import api from '../../common/api';
import client from '../../common/client';
import SchoolAutoComplete from '../../components/school-auto-complete';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let cache = [];

class Search extends Component {
  constructor() {
    super();

    this.state = {
      professorChoose: 'proName',
      schools: cache,
      college: []
    };
  }

  componentDidMount() {
    if (cache.length === 0) {
      client(api.getSchoolGroupByCountry)()
        .then(res => {
          cache = res;
          this.setState({
            schools: res
          });
        });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  onRadioChangeHandler = e => {
    this.setState({ professorChoose: e.target.value });
  };

  schoolChangeHandler = id => {
    client(api.getCollegeBySchool)({
      body: {
        school_id: id
      }
    }).then(college => {
      this.setState({
        college
      });
    });
  };

  render() {
    const {
      professorChoose
    } = this.state;
    const { closeAll } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className={style.menuWrap}>
          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              span={12}
              offset={6}>
              <RadioGroup size="large" onChange={this.onRadioChangeHandler} value={professorChoose}>
                <RadioButton value="proName">按名称</RadioButton>
                <RadioButton value="school">按学校</RadioButton>
              </RadioGroup>
            </Col>
          </Row>

          {
            professorChoose === 'proName' ? <div>
                <Row className={style.row}>
                  <Col
                    className={cla(commonStyle.textCenter)}
                    span={12}
                    offset={6}>
                    <div>我正在寻找的教授就任于</div>
                  </Col>
                </Row>

                <Row className={style.row}>
                  <Col
                    className={cla(commonStyle.textCenter)}
                    span={12}
                    offset={6}>
                    {getFieldDecorator('school_name', {})(
                      <SchoolAutoComplete
                        size="large"
                        style={{ width: 300 }}
                        placeholder="学校名称"
                        valueUseName
                        dataSource={this.state.schools} />
                    )}
                  </Col>
                </Row>

                <Row className={style.row}>
                  <Col
                    className={cla(commonStyle.textCenter)}
                    span={12}
                    offset={6}>
                    <div>名为</div>
                  </Col>
                </Row>

                <Row className={style.row}>
                  <Col
                    className={cla(commonStyle.textCenter)}
                    span={12}
                    offset={6}>

                    {getFieldDecorator('professor_name', {})(
                      <AutoComplete
                        size="large"
                        style={{ width: 300 }}
                        placeholder="教授名字" />
                    )}
                  </Col>
                </Row>
              </div>
              : <div>
                <Row className={style.row}>
                  <Col
                    className={cla(commonStyle.textCenter)}
                    span={12}
                    offset={6}>
                    我正在寻找的教授就任于

                    {getFieldDecorator('school_name', {})(
                      <SchoolAutoComplete
                        size="large"
                        style={{ width: 300 }}
                        placeholder="学校名称"
                        valueUseName
                        onSelect={({ value }) => this.schoolChangeHandler(value)}
                        dataSource={this.state.schools} />
                    )}
                    大学
                  </Col>
                </Row>

                <Row className={style.row}>
                  <Col
                    className={cla(commonStyle.textCenter)}
                    span={12}
                    offset={6}>
                    <Select
                      size="large"
                      placeholder="选择学院"
                      style={{ width: 300, paddingLeft: 4, paddingRight: 4 }}>

                      {
                        this.state.college.map(clg => (
                            <Option
                              key={clg.college_id}
                              value={clg.college_id}>
                              {clg.college_name}
                            </Option>
                          )
                        )
                      }
                    </Select>
                    学院
                  </Col>
                </Row>
              </div>
          }

          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              span={12}
              offset={6}>


              {getFieldDecorator('mode', { initialValue: 'professor' })(
                <input type="hidden" />
              )}
              <Button size="large" style={{ width: 300 }} htmlType="submit" type="primary">搜索</Button>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              span={12}
              offset={6}>
              <a href="javascript:;" onClick={closeAll}>关闭</a>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default Form.create()(Search);