import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message, Cascader, Spin } from 'antd';

const testUrl = '//jsonplaceholder.typicode.com/posts/';

export default class AsyncExtensibleCascader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      optionsLoading: false,
    };
  }

  componentDidMount() {
    this.getOptions();
  }

  getOptions = async () => {
    try {
      this.setState({ optionsLoading: true });
      const optionsRes = await fetch(testUrl);

      this.setState({
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            isLeaf: false,
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            isLeaf: false,
          },
        ],
        optionsLoading: false,
      });
    } catch (err) {
      message.error(err.toString());
    }
  }

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  loadData = (selectedOptions) => {
    const { options } = this.state;
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      this.setState({
        options: [...options],
      });
    }, 1000);
  };

  render() {
    const {
      placeholder,
      style,
      width,
    } = this.props;

    const {
      options,
      optionsLoading,
    } = this.state;

    return (
      <div style={{ width }}>
        <Spin spinning={optionsLoading}>
          <Cascader
            options={options}
            loadData={this.loadData}
            onChange={this.onChange}
            changeOnSelect
            placeholder={placeholder}
            style={{
              ...style,
              width,
            }}
          />
        </Spin>
      </div>
    );
  }
}

AsyncExtensibleCascader.propTypes = {
  placeholder: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number,
};

AsyncExtensibleCascader.defaultProps = {
  placeholder: '请选择',
  style: {},
  width: 150,
};
