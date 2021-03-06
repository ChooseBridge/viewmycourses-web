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
  Radio,
  AutoComplete,
} from 'antd';
import queryString from 'query-string';
import cla from 'classnames';
import api from '../common/api';
import client from '../common/client';
import style from '../common/style/home.css';
import commonStyle from '../common/style/index.css';
import requiredEdu from '../common/required-edu';

const {
  Content
} = Layout;

const RadioGroup = Radio.Group;

const {
  OptGroup,
  Option
} = AutoComplete;

//默认每页显示条数
const defaultPageSize = 15;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: [],
      province: [],
      city: [],
      schools: [],
      college: [],
      mode: '',
      noResult: false,
      currentPage: Number(props.url.query.condition.page) || 1,
      pageSize: Number(props.url.query.condition.pageSize) || defaultPageSize,
    };

    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onModeChange = this.onModeChange.bind(this);
    this.renderProfessor = this.renderProfessor.bind(this);
    this.renderSchool = this.renderSchool.bind(this);
  }

  componentDidMount() {
    // 搜索条件
    console.log(this.props.url.query.condition);

    const {
      country_id,
      province_id,
      city_id,
      school_id,
      school_name,
      college_id,
      professor_name,
      mode,
      name,
    } = this.props.url.query.condition;

    let searchText = '搜索结果如下';

    if (school_name) {
      searchText = `搜索"${school_name}"的结果`;
    }

    if (professor_name) {
      searchText = `搜索"${professor_name}"的结果`;
    }

    if (name) {
      searchText = `搜索"${name}"的结果`;
    }

    client(api.getAllCountry)().then(country => {
      this.setState({
        mode,
        searchText,
        country: country
      });

      if (country_id) {
        this.countryChange(country_id, false);
      }

      if (province_id) {
        this.provinceChange(province_id, false);
      }

      if (city_id) {
        this.cityChange(city_id, false);
      }

      if (school_id) {
        this.schoolChange(school_id, false);
      }

      if (college_id) {
        this.collegeChange(college_id, false);
      }

      if (mode == 'all') {
        this.searchAllByName();
      }

      if (mode == 'professor') {
        this.searchProfessor();
      }

      if (mode == 'school') {
        this.searchSchool();
      }
    });
  }

  onReSelect() {
    const {
      mode
    } = this.state;

    switch (mode) {
      case 'all':
        this.searchAllByName();
        return;
      case 'professor':
        this.searchProfessor();
        return;
      case 'school':
        this.searchSchool();
        return;
    }
  }

  onShowSizeChange(current, pageSize) {
    this.setState({
      pageSize,
    });

    this.onReSelect();
  }

  onPageChange(pageNumber) {
    this.setState({
      currentPage: pageNumber,
    });

    this.onReSelect();
  }

  countryChange = (countryId, isSearch = true) => {
    this.setState({
      provinceValue: '',
      city: [],
      cityValue: '',
      schools: [],
      schoolValue: '',
      college: [],
      collegeValue: '',
    });

    client(api.getProvinceByCountry)({
      body: {
        country_id: countryId
      }
    }).then(province => {
      this.setState({
        province,
        countryValue: countryId,
      });

      if (this.state.mode == 'school' && isSearch) {
        this.searchSchool();
      }
    });
  };

  provinceChange = (provinceId, isSearch = true) => {
    this.setState({
      cityValue: '',
      schools: [],
      schoolValue: '',
      college: [],
      collegeValue: '',
    });

    client(api.getCityByProvince)({
      body: {
        province_id: provinceId
      }
    }).then(city => {
      this.setState({
        city,
        provinceValue: provinceId,
      });

      if (this.state.mode == 'school' && isSearch) {
        this.searchSchool();
      }
    });
  };

  cityChange = (cityId, isSearch = true) => {
    const {
      countryValue,
      provinceValue
    } = this.state;

    this.setState({
      schoolValue: '',
      college: [],
      collegeValue: ''
    });

    client(api.getSchoolByCondition)({
      query: {
        country_id: countryValue,
        province_id: provinceValue,
        city_id: cityId
      }
    }).then(res => {
      this.setState({
        cityValue: cityId,
        schools: res.schools,
      });

      if (this.state.mode == 'school' && isSearch) {
        this.searchSchool();
      }
    });
  };

  schoolChange = (schoolId, isSearch = true) => {
    this.setState({
      collegeValue: '',
    });

    client(api.getCollegeBySchool)({
      body: {
        school_id: schoolId
      }
    }).then(college => {
      this.setState({
        schoolValue: schoolId,
        college,
      });

      if (this.state.mode == 'professor' && isSearch) {
        this.searchProfessor();
      }
    });
  };

  collegeChange = (collegeId, isSearch = true) => {
    this.setState({
      collegeValue: collegeId
    });

    if (this.state.mode == 'professor' && isSearch) {
      this.searchProfessor();
    }
  };

  resetUrl(query) {
    let url = queryString.stringify(query);

    url = `/search?${url}`;

    history.replaceState({}, '搜索页面', url);
  }

  searchAllByName() {
    setTimeout(() => {
      const {
        pageSize,
        currentPage,
        mode,
      } = this.state;

      const query = {
        name: this.props.url.query.condition.name,
        pageSize,
        page: currentPage,
        mode,
      };

      client(api.getAllByName)({
        query
      }).then(res => {
        this.setState({
          allResult: res.res,
          total: res.total,
          allName: this.props.url.query.condition.name,
          noResult: !res.res,
        });

        this.resetUrl(query);
      });
    }, 100)
  }

  searchSchool() {
    setTimeout(() => {
      const {
        countryValue,
        provinceValue,
        cityValue,
        pageSize,
        currentPage,
        mode,
        allName,
      } = this.state;

      const {
        school_name,
        country_id,
        province_id,
        city_id,
      } = this.props.url.query.condition;

      const query = {
        country_id: countryValue || country_id,
        province_id: provinceValue || province_id,
        city_id: cityValue || city_id,
        school_name: allName || school_name,
        pageSize,
        page: currentPage,
        mode,
      };

      client(api.getSchoolByCondition)({
        query,
      }).then(res => {
        this.setState({
          schoolResult: res.schools,
          total: res.pageInfo.total,
          noResult: res.schools.length == 0,
        });

        this.resetUrl(query);
      });
    }, 100)
  }

  searchProfessor() {
    setTimeout(() => {
      const {
        countryValue,
        provinceValue,
        cityValue,
        schoolValue,
        collegeValue,
        pageSize,
        currentPage,
        mode,
        allName,
      } = this.state;

      const {
        country_id,
        province_id,
        city_id,
        school_id,
        college_id,
        professor_name,
        school_name,
        college_name,
      } = this.props.url.query.condition;

      const query = {
        country_id: countryValue || country_id,
        province_id: provinceValue || province_id,
        city_id: cityValue || city_id,
        school_id: schoolValue || school_id,
        college_id: collegeValue || college_id,
        school_name,
        college_name,
        professor_name: allName || professor_name,
        pageSize,
        page: currentPage,
        mode,
      };

      if (query.school_id) {
        delete query.school_name;
      }

      if (query.college_id) {
        delete query.college_name;
      }

      client(api.getProfessorByCondition)({
        query,
      }).then(res => {
        this.setState({
          professorResult: res.professors,
          total: res.pageInfo.total,
          noResult: res.professors.length == 0,
        });

        this.resetUrl(query);
      });
    }, 100)
  }

  onModeChange(e) {
    const mode = e.target.value;

    this.setState({
      mode,
      currentPage: 1,
      pageSize: defaultPageSize,
    });

    if (mode == 'school') {
      this.searchSchool();
    }

    if (mode == 'professor') {
      this.searchProfessor();
    }
  }

  renderSchool(item) {
    return (
      <a
        key={item.school_id}
        href={`/school/${item.school_id}`}
        style={{color:'#000'}}>
        <Row
          type="flex"
          align="middle"
          className={style.wrap}>
          <Col span={2}>
            <Icon style={{ fontSize: 40, color: '#66dc66' }} type="book" />
          </Col>
          <Col span={6}>学校</Col>
          <Col span={16}>
            <div><h2>{item.school_name}</h2></div>
            <div>{item.city || item.city_name}, {item.province || item.province_name} {item.country || item.country_name}</div>
          </Col>
        </Row>
      </a>
    );
  }

  renderProfessor(item) {
    return (
      <a
        key={item.professor_id}
        href={`/professor/${item.professor_id}`}
        style={{color:'#000'}}>
        <Row
          type="flex"
          align="middle"
          className={style.wrap}>
          <Col span={2}>
            <Icon style={{ fontSize: 40, color: '#66dc66' }} type="idcard" />
          </Col>
          <Col span={6}>教授</Col>
          <Col span={16}>
            <div><h2>{item.professor_full_name}</h2></div>
            <div>{item.school_name} - {item.college}</div>
          </Col>
        </Row>
      </a>
    );
  }

  renderNoresult() {
    return (
      <div><h2>没有搜索到任何结果</h2></div>
    );
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
      college,
      countryValue,
      provinceValue,
      cityValue,
      schoolValue,
      collegeValue,
      mode,
      currentPage,
      pageSize,
      total,
      allResult,
      professorResult,
      schoolResult,
      searchText,
      noResult,
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
              <div><h3>{searchText}</h3></div>
              <div>没有您想找的学校或教授？</div>
              <div>
                <a
                  onClick={e => {
                    if (!url.query.user.student.is_email_edu) {
                      e.preventDefault();
                      requiredEdu();
                    }
                  }}
                  href="/professor/create">创建教授</a>或
                <a
                  onClick={e => {
                    if (!url.query.user) {
                      e.preventDefault();
                      requiredEdu();
                    }
                  }}
                  href="/school/create">创建学校</a>
              </div>

              {
                noResult ?
                this.renderNoresult()
                :
                <div>
                  <div>结果可按照下列条件筛选</div>

                  <Row>
                    <Col span={4}>
                      <RadioGroup onChange={this.onModeChange} value={mode}>
                        <Radio style={radioStyle} value="professor">教授</Radio>
                        <Radio style={radioStyle} value="school">学校</Radio>
                      </RadioGroup>
                    </Col>
                    {
                      mode != 'all' &&
                      <Col span={20}>
                        <Select
                          className={style.searchSelect}
                          placeholder="国家"
                          onSelect={this.countryChange}
                          value={countryValue}>
                          {
                            country.map(c =>
                              <Option
                                key={String(c.country_id)}
                                value={String(c.country_id)}>
                              {c.country_name}
                              </Option>
                            )
                          }
                        </Select>
                        <Select
                          className={style.searchSelect}
                          placeholder="洲/省"
                          onSelect={this.provinceChange}
                          value={provinceValue}>
                          {
                            province.map(p =>
                              <Option
                                key={String(p.province_id)}
                                value={String(p.province_id)}>
                                {p.province_name}
                              </Option>
                            )
                          }
                        </Select>
                        <Select
                          className={style.searchSelect}
                          placeholder="城市"
                          onSelect={this.cityChange}
                          value={cityValue}>
                          {
                            city.map(c =>
                              <Option
                                key={String(c.city_id)}
                                value={String(c.city_id)}>
                              {c.city_name}
                              </Option>
                            )
                          }
                        </Select>
                        {
                          mode == 'professor' &&
                          <span>
                            <Select
                              className={style.searchSelect}
                              placeholder="学校"
                              onSelect={this.schoolChange}
                              value={schoolValue}>
                              {
                                schools.map(s =>
                                  <Option
                                    key={String(s.school_id)}
                                    value={String(s.school_id)}>
                                    {s.school_name}
                                  </Option>
                                )
                              }
                            </Select>
                            <Select
                              className={style.searchSelect}
                              placeholder="学院"
                              onSelect={this.collegeChange}
                              value={collegeValue}>
                              {
                                college.map(c =>
                                  <Option
                                    key={String(c.college_id)}
                                    value={String(c.college_id)}>
                                    {c.college_name}
                                  </Option>
                                )
                              }
                            </Select>
                          </span>
                        }
                      </Col>
                    }
                  </Row>
                </div>
              }
            </Card>

            {
              !noResult &&
              <Card>
                <Row>
                  <Col span={8}><h2>类别</h2></Col>
                  <Col span={16}><h2>名字</h2></Col>
                </Row>
                {
                  mode == 'all' && allResult &&
                  allResult.map(item =>
                    item.type == 'school' ?
                    this.renderSchool(item)
                    :
                    this.renderProfessor(item)
                  )
                }

                {
                  mode == 'professor' && professorResult &&
                  professorResult.map(item => this.renderProfessor(item))
                }

                {
                  mode == 'school' && schoolResult &&
                  schoolResult.map(item => this.renderSchool(item))
                }
                <Pagination
                  showSizeChanger
                  showQuickJumper
                  onShowSizeChange={this.onShowSizeChange}
                  onChange={this.onPageChange}
                  current={currentPage}
                  pageSize={pageSize}
                  total={total} />
              </Card>
            }
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Search;