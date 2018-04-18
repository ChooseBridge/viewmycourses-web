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
import SchoolAutoComplete from '../../components/school-auto-complete';
import api from '../../common/api';
import client from '../../common/client';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
let cache = [];

class Search extends Component {
  constructor() {
    super();

    this.state = {
      rateChoose: 'professor',
      schools: cache
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
      this.setState({ show: true });
    }, 0);
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
    this.setState({ rateChoose: e.target.value });
  };

  close = () => {
    this.setState({ show: false });
    setTimeout(() => this.props.closeAll(), 300);
  };

  render() {
    const {
      rateChoose
    } = this.state;
    const { closeAll, small } = this.props;
    const { getFieldDecorator } = this.props.form;
    const grid = { md: { span: 12 }, sm: { span: 24, offset: 0 } };

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className={style.mask} onClick={this.close} />
        <div className={cla(style.menuWrap, {
          [style.show]: this.state.show,
          [style.menuWrapSmall]: small
        })}>
          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              {...grid}>
              <RadioGroup size="large" onChange={this.onRadioChangeHandler} value={rateChoose}>
                <RadioButton value="professor">教授</RadioButton>
                <RadioButton value="school">学校</RadioButton>
              </RadioGroup>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              {...grid}>
              <div>我要点评</div>
            </Col>
          </Row>

          {
            rateChoose === 'professor' ? <Row className={style.row}>
                <Col
                  className={cla(commonStyle.textCenter)}
                  {...grid}>

                  {getFieldDecorator('professor_name', {})(
                    <AutoComplete
                      size="large"
                      style={{ width: 300 }}
                      placeholder="教授名字" />
                  )}

                  {getFieldDecorator('mode', { initialValue: 'professor' })(
                    <input type="hidden" />
                  )}
                </Col>
              </Row>
              : <Row className={style.row}>
                <Col
                  className={cla(commonStyle.textCenter)}
                  {...grid}>
                  {getFieldDecorator('school_name', {})(
                    <SchoolAutoComplete
                      size="large"
                      style={{ width: 300 }}
                      placeholder="学校名称"
                      valueUseName
                      dataSource={this.state.schools}
                      onSelect={v => location.href = `/school/${v.name}/rate`} />
                  )}
                  {getFieldDecorator('mode', { initialValue: 'school' })(
                    <input type="hidden" />
                  )}
                </Col>
              </Row>
          }

          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              {...grid}>
              <Button size="large" style={{ width: 300 }} type="primary" htmlType="submit">搜索</Button>
            </Col>
          </Row>

          {/*<Row className={style.row}>*/}
          {/*<Col*/}
          {/*className={cla(commonStyle.textCenter)}*/}
          {/*span={12}*/}
          {/*offset={6}>*/}
          {/*<a href="javascript:;" onClick={() => {*/}
          {/*this.setState({show: false});*/}
          {/*setTimeout(() => this.props.closeAll(), 300);*/}
          {/*}}>关闭</a>*/}
          {/*</Col>*/}
          {/*</Row>*/}
        </div>
      </Form>
    );
  }
}

export default Form.create()(Search);