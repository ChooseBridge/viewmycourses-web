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

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SchoolRate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      avgPoints: 0,
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

  onSliderChangeHandler() {
    const valueObj = this.props.form.getFieldsValue();
    const avgPoints = (valueObj['slide'] +
    valueObj['slide1'] +
    valueObj['slide2'] +
    valueObj['slide3'] +
    valueObj['slide4'] +
    valueObj['slide5'] +
    valueObj['slide6'] +
    valueObj['slide7'] +
    valueObj['slide8'] +
    valueObj['slide9']) / 10;

    this.setState({
      avgPoints,
    });
  }

  render() {
    const {
      url
    } = this.props;

    const {
      loading,
      avgPoints
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

    const collegeError = isFieldTouched('college_id') && getFieldError('college_id');
    const slideError = isFieldTouched('slide') && getFieldError('slide');
    const slide1Error = isFieldTouched('slide1') && getFieldError('slide1');
    const slide2Error = isFieldTouched('slide2') && getFieldError('slide2');
    const slide3Error = isFieldTouched('slide3') && getFieldError('slide3');
    const slide4Error = isFieldTouched('slide4') && getFieldError('slide4');
    const slide5Error = isFieldTouched('slide5') && getFieldError('slide5');
    const slide6Error = isFieldTouched('slide6') && getFieldError('slide6');
    const slide7Error = isFieldTouched('slide7') && getFieldError('slide7');
    const slide8Error = isFieldTouched('slide8') && getFieldError('slide8');
    const slide9Error = isFieldTouched('slide9') && getFieldError('slide9');
    const textError = isFieldTouched('textarea') && getFieldError('textarea');

    return (
      <ALayout title='学校点评页' url={url}>
        <Content style={{ padding: '0 160px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={style.bgWrap}>
            <Card className={style.wrap}>
              <div>评价高校</div>
              <h2>复旦大学</h2>
              <div>中国上海杨浦区</div>
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
                  validateStatus={collegeError ? 'error' : ''}
                  help={collegeError || ''}
                  label="选择校区">
                  {getFieldDecorator('college_id', {
                    rules: [{ required: true, message: '请选择校区' }]
                  })(
                    <Select
                      size="large"
                      style={{ width: 250 }}
                      placeholder="请选择校区">
                        <Option value="1">校区1</Option>
                        <Option value="2">校区2</Option>
                        <Option value="3">校区3</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slideError ? 'error' : ''}
                  help={slideError || ''}
                  label="社会声誉">
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
                      onAfterChange={() => this.onSliderChangeHandler()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slide1Error ? 'error' : ''}
                  help={slide1Error || ''}
                  label="学术水平">
                  {getFieldDecorator('slide1',{
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
                      onAfterChange={() => this.onSliderChangeHandler()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slide2Error ? 'error' : ''}
                  help={slide2Error || ''}
                  label="网络服务">
                  {getFieldDecorator('slide2',{
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
                      onAfterChange={() => this.onSliderChangeHandler()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slide3Error ? 'error' : ''}
                  help={slide3Error || ''}
                  label="住宿条件">
                  {getFieldDecorator('slide3',{
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
                      onAfterChange={() => this.onSliderChangeHandler()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slide4Error ? 'error' : ''}
                  help={slide4Error || ''}
                  label="餐饮质量">
                  {getFieldDecorator('slide4',{
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
                      onAfterChange={() => this.onSliderChangeHandler()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slide5Error ? 'error' : ''}
                  help={slide5Error || ''}
                  label="校园地理位置">
                  {getFieldDecorator('slide5',{
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
                      onAfterChange={() => this.onSliderChangeHandler()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slide6Error ? 'error' : ''}
                  help={slide6Error || ''}
                  label="校园课外活动">
                  {getFieldDecorator('slide6',{
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
                      onAfterChange={() => this.onSliderChangeHandler()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slide7Error ? 'error' : ''}
                  help={slide7Error || ''}
                  label="校园基础设施">
                  {getFieldDecorator('slide7',{
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
                      onAfterChange={() => this.onSliderChangeHandler()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slide8Error ? 'error' : ''}
                  help={slide8Error || ''}
                  label="生活幸福指数">
                  {getFieldDecorator('slide8',{
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
                      onAfterChange={() => this.onSliderChangeHandler()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={slide9Error ? 'error' : ''}
                  help={slide9Error || ''}
                  label="校方与学生群体关系">
                  {getFieldDecorator('slide9',{
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
                      onAfterChange={() => this.onSliderChangeHandler()}
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
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

                <FormItem
                  {...formItemLayout}
                  label="综合得分">
                  <h2 style={{fontSize:40}}>{avgPoints}</h2>
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

export default Form.create()(SchoolRate);