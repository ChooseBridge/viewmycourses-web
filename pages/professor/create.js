import React from 'react';
import ALayout from '../../components/layout/index.js';
import {
  Layout,
  Breadcrumb,
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import style from '../../common/style/create.css';
import api from '../../common/api';
import client from '../../common/client';
import SchoolSelector from '../../components/school-selector';

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
      schools: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.form.validateFields();
    client(api.getSchoolGroupByCountry)()
      .then(res => {

        this.setState({
          schools: res
        })
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleSearch = (value) => {
    // let result;
    // if (!value || value.indexOf('@') >= 0) {
    //   result = [];
    // } else {
    //   result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    // }
    // this.setState({ result });
  }

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

    const firstNameError = isFieldTouched('prefessor_first_Name') && getFieldError('prefessor_first_Name');
    const secondNameError = isFieldTouched('prefessor_second_Name') && getFieldError('prefessor_second_Name');
    const schoolError = isFieldTouched('school_id') && getFieldError('school_id');
    const collegeError = isFieldTouched('college_id') && getFieldError('college_id');
    const webSiteError = isFieldTouched('professor_web_Site') && getFieldError('professor_web_Site');
    const agreeError = isFieldTouched('agreement') && getFieldError('agreement');

    return (
      <ALayout title='教授创建页面' url={url}>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <h1>Add New Professor</h1>
            <div className={style.proTip}>Important: Please use the search bar above to make sure that the professor
              does not already exist at this school.
            </div>
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                validateStatus={firstNameError ? 'error' : ''}
                help={firstNameError || ''}
                label="名：">
                {getFieldDecorator('prefessor_first_Name', {
                  rules: [{ required: true, message: '请填写名' }]
                })(
                  <Input size="large" style={{ width: 250 }} placeholder="名" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={secondNameError ? 'error' : ''}
                help={secondNameError || ''}
                label="姓：">
                {getFieldDecorator('prefessor_second_Name', {
                  rules: [{ required: true, message: '请填写姓!' }]
                })(
                  <Input size="large" style={{ width: 250 }} placeholder="姓" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={schoolError ? 'error' : ''}
                help={schoolError || ''}
                label="学校：">
                {getFieldDecorator('school_id', {
                  rules: [{ required: true, message: '请填写学校!' }]
                })(
                  <SchoolSelector
                    size="large"
                    style={{ width: 250 }}
                    onSearch={this.handleSearch}
                    placeholder="学校"
                    dataSource={this.state.schools} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={collegeError ? 'error' : ''}
                help={collegeError || ''}
                label="学位：">
                {getFieldDecorator('college_id', {
                  rules: [{ required: true, message: '请填写学位!' }]
                })(
                  <Input size="large" style={{ width: 250 }} placeholder="学位" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={webSiteError ? 'error' : ''}
                help={webSiteError || ''}
                label="个人主页：">
                {getFieldDecorator('professor_web_Site', {
                  rules: [{ required: true, message: '请填写个人主页!' }]
                })(
                  <Input size="large" style={{ width: 250 }} placeholder="个人主页" />
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
                  <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button
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