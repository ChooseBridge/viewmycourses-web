import React from 'react';
import ALayout from '../components/layout/index.js';
import { Layout, Card, Breadcrumb } from 'antd';
import commonStyle from '../common/style/index.css';

const { Content } = Layout;

class Copyright extends React.Component {

  render() {
    const {
      url
    } = this.props;

    return (
      <ALayout title='隐私政策' url={url}>
        <Content className={commonStyle.container}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <Card>
            <h1>版权声明</h1>
            <p>本网站使用了两个网站上的免费素材，根据其网站要求，我们在此声明素材版权，并对作者和平台表示感谢。</p>
            <ul>
              <li>Background vector created by <a href="https://www.freepik.com/free-photos-vectors/background">Rocketpixel - Freepik.com</a></li>
              <li>Background vector created by <a href="https://www.freepik.com/free-photos-vectors/background"> Sketchepedia - Freepik.com</a></li>
              <li>Icon made by Smashicons from <a href="http://www.flaticon.com">www.flaticon.com</a></li>
              <li>Icon made by Freepik from <a href="www.flaticon.com">www.flaticon.com</a></li>
            </ul>
            <p>关于本网站知识产权保护政策的更多信息，请参见<a href="/terms">用户使用协议</a>。</p>

          </Card>
        </Content>
      </ALayout>
    );
  }
}

export default Copyright;