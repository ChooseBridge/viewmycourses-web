import React from 'react';
import ALayout from '../../components/layout/index.js';
import {
  Layout,
  Breadcrumb,
  Form,
  Input,
  Checkbox,
  Button,
  Select,
  Modal,
  message
} from 'antd';
import style from '../../common/style/create.css';
import api from '../../common/api';
import client from '../../common/client';
import commonStyle from '../../common/style/index.css';

const FormItem = Form.Item;
const { Option } = Select;

const {
  Content
} = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SchoolForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: [],
      province: [],
      city: [],
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.form.validateFields();

    client(api.getAllCountry)().then(country => {
      this.setState({
        country: country
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        client(api.createSchool)({ body: values }).then(({ id }) => {
          Modal.success({
            title: '提交成功',
            content: '我们将对您提交的资料进行审核，审核结果将会发送到您的邮箱',
            onOk: () => location.href = `/school/${id}`
          });
        }, e => {
          message.error(e.errorMsg);
          this.setState({ loading: false });
        });
      }
    });
  }

  countryChange = countryId => {
    client(api.getProvinceByCountry)({
      body: {
        country_id: countryId
      }
    }).then(province => {
      this.setState({
        province,
        countryValue: countryId
      });
      this.props.form.setFieldsValue({ 'city_id': '', 'province_id': '' });
    });
  };

  provinceChange = provinceId => {
    client(api.getCityByProvince)({
      body: {
        province_id: provinceId
      }
    }).then(city => {
      this.setState({
        city,
        provinceValue: provinceId
      });
      this.props.form.setFieldsValue({ 'city_id': '' });
    });
  };

  render() {
    const {
      url
    } = this.props;

    const {
      country,
      province,
      city,
      loading
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

    const schoolNameError = isFieldTouched('school_name') && getFieldError('school_name');
    const schoolNickNameError = isFieldTouched('school_nick_name') && getFieldError('school_nick_name');
    const countryError = isFieldTouched('country_id') && getFieldError('country_id');
    const provinceError = isFieldTouched('province_id') && getFieldError('province_id');
    const cityError = isFieldTouched('city_id') && getFieldError('city_id');
    const websiteError = isFieldTouched('website_url') && getFieldError('website_url');
    const emailError = isFieldTouched('your_email') && getFieldError('your_email');
    const agreeError = isFieldTouched('agreement') && getFieldError('agreement');

    return (
      <ALayout title='学校创建' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <h1>添加新学校</h1>
            <div className={style.proTip}>重要提示：请使用上面的搜索栏确保这所学校不存在。
            </div>
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                validateStatus={schoolNameError ? 'error' : ''}
                help={schoolNameError || ''}
                label="学校名称："
                extra="请使用学校所在国家的官方语言填写学校官方全称，否则创建申请将被驳回。">
                {getFieldDecorator('school_name', {
                  rules: [{ required: true, message: '请填写学校名称' }]
                })(
                  <Input size="large" style={{ width: 250 }} placeholder="学校名称" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={schoolNickNameError ? 'error' : ''}
                help={schoolNickNameError || ''}
                label="学校简称：">
                {getFieldDecorator('school_nick_name', {
                  rules: [{ required: true, message: '请填写学校简称' }]
                })(
                  <Input size="large" style={{ width: 250 }} placeholder="学校简称" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={countryError ? 'error' : ''}
                help={countryError || ''}
                label="国家：">
                {getFieldDecorator('country_id', {
                  rules: [{ required: true, message: '请填写国家' }]
                })(
                  <Select
                    size="large"
                    style={{ width: 250 }}
                    placeholder="国家"
                    onSelect={this.countryChange}>
                    {
                      country.map(c => <Option key={c.country_id} value={c.country_id}>{c.country_name}</Option>)
                    }
                  </Select>
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                validateStatus={provinceError ? 'error' : ''}
                help={provinceError || ''}
                label="省市：">
                {getFieldDecorator('province_id', {
                  rules: [{ required: true, message: '请填写洲/省' }]
                })(
                  <Select
                    size="large"
                    style={{ width: 250 }}
                    placeholder="洲/省"
                    onSelect={this.provinceChange}>
                    {
                      province.map(p => <Option key={p.province_id} value={p.province_id}>{p.province_name}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={cityError ? 'error' : ''}
                help={cityError || ''}
                label="城市">
                {getFieldDecorator('city_id', {
                  rules: [{ required: true, message: '请填写城市' }]
                })(
                  <Select
                    size="large"
                    style={{ width: 250 }}
                    placeholder="城市">
                    {
                      city.map(c => <Option key={c.city_id} value={c.city_id}>{c.city_name}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={websiteError ? 'error' : ''}
                help={websiteError || ''}
                label="学校首页">
                {getFieldDecorator('website_url', {
                  rules: [{ required: true, message: '请填写学校主页' }]
                })(
                  <Input size="large" style={{ width: 250 }} placeholder="http://" />
                )}
              </FormItem>
              {/*<FormItem*/}
              {/*{...formItemLayout}*/}
              {/*validateStatus={emailError ? 'error' : ''}*/}
              {/*help={emailError || ''}*/}
              {/*label="你的邮箱">*/}
              {/*{getFieldDecorator('your_email', {*/}
              {/*rules: [{*/}
              {/*required: true,*/}
              {/*message: '请填写电子邮箱！'*/}
              {/*}, {*/}
              {/*type: 'email',*/}
              {/*message: '您填写的e-mail不正确！'*/}
              {/*}]*/}
              {/*})(*/}
              {/*<Input size="large" style={{ width: 250 }} placeholder="电子邮箱" />*/}
              {/*)}*/}
              {/*</FormItem>*/}
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
                    }, message: '请同意！'
                  }]
                })(
                  <Checkbox>我已阅读并接受<a href="/terms">协议</a></Checkbox>
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

export default Form.create()(SchoolForm);