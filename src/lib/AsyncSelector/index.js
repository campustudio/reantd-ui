import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, message } from 'antd';

const { Option } = Select;
const testUrl = '//jsonplaceholder.typicode.com/posts/';

export default class AsyncSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      disabled: false,
    };
  }

  componentDidMount() {
    const { value, disabledIfDefaultValue } = this.props;
    if (value && disabledIfDefaultValue) {
      this.setState({
        disabled: true
      });
    }
    this.getOptions();
  }

  getOptions = async () => {
    try {
      const { optionsUrl, optionsKey } = this.props;
      if (optionsUrl && optionsKey) {
        const apiRes = await fetch(optionsUrl);
        const apiObj = await apiRes.json() || {};
        console.log('apiObj1: ', apiObj);
        const apiOptions = apiObj[optionsKey] || [];
        // may need to transfer apiOptions depends on api res data
        this.setState({
          options: apiOptions,
        });
        return apiOptions;
      }

      const apiRes = await fetch(testUrl);
      const apiObj = await apiRes.json() || {};
      const apiObjModel = apiObj.map(ele => ({ label: ele.id, value: ele.id }));
      this.setState({
        options: apiObjModel,
      });
      return apiObjModel;
    } catch (err) {
      message.error(err.toString());
      return [];
    }
  }

  onChange = (value) => {
    console.log('value: ', value);
    console.log('typeof value: ', typeof value);
    const { onChange = () => {} } = this.props;
    onChange(value);
  }

  render() {
    const { options, disabled } = this.state;
    const { value } = this.props;

    return (
      <div>
        <Select
          value={value}
          onChange={this.onChange}
          size="small"
          placeholder="请选择"
          style={{ width: 150 }}
          disabled={disabled}
        >
          {
            options.map((ele, idx) => <Option value={ele.value} key={idx}>{ele.label}</Option>)
          }
        </Select>
      </div>
    );
  }
}

AsyncSelector.propTypes = {
  value: PropTypes.node,
  optionsUrl: PropTypes.string,
  optionsKey: PropTypes.string,
  onChange: PropTypes.func,
};

AsyncSelector.defaultProps = {
  value: undefined,
  optionsUrl: '',
  optionsKey: '',
  onChange: () => {},
};
