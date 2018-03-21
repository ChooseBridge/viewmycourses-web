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
} from 'antd';
import cla from 'classnames';
import api from '../common/api';
import client from '../common/client';
import style from '../common/style/home.css';
import commonStyle from '../common/style/index.css';

const {
  Content
} = Layout;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: [],
      province: [],
      city: []
    };

    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    client(api.getAllCountry)().then(country => {
      this.setState({
        country: country
      });
    });
  }

  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }

  onPageChange(pageNumber) {
    console.log(pageNumber);
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
        cityValue: ''
      });
    });
  };

  cityChange = cityId => {
    this.setState({
      cityValue: cityId,
    });

    const {
      countryValue,
      provinceValue
    } = this.state;

    client(api.getSchoolByCondition)({
      body: {
        school_name: 'fudan',
        country_id: countryValue,
        province_id: provinceValue,
        city_id: cityId,
      }
    }).then(res => {
      console.log(res);
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
      countryValue,
      provinceValue,
      cityValue,
    } = this.state;

    return (
      <ALayout title='搜索结果' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            <Card>
              <div><h3>搜索“刘强东”的结果</h3></div>
              <div>没有你想找的学习或教授？</div>
              <div>
                <a href="/professor/create">创建教授</a>或<a href="/school/create">创建学校</a>
              </div>
              <div style={{margin: '10px 0'}}><h2>每页将展示20条结果，共1200条</h2></div>
              <Pagination
                showSizeChanger
                showQuickJumper
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
                defaultCurrent={1}
                total={1200} />
              <div>结果可按照下列条件筛选</div>
              <div>
                <Select
                  style={{ width: 250 }}
                  placeholder="国家"
                  onSelect={this.countryChange}
                  value={countryValue}>
                  {
                    country.map(c => <Option key={c.country_id} value={c.country_id}>{c.country_name}</Option>)
                  }
                </Select>
                <Select
                  style={{ width: 250 }}
                  placeholder="洲/省"
                  onSelect={this.provinceChange}
                  value={provinceValue}>
                  {
                    province.map(p => <Option key={p.province_id} value={p.province_id}>{p.province_name}</Option>)
                  }
                </Select>
                <Select
                  style={{ width: 250 }}
                  placeholder="城市"
                  onSelect={this.cityChange}
                  value={cityValue}>
                  {
                    city.map(c => <Option key={c.city_id} value={c.city_id}>{c.city_name}</Option>)
                  }
                </Select>
              </div>
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default Search;