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

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      schoolChoose: 'name'
    };
  }

  componentDidMount() {

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const result = {};
        if (values.region) {
          values.region.forEach((id, i) => {
            if (i === 0) {
              result['country_id'] = id;
            }
            else if (i === 1) {
              result['province_id'] = id;
            }
            else {
              result['city_id'] = id;
            }
          });
        }

        if (values.name) {
          result['school_name'] = name;
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
      schoolChoose
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
              <h2>查找你的学校</h2>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              span={12}
              offset={6}>
              <RadioGroup onChange={this.onRadioChangeHandler} value={schoolChoose}>
                <RadioButton value="name">按名称</RadioButton>
                <RadioButton value="region">按区域</RadioButton>
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
                    <AutoComplete
                      style={{ width: 200, height: 32 }}
                      placeholder="学校名称" />
                  )}
                </Col>
              </Row>
              : <Row className={style.row}>
                <Col
                  className={cla(commonStyle.textCenter)}
                  span={12}
                  offset={6}>

                  {getFieldDecorator('region', {})(
                    <RegionCascader style={{ width: 200 }} />
                  )}

                </Col>
              </Row>
          }

          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              span={12}
              offset={6}>
              <Button style={{ width: 200 }} htmlType="submit" type="primary">搜索</Button>
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