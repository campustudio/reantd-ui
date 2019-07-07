import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

export default class AsyncDCInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.cv,
    };
  }

  onDoubleClick = () => {
    const { onDoubleClick } = this.props;
    onDoubleClick();
  }

  onBlur = () => {
    const { inputValue } = this.state;
    const { onBlur } = this.props;
    onBlur(inputValue);
  }

  render() {
    const { inputValue } = this.state;
    const { editable = false, cv = 0 } = this.props;

    return (
      <div>
        {
          editable
            ? (
              <InputNumber
                onChange={val => this.setState({ inputValue: val })}
                type="number"
                value={inputValue}
                autoFocus
                onBlur={this.onBlur}
              />
            ) : (
              <span onDoubleClick={this.onDoubleClick}>{cv}</span>
            )
        }
      </div>
    );
  }
}

AsyncDCInput.propTypes = {
  editable: PropTypes.bool,
  cv: PropTypes.number,
  onDoubleClick: PropTypes.func,
  onBlur: PropTypes.func,
};

AsyncDCInput.defaultProps = {
  editable: false,
  cv: 0,
  onDoubleClick: () => {},
  onBlur: () => {},
};
