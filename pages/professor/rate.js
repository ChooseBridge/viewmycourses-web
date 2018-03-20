import React from 'react';
import ALayout from '../../components/layout/index.js';
import {
  Layout,
  Breadcrumb,
  Button,
  Icon,
  Avatar,
  Row,
  Col,
  Tag,
  Select,
  Card,
  Form,
  Slider,
  Input,
  Radio,
  AutoComplete,
} from 'antd';
import cla from 'classnames';
import style from '../../common/style/rate.css';
import commonStyle from '../../common/style/index.css';

const {
  Content
} = Layout;

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ProfessorRate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      effort: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.props.form.validateFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  onCalEffort() {
    const valueObj = this.props.form.getFieldsValue();

    console.log(valueObj);

    if (valueObj['slide2'] != 0) {
      if (valueObj['minutes'] && valueObj['test_number']) {
        const effort = valueObj['slide'] *
          valueObj['minutes'] *
          valueObj['test_number'] *
          (5 / valueObj['slide2']);

        this.setState({
          effort
        });
      }
    }
  }

  render() {
    const {
      url
    } = this.props;

    const {
      loading,
      effort
    } = this.state;

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const classError = isFieldTouched('class_type') && getFieldError('class_type');
    const classIdError = isFieldTouched('class_id') && getFieldError('class_id');
    const classNameError = isFieldTouched('class_name') && getFieldError('class_name');
    const recordError = isFieldTouched('record') && getFieldError('record');
    const slideError = isFieldTouched('slide') && getFieldError('slide');
    const slide1Error = isFieldTouched('slide1') && getFieldError('slide1');
    const testError = isFieldTouched('test_number') && getFieldError('test_number');
    const slide2Error = isFieldTouched('slide2') && getFieldError('slide2');
    const minutesError = isFieldTouched('minutes') && getFieldError('minutes');
    const scoreError = isFieldTouched('score') && getFieldError('score');
    const textError = isFieldTouched('textarea') && getFieldError('textarea');

    return (
      <ALayout title='课程点评页' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={style.bgWrap}>
            <Card className={style.wrap}>
              <div>评价课程</div>
              <h2>PCS0001</h2>
              <div>复旦大学 刘强东教授</div>
            </Card>

            <Card className={style.wrap}>
              <Row type="flex" justify="space-between" align="middle">
                <Col span={12}>
                  <h2
                    className={commonStyle.colorBlue}
                    style={{fontSize:35}}>
                    Rating Do's and Don'ts
                  </h2>
                </Col>
                <Col
                  className={commonStyle.colorBlue}
                  span={12}>
                  VIEW THE FULL SITE GUIDELINES
                </Col>
              </Row>

              <Row type="flex" justify="space-between" align="top">
                <Col span={8}>
                  <h2 className={style.doTitle}>Do</h2>
                  <div className={style.doText}>Double check your comments before posting. It never hurts to check your grammar.</div>
                </Col>
                <Col span={8}>
                  <h2 className={style.doTitle}>Do</h2>
                  <div className={style.doText}>Refer to the rating categories to help you better elaborate your comments.</div>
                </Col>
                <Col span={8}>
                  <h2 className={style.doTitle}>Do</h2>
                  <div className={style.doText}>Reference existing comments or comments that have been deleted by our moderators.</div>
                </Col>
              </Row>
            </Card>

            <Card className={style.wrap}>
              <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  validateStatus={classError ? 'error' : ''}
                  help={classError || ''}
                  label="课程类别">
                  {getFieldDecorator('class_type', {
                    rules: [{ required: true, message: '请选择课程类别' }]
                  })(
                    <Select
                      mode="combobox"
                      placeholder="请选择课程类别"
                      style={{ width: 200 }}>
                      <Option value="1">类别1</Option>
                      <Option value="2">类别2</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={classIdError ? 'error' : ''}
                  help={classIdError || ''}
                  label="课程编号">
                  {getFieldDecorator('class_id', {
                    rules: [{ required: true, message: '请选择课程编号' }]
                  })(
                    <Select
                      mode="combobox"
                      placeholder="请选择课程编号"
                      style={{ width: 200 }}>
                      <Option value="PCS0001">PCS0001</Option>
                      <Option value="PCS0002">PCS0002</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={classNameError ? 'error' : ''}
                  help={classNameError || ''}
                  label="课程名">
                  {getFieldDecorator('class_name', {
                    rules: [{ required: true, message: '请填写课程名' }]
                  })(
                    <Input
                      style={{ width: 200 }}
                      placeholder="课程名" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={recordError ? 'error' : ''}
                  help={recordError || ''}
                  label="是否记出勤">
                  {getFieldDecorator('record', {
                    rules: [{ required: true, message: '请选择是否记出勤' }]
                  })(
                    <RadioGroup>
                      <Radio value="是">是</Radio>
                      <Radio value="否">否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slideError ? 'error' : ''}
                  help={slideError || ''}
                  label="课程难度">
                  {getFieldDecorator('slide',{
                    initialValue: 0,
                    rules: [{
                      validator: (rule, value, callback) => {
                        if (value == 0) {
                          callback(true);
                        }
                        callback();
                      }, message: '请在1-5分中选择'
                    }]
                  })(
                    <Slider
                      onAfterChange={() => this.onCalEffort()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slide1Error ? 'error' : ''}
                  help={slide1Error || ''}
                  label="笔头作业量">
                  {getFieldDecorator('slide1',{
                    initialValue: 0,
                    rules: [{
                      validator: (rule, value, callback) => {
                        console.log(value);
                        if (value == 0) {
                          callback(true);
                        }
                        callback();
                      }, message: '请在1-5分中选择'
                    }]
                  })(
                    <Slider
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={testError ? 'error' : ''}
                  help={testError || ''}
                  label="每月考试数（包括随堂检测等）">
                  {getFieldDecorator('test_number', {
                    rules: [{ required: true, message: '请填写每月考试数' }]
                  })(
                    <AutoComplete
                      children={<Input type="number"/>}
                      onChange={() => this.onCalEffort()}
                      style={{ width: 200 }}
                      placeholder="每月考试数" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slide2Error ? 'error' : ''}
                  help={slide2Error || ''}
                  label="课程与考试内容相关度">
                  {getFieldDecorator('slide2',{
                    initialValue: 0,
                    rules: [{
                      validator: (rule, value, callback) => {
                        console.log(value);
                        if (value == 0) {
                          callback(true);
                        }
                        callback();
                      }, message: '请在1-5分中选择'
                    }]
                  })(
                    <Slider
                      onAfterChange={() => this.onCalEffort()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={minutesError ? 'error' : ''}
                  help={minutesError || ''}
                  label="每周课堂外所花总时间">
                  {getFieldDecorator('minutes', {
                    rules: [{ required: true, message: '请填写每周课堂外所花总时间' }]
                  })(
                    <AutoComplete
                      children={<Input type="number"/>}
                      onChange={() => this.onCalEffort()}
                      style={{ width: 200 }}
                      placeholder="分钟" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={scoreError ? 'error' : ''}
                  help={scoreError || ''}
                  label="你的成绩">
                  {getFieldDecorator('your_score', {
                    rules: [{ required: true, message: '请选你的成绩' }]
                  })(
                    <Select
                      placeholder="你的成绩"
                      style={{ width: 200 }}>
                      <Option value="A">A</Option>
                      <Option value="B">B</Option>
                      <Option value="C">C</Option>
                      <Option value="D">D</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="努力指数">
                  <h2 style={{fontSize:40}}>{effort}</h2>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={textError ? 'error' : ''}
                  help={textError || ''}
                  label="文字点评">
                  {getFieldDecorator('textarea', {
                    rules: [{ required: true, message: '请填写点评' }]
                  })(
                    <TextArea rows={4}  style={{resize:'none'}}/>
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button
                    loading={loading}
                    size="large"
                    style={{ width: 250 }}
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}>
                    提交点评
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Form.create()(ProfessorRate);