import { Select, Spin } from 'antd';
import debounce from 'debounce';
import api from '../../common/api';
import client from '../../common/client';

const { Option, OptGroup } = Select.Option;
export default class UserRemoteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchData = debounce(this.fetchData, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false
  };

  fetchData = (value) => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });

    Promise.all([
      client(api.getSchoolByCondition)({ query: { school_name: value } }),
      client(api.getProfessorByCondition)({ query: { professor_name: value } })
    ]).then(([school, professor]) => {
      if (fetchId !== this.lastFetchId) { // for fetch callback order
        return;
      }

      const data = [{
        title: '学校',
        children: school.schools.map(s => ({ name: s.school_name, value: s.school_id }))
      }, {
        title: '教授',
        children: professor.professors.map(p => ({ name: p.professor_full_name, value: s.professor_id }))
      }];

      this.setState({ data, fetching: false });
    });
  };
  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    console.log(data);
    return (
      <Select
        mode="multiple"
        labelInValue
        value={value}
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchData}
        onChange={this.handleChange}
        style={{ width: '100%' }} >
        {data.map(d => <OptGroup
            key={d.title}
            label={d.title}>
            {d.children.map(i => <Option
              key={i.value}
              value={i.value}>{i.name}
            </Option>)}
          </OptGroup>
        )}
      </Select>
    );
  }
}