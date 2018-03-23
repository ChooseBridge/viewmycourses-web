import React, { Component } from 'react';
import {
  AutoComplete
} from 'antd';
import adapter from './adapter';

const { OptGroup, Option } = AutoComplete;

export default class extends Component {
  render() {
    const { valueUseName, ...others } = this.props; // 默认使用 ID 作为 value，设置此参数则使用 name
    const data = adapter(this.props.dataSource);

    const options = data.map(group => (
      <OptGroup
        key={group.title}
        label={group.title}
      >
        {group.children.map(opt => (
          <Option
            key={opt.school_id}
            value={valueUseName ? opt.school_name : String(opt.school_id)}
            nickname={opt.school_nick_name}>
            {opt.school_name}
          </Option>
        ))}
      </OptGroup>
    ));

    return (
      <AutoComplete
        placeholder="请选择学校"
        {...others}
        onSelect={value => {
          if (others.onSelect) {
            let idx = -1;
            const country = data.find(country => country.children.find((school, i) => {
              const result = school.school_name === value;
              if (result) {
                idx = i;
              }
              return result;
            }));

            others.onSelect({
              value,
              name: country.children[idx].school_id
            });
          }
        }}
        dataSource={options}
        filterOption={(inputValue, option) => {
          const value = option.props.children.toUpperCase();
          const _v = inputValue.toUpperCase();
          const nickname = option.props.nickname.toUpperCase();

          return value.indexOf(_v) !== -1 || nickname.indexOf(_v) !== -1;
        }} />
    );
  }
}