import React from 'react';
import ALayout from '../components/layout/index.js';
import {
  Layout,
  Breadcrumb,
  Button,
  Icon,
  Avatar,
  Row,
  Col,
  Tag,
  Card,
  Pagination,
  Select,
  Radio
} from 'antd';
import cla from 'classnames';
import api from '../common/api';
import client from '../common/client';
import style from '../common/style/home.css';
import commonStyle from '../common/style/index.css';

const {
  Content
} = Layout;

const RadioGroup = Radio.Group;
const { Option } = Select;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: [],
      province: [],
      city: [],
      schools: [],
      mode: '',
      currentPage: 1,
      pageSize: 10,
    };

    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onModeChange = this.onModeChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.props.url.query.condition); // 搜索条件
    client(api.getAllCountry)().then(country => {
      this.setState({
        country: country
      });
    });
  }

  onShowSizeChange(current, pageSize) {
    this.setState({
      pageSize,
    })
  }

  onPageChange(pageNumber) {
    this.setState({
      currentPage: pageNumber,
    })
  }

  countryChange = countryId => {
    client(api.getProvinceByCountry)({
      body: {
        country_id: countryId
      }
    }).then(province => {
      this.setState({
        province,
        countryValue: countryId,
        provinceValue: '',
        city: [],
        cityValue: '',
        schools: [],
        schoolValue: ''
      });
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
        provinceValue: provinceId,
        cityValue: '',
        schools:[],
        schoolValue: '',
      });
    });
  };

  cityChange = cityId => {
    this.setState({
      cityValue: cityId
    });

    const {
      countryValue,
      provinceValue
    } = this.state;

    client(api.getSchoolByCondition)({
      body: {
        country_id: countryValue,
        province_id: provinceValue,
        city_id: cityId
      }
    }).then(res => {
      this.setState({
        schools: res.schools,
      });
    });
  };

  schoolChange = schoolId => {
    this.setState({
      schoolValue: schoolId
    });
  }

  onModeChange(e) {
    this.setState({
      mode: e.target.value
    });
  }

  render() {
    const {
      url
    } = this.props;

    const {
      country,
      province,
      city,
      schools,
      countryValue,
      provinceValue,
      cityValue,
      schoolValue,
      mode,
      currentPage,
      pageSize
    } = this.state;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };

    return (
      <ALayout title='搜索结果' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            <Card className={style.wrap}>
              <div><h3>搜索“刘强东”的结果</h3></div>
              <div>没有你想找的学习或教授？</div>
              <div>
                <a href="/professor/create">创建教授</a>或<a href="/school/create">创建学校</a>
              </div>
              <div style={{ margin: '10px 0' }}><h2>每页将展示20条结果，共1200条</h2></div>
              <Pagination
                showSizeChanger
                showQuickJumper
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                current={currentPage}
                pageSize={pageSize}
                total={1200} />

              <div>结果可按照下列条件筛选</div>
              <Row>
                <Col span={4}>
                  <RadioGroup onChange={this.onModeChange}>
                    <Radio style={radioStyle} value="professor">Professor</Radio>
                    <Radio style={radioStyle} value="school">School</Radio>
                  </RadioGroup>
                </Col>
                <Col span={20}>
                  {
                    mode == 'professor' &&
                    <div>
                      <Select
                        style={{ width: 150 }}
                        placeholder="国家"
                        onSelect={this.countryChange}
                        value={countryValue}>
                        {
                          country.map(c =>
                            <Option
                              key={c.country_id}
                              value={c.country_id}>
                            {c.country_name}
                            </Option>
                          )
                        }
                      </Select>
                      <Select
                        style={{ width: 150 }}
                        placeholder="洲/省"
                        onSelect={this.provinceChange}
                        value={provinceValue}>
                        {
                          province.map(p =>
                            <Option
                              key={p.province_id}
                              value={p.province_id}>
                              {p.province_name}
                            </Option>
                          )
                        }
                      </Select>
                      <Select
                        style={{ width: 150 }}
                        placeholder="城市"
                        onSelect={this.cityChange}
                        value={cityValue}>
                        {
                          city.map(c =>
                            <Option
                              key={c.city_id}
                              value={c.city_id}>
                            {c.city_name}
                            </Option>
                          )
                        }
                      </Select>
                      <Select
                        style={{ width: 150 }}
                        placeholder="学校"
                        onSelect={this.schoolChange}
                        value={schoolValue}>
                        {
                          schools.map(s =>
                            <Option
                              key={s.school_id}
                              value={s.school_id}>
                              {s.school_name}
                            </Option>
                          )
                        }
                      </Select>
                    </div>
                  }
                  {
                    mode == 'school' &&
                    <div>
                      <Select
                        style={{ width: 150 }}
                        placeholder="国家"
                        onSelect={this.countryChange}
                        value={countryValue}>
                        {
                          country.map(c => <Option key={c.country_id} value={c.country_id}>{c.country_name}</Option>)
                        }
                      </Select>
                      <Select
                        style={{ width: 150 }}
                        placeholder="洲/省"
                        onSelect={this.provinceChange}
                        value={provinceValue}>
                        {
                          province.map(p => <Option key={p.province_id}
                                                    value={p.province_id}>{p.province_name}</Option>)
                        }
                      </Select>
                      <Select
                        style={{ width: 150 }}
                        placeholder="城市"
                        onSelect={this.cityChange}
                        value={cityValue}>
                        {
                          city.map(c => <Option key={c.city_id} value={c.city_id}>{c.city_name}</Option>)
                        }
                      </Select>
                    </div>
                  }
                </Col>
              </Row>
            </Card>

            <Card>
              <Row>
                <Col span={8}><h2>种类</h2></Col>
                <Col span={16}><h2>名字</h2></Col>
              </Row>

              <Row type="flex" align="middle" className={style.wrap}>
                <Col span={2}>
                  <Icon style={{ fontSize: 40, color: '#66dc66' }} type="book" />
                </Col>
                <Col span={6}>学校</Col>
                <Col span={16}>
                  <div><h2>复旦大学</h2></div>
                  <div>中国 上海 上海市</div>
                </Col>
              </Row>

              <Row type="flex" align="middle" className={style.wrap}>
                <Col span={2}>
                  <Icon style={{ fontSize: 40, color: '#66dc66' }} type="idcard" />
                </Col>
                <Col span={6}>教授</Col>
                <Col span={16}>
                  <div><h2>刘强东</h2></div>
                  <div>复旦大学 教授</div>
                </Col>
              </Row>

              <Pagination
                showSizeChanger
                showQuickJumper
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                current={currentPage}
                pageSize={pageSize}
                total={1200} />
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Search;