import React, { Component } from 'react';
import { Button, Popover } from 'antd';
import SocialShare from './social-share';

export default class extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Popover placement="bottomLeft" content={<SocialShare />} title="分享到社区">
        <Button type="primary" style={{ backgroundColor: '#737373', border: 'none' }}>分享</Button>
      </Popover>
    );
  }
}