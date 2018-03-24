import { AutoComplete, Select } from 'antd';
import debounce from 'debounce';
import api from '../../common/api';
import client from '../../common/client';

const { Option, OptGroup } = Select;

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
    if (this.props.onChange) {
      this.props.onChange(value);
    }
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
        children: school.schools.map(s => ({ title: s.school_name, value: s.school_id }))
      }, {
        title: '教授',
        children: professor.professors.map(p => ({ title: p.professor_full_name, value: p.professor_id }))
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

    return (
      <AutoComplete
        {...this.props}
        onChange={this.fetchData}>
        {
          data.map(group => (
            <OptGroup
              key={group.title}
              label={group.title}>
              {group.children.map(item => (
                <option
                  key={item.value}
                  value={String(item.title)}>
                  {item.title}
                </option>
              ))}
            </OptGroup>
          ))
        }
      </AutoComplete>
    );
  }
}