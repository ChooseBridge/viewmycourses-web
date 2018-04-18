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

  close = () => {
    this.setState({ show: false });
    setTimeout(() => this.props.closeAll(), 300);
  };

  render() {
    const {
      professorChoose
    } = this.state;
    const { closeAl, small } = this.props;
    const { getFieldDecorator } = this.props.form;
    const grid = { md: { span: 12 }, sm: { span: 24, offset: 0 } };

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className={style.mask} onClick={this.close} />
        <div className={cla(style.menuWrap, {
          [style.show]: this.state.show,
          [style.menuWrapSmall]: small
        })}>
          <div style={{ paddingTop: 6 }}>
            <div className={cla(commonStyle.textCenter)} style={{ marginBottom: 15 }}>
              我想查找 {getFieldDecorator('school_name', {})(
              <SchoolAutoComplete
                size="large"
                style={{ width: 200 }}
                placeholder="学校"
                valueUseName
                dataSource={this.state.schools} />
            )} 的
            </div>

            <div className={cla(commonStyle.textCenter)} style={{ marginBottom: 15 }}>
              {getFieldDecorator('professor_name', {})(
                <AutoComplete
                  size="large"
                  style={{ width: 200 }}
                  placeholder="教授" />
              )} 教授
            </div>
          </div>

          <Row className={style.row}>
            <Col
              className={cla(commonStyle.textCenter)}
              {...grid}>


              {getFieldDecorator('mode', { initialValue: 'professor' })(
                <input type="hidden" />
              )}
              <Button size="large" style={{ width: 300 }} htmlType="submit" type="primary">搜索</Button>
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