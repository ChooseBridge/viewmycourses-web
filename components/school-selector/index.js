import React, { Component } from 'react';
import {
  AutoComplete,
  Select
} from 'antd';
import adapter from './adapter';

const { OptGroup, Option } = AutoComplete;

export default class extends Component {
  render() {
    const options = adapter(this.props.dataSource).map(group => (
      <OptGroup
        key={group.title}
        label={group.title}
      >
        {group.children.map(opt => (
          <Option key={opt.school_id} value={String(opt.school_id)} nickname={opt.school_nick_name}>
            {opt.school_name}
          </Option>
        ))}
      </OptGroup>
    ));

    return (
      <Select
        placeholder="请选择学校"
        {...this.props} >
        {options}
      </Select>

    // return (
    //   <AutoComplete
    //     placeholder="请选择学校"
    //     {...this.props}
    //     dataSource={options}
    //     filterOption={(inputValue, option) => {
    //       const value = option.props.children.toUpperCase();
    //       const _v = inputValue.toUpperCase();
    //       const nickname = option.props.nickname.toUpperCase();
    //
    //       return value.indexOf(_v) !== -1 || nickname.indexOf(_v) !== -1
    //     }} />
    );
  }
}