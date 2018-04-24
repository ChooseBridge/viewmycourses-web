import React from 'react';
import ALayout from '../../components/layout/index.js';
import {
  Layout,
  Breadcrumb,
  Form,
  Input,
  Checkbox,
  Button,
  Modal,
  Select,
  message
} from 'antd';
import style from '../../common/style/create.css';
import api from '../../common/api';
import client from '../../common/client';
import SchoolSelector from '../../components/school-selector';
import commonStyle from '../../common/style/index.css';

const { Option } = Select;

const FormItem = Form.Item;

const {
  Content
} = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ProfessorForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schools: [],
      collage: [],
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.form.validateFields();
    client(api.getSchoolGroupByCountry)()
      .then(res => {

        this.setState({
          schools: res
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        client(api.createProfessor)({ body: values }).then(({ id }) => {
          Modal.success({
            title: '提交成功',
            content: <span>教授主页创建成功，现在就去<a href={`/professor/${id}/rate`}>点评该教授</a>的课程吧！</span>,
            okText: '确定',
            width: 550,
            onOk: () => location.href = `/professor/${id}`
          });
        }, e => {
          message.error(e.errorMsg);
          this.setState({ loading: false });
        });
      }
    });
  }

  handleSearch = id => {
    client(api.getCollegeBySchool)({
      body: { school_id: id }
    })
      .then(collage => {
        this.setState({
          collage
        });
      });
  };

  render() {
    const {
      url
    } = this.props;

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

    const firstNameError = isFieldTouched('professor_fisrt_name') && getFieldError('professor_fisrt_name');
    const secondNameError = isFieldTouched('professor_second_name') && getFieldError('professor_second_name');
    const schoolError = isFieldTouched('school_id') && getFieldError('school_id');
    const collegeError = isFieldTouched('college_id') && getFieldError('college_id');
    const webSiteError = isFieldTouched('professor_web_site') && getFieldError('professor_web_site');
    const agreeError = isFieldTouched('agreement') && getFieldError('agreement');

    return (
      <ALayout title='教授创建' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <h1>添加新教授</h1>
            <div className={style.proTip}>重要提示：请使用上面的搜索栏确保不存在这位教授。
            </div>
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                validateStatus={firstNameError ? 'error' : ''}
                help={firstNameError || ''}
                label="姓："
                extra="请使用学校选课系统内的官方教授名称，否则创建申请将被驳回。">
                {getFieldDecorator('professor_fisrt_name', {
                  rules: [{ required: true, message: '请填写姓' }]
                })(
                  <Input size="large" style={{ width: 250 }} placeholder="姓" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={secondNameError ? 'error' : ''}
                help={secondNameError || ''}
                label="名：">
                {getFieldDecorator('professor_second_name', {
                  rules: [{ required: true, message: '请填写名!' }]
                })(
                  <Input size="large" style={{ width: 250 }} placeholder="名" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={schoolError ? 'error' : ''}
                help={schoolError || ''}
                label="学校：">
                {getFieldDecorator('school_id', {
                  rules: [{ required: true, message: '请填写学校' }]
                })(
                  <SchoolSelector
                    size="large"
                    style={{ width: 250 }}
                    onChange={this.handleSearch}
                    placeholder="学校"
                    dataSource={this.state.schools} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={collegeError ? 'error' : ''}
                help={collegeError || ''}
                label="学院：">
                {getFieldDecorator('college_id', {
                  rules: [{ required: true, message: '请填写学院' }]
                })(
                  <Select
                    size="large"
                    style={{ width: 250 }}
                    placeholder="学院">
                    {
                      this.state.collage.map(clg => <Option key={clg.college_id}
                                                            value={clg.college_id}>{clg.college_name}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={webSiteError ? 'error' : ''}
                help={webSiteError || ''}
                label="个人主页：">
                {getFieldDecorator('professor_web_site')(
                  <Input size="large" style={{ width: 250 }} placeholder="http://" />
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}
                        validateStatus={agreeError ? 'error' : ''}
                        help={agreeError || ''}>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                  rules: [{
                    validator: (rule, value, callback) => {
                      if (!value) {
                        callback(true);
                      }
                      callback();
                    }, message: '请同意!'
                  }]
                })(
                  <Checkbox>我已阅读并接受<a href="/terms" target="_blank">协议</a></Checkbox>
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button
                  loading={this.state.loading}
                  size="large"
                  style={{ width: 250 }}
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}>
                  提交
                </Button>
              </FormItem>
            </Form>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Form.create()(ProfessorForm);