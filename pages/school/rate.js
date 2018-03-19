import React from 'react';
import ALayout from '../../components/layout/index.js';
import {
  Layout,
  Breadcrumb,
  Button,
  Icon,
  Avatar,
  Row,
  Col,
  Tag,
  Select,
  Card,
} from 'antd';
import cla from 'classnames';
import style from './common.css';
import commonStyle from '../../common/style/index.css';

const {
  Content
} = Layout;

const Option = Select.Option;

class SchoolRate extends React.Component {
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
      <ALayout title='学校点评页' url={url}>
        <Content style={{ padding: '0 160px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={style.bgWrap}>
            <Card className={style.wrap}>
              <div>评价高校</div>
              <h2>复旦大学</h2>
              <div>中国上海杨浦区</div>
            </Card>

            <Card>
              <div>评价高校</div>
              <h2>复旦大学</h2>
              <div>中国上海杨浦区</div>
            </Card>
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default SchoolRate;