import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  AutoComplete,
  Radio
} from 'antd';
import commonStyle from '../../common/style/index.css';
import style from './style.css';
import cla from 'classnames';
import RegionCascader from '../../components/region-cascader';
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
      schoolChoose: 'name'
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

    setTimeout(() => {
      this.setState({show: true})
    }, 0);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const result = {
          mode: 'school'
        };
        if (values.region) {
          values.region.forEach((id, i) => {
            if (i === 0) {
              result['country_id'] = encodeURIComponent(id);
            }
            else if (i === 1) {
              result['province_id'] = encodeURIComponent(id);
            }
            else {
              result['city_id'] = encodeURIComponent(id);
            }
          });
        }

        if (values.name) {
          // result['school_name'] = encodeURIComponent(values.name);
          result['school_name'] = values.name;
        }
        this.props.onSubmit(result);
      }
    });
  };

  onRadioChangeHandler = e => {
    this.setState({ schoolChoose: e.target.value });
  };

  render() {
    const {
      schoolChoose,
      schools
    } = this.state;
    const { closeAll } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className={cla(style.menuWrap, {[style.show]: this.state.show})}>
          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              span={12}
              offset={6}>
              <RadioGroup size="large" onChange={this.onRadioChangeHandler} value={schoolChoose}>
                <RadioButton value="name">按名称</RadioButton>
                <RadioButton value="region">按地区</RadioButton>
              </RadioGroup>
            </Col>
          </Row>

          {
            schoolChoose === 'name' ? <Row className={style.row}>
                <Col
                  className={cla(commonStyle.textCenter)}
                  span={12}
                  offset={6}>

                  {getFieldDecorator('name', {})(
                    <SchoolAutoComplete
                      size="large"
                      style={{ width: 300 }}
                      placeholder="学校名称"
                      valueUseName
                      dataSource={this.state.schools}
                      onSelect={v => location.href = `/school/${v.name}`} />
                  )}
                </Col>
              </Row>
              : <Row className={style.row}>
                <Col
                  className={cla(commonStyle.textCenter)}
                  span={12}
                  offset={6}>

                  {getFieldDecorator('region', {})(
                    <RegionCascader placeholder="请选择区域" size="large" style={{ width: 300 }} />
                  )}

                </Col>
              </Row>
          }

          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              span={12}
              offset={6}>
              <Button size="large" style={{ width: 300 }} htmlType="submit" type="primary">搜索</Button>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              span={12}
              offset={6}>
              <a href="javascript:;" onClick={() => {
                this.setState({show: false});
                setTimeout(() => this.props.closeAll(), 300);
              }}>关闭</a>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default Form.create()(Search);