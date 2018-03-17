import React from 'react';
import ALayout from '../../components/layout/index.js';
import { Layout, Menu, Breadcrumb } from 'antd';
import style from './style.css';

const { Content } = Layout;

class School extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
      console.log(this.props);
    }

    render() {
        const {
          url
        } = this.props;

        return (
            <ALayout title='学校创建页面' url={url}>
                <Content style={{ padding: '0 50px' }}>
                    <div>11111</div>
                </Content>
            </ALayout>
        );
    }
}

export default School;