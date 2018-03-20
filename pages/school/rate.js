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
      avgPoints: 0
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
    const avgPoints = (valueObj['social_reputation'] +
    valueObj['academic_level'] +
    valueObj['network_services'] +
    valueObj['accommodation'] +
    valueObj['food_quality'] +
    valueObj['campus_location'] +
    valueObj['extracurricular_activities'] +
    valueObj['campus_infrastructure'] +
    valueObj['life_happiness_index'] +
    valueObj['school_students_relations']) / 10;

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

    const schoolError = isFieldTouched('school_district_id') && getFieldError('school_district_id');
    const socialError = isFieldTouched('social_reputation') && getFieldError('social_reputation');
    const academicError = isFieldTouched('academic_level') && getFieldError('academic_level');
    const networkError = isFieldTouched('network_services') && getFieldError('network_services');
    const accommodationError = isFieldTouched('accommodation') && getFieldError('accommodation');
    const foodError = isFieldTouched('food_quality') && getFieldError('food_quality');
    const campusError = isFieldTouched('campus_location') && getFieldError('campus_location');
    const extracurricularError = isFieldTouched('extracurricular_activities') && getFieldError('extracurricular_activities');
    const infrastructureError = isFieldTouched('campus_infrastructure') && getFieldError('campus_infrastructure');
    const lifeError = isFieldTouched('life_happiness_index') && getFieldError('life_happiness_index');
    const relationsError = isFieldTouched('school_students_relations') && getFieldError('school_students_relations');
    const commentError = isFieldTouched('comment') && getFieldError('comment');

    return (
      <ALayout title='学校点评页' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
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
                  validateStatus={schoolError ? 'error' : ''}
                  help={schoolError || ''}
                  label="选择校区">
                  {getFieldDecorator('school_district_id', {
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
                  validateStatus={socialError ? 'error' : ''}
                  help={socialError || ''}
                  label="社会声誉">
                  {getFieldDecorator('social_reputation',{
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
                  validateStatus={academicError ? 'error' : ''}
                  help={academicError || ''}
                  label="学术水平">
                  {getFieldDecorator('academic_level',{
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
                  validateStatus={networkError ? 'error' : ''}
                  help={networkError || ''}
                  label="网络服务">
                  {getFieldDecorator('network_services',{
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
                  validateStatus={accommodationError ? 'error' : ''}
                  help={accommodationError || ''}
                  label="住宿条件">
                  {getFieldDecorator('accommodation',{
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
                  validateStatus={foodError ? 'error' : ''}
                  help={foodError || ''}
                  label="餐饮质量">
                  {getFieldDecorator('food_quality',{
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
                  validateStatus={campusError ? 'error' : ''}
                  help={campusError || ''}
                  label="校园地理位置">
                  {getFieldDecorator('campus_location',{
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
                  validateStatus={extracurricularError ? 'error' : ''}
                  help={extracurricularError || ''}
                  label="校园课外活动">
                  {getFieldDecorator('extracurricular_activities',{
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
                  validateStatus={infrastructureError ? 'error' : ''}
                  help={infrastructureError || ''}
                  label="校园基础设施">
                  {getFieldDecorator('campus_infrastructure',{
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
                  validateStatus={lifeError ? 'error' : ''}
                  help={lifeError || ''}
                  label="生活幸福指数">
                  {getFieldDecorator('life_happiness_index',{
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
                  validateStatus={relationsError ? 'error' : ''}
                  help={relationsError || ''}
                  label="校方与学生群体关系">
                  {getFieldDecorator('school_students_relations',{
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
                  validateStatus={commentError ? 'error' : ''}
                  help={commentError || ''}
                  label="文字点评">
                  {getFieldDecorator('comment', {
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