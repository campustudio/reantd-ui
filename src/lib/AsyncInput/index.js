import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, message } from 'antd';

export default class AsyncInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  onChange = (e) => {
    const { value = '' } = e.target;
    console.log('value: ', value);
    console.log('typeof value: ', typeof value);
    const { onChange = () => {} } = this.props;
    onChange(value);
  }

  render() {
    const { disabled } = this.state;
    const { value } = this.props;

    return (
      <div>
        <Input
          onChange={this.onChange}
          value={value}
          disabled={disabled}
          size="small"
          style={{ width: 150 }}
        />
      </div>
    );
  }
}

AsyncInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

AsyncInput.defaultProps = {
  value: '',
  onChange: () => {},
};
