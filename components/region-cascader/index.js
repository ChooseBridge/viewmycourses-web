import React, { Component } from 'react';
import { Cascader } from 'antd';
import api from '../../common/api';
import client from '../../common/client';

let cache = [];
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: cache
    };
  }

  componentDidMount() {
    if (cache.length) return;

    client(api.getAllCountry)().then(country => {
      const options = country.map(c => ({
        value: c.country_id,
        label: c.country_name,
        isLeaf: false
      }));

      this.setState({ options });
      cache = options;
    });
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    if (selectedOptions.length === 1) {
      const countryId = targetOption.value;

      client(api.getProvinceByCountry)({
        body: {
          country_id: countryId
        }
      }).then(province => {
        targetOption.loading = false;
        this.setState(prevState => {
          const options = prevState.options.map(country => {
            if (country.value === countryId) {
              country.children = province.map(p => ({
                label: p.province_name,
                value: p.province_id,
                isLeaf: false
              }));
            }

            return country;
          });

          cache = options;
          return { options };
        });
      });
    }
    else {
      const countryId = selectedOptions[0].value;
      const provinceId = targetOption.value;

      client(api.getCityByProvince)({
        body: {
          province_id: provinceId
        }
      }).then(city => {
        targetOption.loading = false;
        this.setState(prevState => {

          const options = prevState.options.map(country => {
            if (country.value === countryId) {
              country.children.map(p => {
                if (p.value === provinceId) {
                  p.children = city.map(c => ({
                    label: c.city_name,
                    value: c.city_id,
                    isLeaf: true
                  }));
                }

                return p;
              });
            }

            return country;
          });

          cache = options;

          return { options };
        });
      });

    }
  };

  render() {
    return (
      <Cascader
        {...this.props}
        options={this.state.options}
        loadData={this.loadData}
        changeOnSelect
      />
    );
  }
}