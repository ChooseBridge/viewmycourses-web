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
  Modal,
} from 'antd';
import cla from 'classnames';
import client from '../../common/client';
import api from '../../common/api';
import style from '../../common/style/rate.css';
import commonStyle from '../../common/style/index.css';

const {
  Content
} = Layout;

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['风趣幽默', '和蔼可亲', '严谨认真', '反馈及时', '良师益友', '超赞讲师', '学识渊博', '学富五车', '呕心沥血', '鞠躬尽瘁', '诲人不倦', '一丝不苟'];

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ProfessorRate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      effort: 0,
      selectedTags: [],
      professor: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.form.validateFields();

    client(api.getProfessorDetail)({
      query: {
        professor_id: this.props.url.query.id
      }
    }).then(professor => {
      professor.coursesInfo.forEach(item => {
        item.course_id = item.course_id + '';
      });

      professor.schoolCategoryInfo.forEach(item => {
        item.course_category_id = item.course_category_id + '';
      });

      this.setState({
        professor,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      selectedTags,
      professor,
    } = this.state;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.tag = selectedTags.join(',');

        const courseCode = values.course_code;
        const courseCategoryName = values.course_category_name;

        //判断传id或传code和name
        professor.coursesInfo.forEach(item => {
          if(item.course_code == courseCode) {
            values.course_id = item.course_id;
            delete values.course_code;
          }
        });

        professor.schoolCategoryInfo.forEach(item => {
          if(item.course_category_name == courseCategoryName) {
            values.course_category_id = item.course_category_id;
            delete values.course_category_name;
          }
        });

        const body = Object.assign({}, {
          professor_id: this.props.url.query.id,
        }, values);

        client(api.createProfessorRate)({
          body,
        }).then(res => {
          if (res == '创建成功') {
            Modal.success({
              title: '创建成功',
              content: '感谢您的点评',
              okText: '确定'
            });
          }
        });
      }
    });
  }

  //计算努力指数
  onCalEffort() {
    const valueObj = this.props.form.getFieldsValue();

    if (valueObj['course_related_quiz'] != 0) {
      if (valueObj['spend_course_time_at_week'] && valueObj['quiz_num']) {
        let effort = valueObj['difficult_level'] *
          valueObj['spend_course_time_at_week'] *
          (valueObj['quiz_num'] / 4) *
          (5 / valueObj['course_related_quiz']) / 3750 * 100;

        effort = effort.toFixed(2);

        this.setState({
          effort
        });
      }
    }
  }

  handleChange(tag, checked) {
    const {
      selectedTags
    } = this.state;

    const nextSelectedTags = checked ?
      [...selectedTags, tag] :
      selectedTags.filter(t => t !== tag);

    if (nextSelectedTags.length <= 3) {
      this.setState({
        selectedTags: nextSelectedTags
      });
    }
  }

  render() {
    const {
      url
    } = this.props;

    const {
      loading,
      effort,
      selectedTags,
      professor,
    } = this.state;

    const {
      professorInfo,
      coursesInfo,
      schoolCategoryInfo,
    } = professor;

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

    const categorysError = isFieldTouched('course_category_name') && getFieldError('course_category_name');
    const courseCodeError = isFieldTouched('course_code') && getFieldError('course_code');
    const courseNameError = isFieldTouched('course_name') && getFieldError('course_name');
    const attendError = isFieldTouched('is_attend') && getFieldError('is_attend');
    const difficultError = isFieldTouched('difficult_level') && getFieldError('difficult_level');
    const homeworkError = isFieldTouched('homework_num') && getFieldError('homework_num');
    const quizError = isFieldTouched('quiz_num') && getFieldError('quiz_num');
    const relatedError = isFieldTouched('course_related_quiz') && getFieldError('course_related_quiz');
    const timeError = isFieldTouched('spend_course_time_at_week') && getFieldError('spend_course_time_at_week');
    const gradeError = isFieldTouched('grade') && getFieldError('grade');
    const tagError = isFieldTouched('tag') && getFieldError('tag');
    const commentError = isFieldTouched('comment') && getFieldError('comment');

    return (
      <ALayout title='课程点评页' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            <Card className={style.wrap}>
              <div>评价课程</div>
              {
                professorInfo &&
                <div>{professorInfo.school} {professorInfo.professor_full_name}</div>
              }
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
                  validateStatus={categorysError ? 'error' : ''}
                  help={categorysError || ''}
                  label="课程类别">
                  {getFieldDecorator('course_category_name', {
                    rules: [{ required: true, message: '请选择课程类别' }]
                  })(
                    <Select
                      mode="combobox"
                      placeholder="请选择课程类别"
                      style={{ width: 200 }}>
                      {
                        schoolCategoryInfo &&
                        schoolCategoryInfo.map(item =>
                          <Option
                            key={item.course_category_id}
                            value={item.course_category_name}>
                            {item.course_category_name}
                          </Option>
                        )
                      }
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={courseCodeError ? 'error' : ''}
                  help={courseCodeError || ''}
                  label="课程编号">
                  {getFieldDecorator('course_code', {
                    rules: [{ required: true, message: '请选择课程编号' }]
                  })(
                    <Select
                      mode="combobox"
                      placeholder="请选择课程编号"
                      style={{ width: 200 }}>
                      {
                        coursesInfo &&
                        coursesInfo.map(item =>
                          <Option
                          key={item.course_id}
                          value={item.course_code}>
                          {item.course_code}
                          </Option>
                        )
                      }
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={courseNameError ? 'error' : ''}
                  help={courseNameError || ''}
                  label="课程名">
                  {getFieldDecorator('course_name', {
                    rules: [{ required: true, message: '请填写课程名' }]
                  })(
                    <Input
                      style={{ width: 200 }}
                      placeholder="课程名" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={attendError ? 'error' : ''}
                  help={attendError || ''}
                  label="是否记出勤">
                  {getFieldDecorator('is_attend', {
                    rules: [{ required: true, message: '请选择是否记出勤' }]
                  })(
                    <RadioGroup>
                      <Radio value="1">是</Radio>
                      <Radio value="2">否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={difficultError ? 'error' : ''}
                  help={difficultError || ''}
                  label="课程难度">
                  {getFieldDecorator('difficult_level',{
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
                  validateStatus={homeworkError ? 'error' : ''}
                  help={homeworkError || ''}
                  label="笔头作业量">
                  {getFieldDecorator('homework_num',{
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
                      dots
                      max={5}
                      marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={quizError ? 'error' : ''}
                  help={quizError || ''}
                  label="每月考试数（包括随堂检测等）">
                  {getFieldDecorator('quiz_num', {
                    rules: [{ required: true, message: '请填写每月考试数' }]
                  })(
                    <AutoComplete
                      children={<Input type="number"/>}
                      onChange={() => {
                        setTimeout(() => this.onCalEffort(), 1000);
                      }}
                      style={{ width: 200 }}
                      placeholder="每月考试数" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={relatedError ? 'error' : ''}
                  help={relatedError || ''}
                  label="课程与考试内容相关度">
                  {getFieldDecorator('course_related_quiz',{
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
                  validateStatus={timeError ? 'error' : ''}
                  help={timeError || ''}
                  label="每周课堂外所花总时间">
                  {getFieldDecorator('spend_course_time_at_week', {
                    rules: [{ required: true, message: '请填写每周课堂外所花总时间' }]
                  })(
                    <AutoComplete
                      children={<Input type="number"/>}
                      onChange={() => {
                        setTimeout(() => this.onCalEffort(), 1000);
                      }}
                      style={{ width: 200 }}
                      placeholder="分钟" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  validateStatus={gradeError ? 'error' : ''}
                  help={gradeError || ''}
                  label="你的成绩">
                  {getFieldDecorator('grade', {
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
                  validateStatus={tagError ? 'error' : ''}
                  help={tagError || ''}
                  label="为教授选取标签">
                  {getFieldDecorator('tag')(
                    <div>
                      {tagsFromServer.map(tag => (
                        <CheckableTag
                          key={tag}
                          checked={selectedTags.indexOf(tag) > -1}
                          onChange={checked => this.handleChange(tag, checked)}>
                          {tag}
                        </CheckableTag>
                      ))}
                    </div>
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