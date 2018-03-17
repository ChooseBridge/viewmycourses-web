import React from 'react';
import ALayout from '../components/layout/index.js';
import { Layout, Menu, Breadcrumb } from 'antd';
import style from './style.css';
import commonStyle from '../common/style/index.css';


const { Header, Footer, Content } = Layout;

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
      // console.log(this.props)
    }

    render() {
        const {
          url
        } = this.props;

        return (
            <ALayout title='首页' url={url}>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                      看我在这修改了内容诶！
                    </div>
                  </Content>
            </ALayout>
        );
    }
}

export default Index;