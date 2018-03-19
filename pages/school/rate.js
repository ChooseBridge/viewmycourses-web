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
import style from './home.css';
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

  }

  render() {
    const {
      url
    } = this.props;

    return (
      <ALayout title='学校点评页' url={url}>
        <Content style={{ padding: '0 160px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div className={commonStyle.bgWrap}>
            111
          </div>
        </Content>
      </ALayout>
    );
  }
}

export default SchoolRate;