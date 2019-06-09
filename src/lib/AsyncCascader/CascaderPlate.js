import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cascader } from 'antd';

export default class CascaderPlate extends Component {
  onChange = (value, selectedOptions) => {
    const { onCascaderChange } = this.props;
    onCascaderChange({
      value,
      selectedOptions,
    });
  }

  loadData = (selectedOptions) => {
    console.log('selectedOptions: ', selectedOptions);
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const { asyncLoad } = this.props;
    asyncLoad(targetOption);
  }

  render() {
    const {
      fieldNames,
      options,
      type,
      matchOption,
      value,
      style,
    } = this.props;
    console.log('render options: ', options);
    console.log('render value: ', value);

    const basicOptions = {
      options,
      notFoundContent: '暂无数据',
      placeholder: '请选择省市',
      onChange: this.onChange,
      loadData: this.loadData,
      changeOnSelect: true,
      fieldNames,
      allowClear: false,
      style,
    };

    let props = basicOptions;
    if (options && options instanceof Array) {
      if (options.length === 0) {
        props = {
          ...basicOptions,
          placeholder: '暂无数据',
        };
      } else if (matchOption) {
        props = {
          ...basicOptions,
          value,
        };
      } else if (type === 'edit') {
        props = {
          ...basicOptions,
          placeholder: '暂无匹配数据',
        };
      }
    } else {
      props = {
        ...basicOptions,
        placeholder: '暂无数据',
      };
    }

    return (
      <Cascader
        {...props}
      />
    );
  }
}

CascaderPlate.propTypes = {
  fieldNames: PropTypes.object.isRequired,
  options: PropTypes.array,
  onCascaderChange: PropTypes.func,
  asyncLoad: PropTypes.func,
  type: PropTypes.string,
  matchOption: PropTypes.object,
  value: PropTypes.array,
  style: PropTypes.object,
};

CascaderPlate.defaultProps = {
  options: undefined,
  onCascaderChange: () => {},
  asyncLoad: () => {},
  type: 'add',
  matchOption: null,
  value: [],
  style: { width: 300 }
};
