import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import CascaderPlate from './CascaderPlate';

const testUrl = '//jsonplaceholder.typicode.com/posts/';

export default class AsyncCascader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalVal: [],
    };
    this.targetOption = null;
  }

  componentDidMount = async () => {
    const { type, fieldNames = {}, currentValue = [] } = this.props;
    const { value = 'value' } = fieldNames;
    const resOptions = await this.getOptions();
    console.log('resOptions: ', resOptions);

    if (type === 'edit') {
      this.setState({
        finalVal: currentValue || [],
      });
      resOptions.forEach((ele) => {
        if (ele[value] === currentValue[0]) {
          this.targetOption = ele;
        }
      });
      if (this.targetOption) {
        this.targetOption = await this.addChildren(this.targetOption);
      } else {
        this.onCascaderChange({
          value: [],
          selectedOptions: [],
        });
      }
      console.log('AsyncCascader type is edit => this.targetOption: ', this.targetOption);
    } else {
      console.log('AsyncCascader type is not edit => this.targetOption: ', this.targetOption);
    }

    this.setState({
      options: resOptions || [],
    });
  }

  getOptions = async () => {
    try {
      const { optionsUrl, optionsKey } = this.props;
      const apiRes = await fetch(optionsUrl);
      const apiObj = await apiRes.json() || {};
      console.log('apiObj: ', apiObj);
      const apiOptions = (optionsKey ? apiObj[optionsKey] : apiObj) || [];
      const resOptions = apiOptions.map(ele => ({ ...ele, isLeaf: false }));
      return resOptions;
    } catch (err) {
      message.error(err.toString());
      return [];
    }
  }

  getChildren = async (tarOpt) => {
    console.log('tarOpt: ', tarOpt);
    const {
      fieldNames,
      childrenUrl,
      childrenKey,
      childrenReqParamKey,
    } = this.props;
    const { value = 'value' } = fieldNames;

    try {
      const apiRes = await fetch(childrenUrl, childrenReqParamKey ? {
        method: 'POST',
        body: JSON.stringify({
          [childrenReqParamKey]: tarOpt[value] || '',
        }),
      } : {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      });
      const apiObj = await apiRes.json() || [];
      const apiChildren = (childrenKey ? apiObj[childrenKey] : apiObj) || [];
      return apiChildren.map(ele => ({ ...ele, isLeaf: true }));
    } catch (err) {
      message.error(err.toString());
      return [];
    }
  }

  onCascaderChange = ({ value, selectedOptions }) => {
    const { onCascaderChange } = this.props;
    onCascaderChange({
      value,
      selectedOptions,
    });
    this.setState({
      finalVal: value,
    });
  }

  asyncLoad = async (tarOpt) => {
    const { options } = this.state;
    tarOpt = await this.addChildren(tarOpt);
    this.setState({
      options
    });
  }

  addChildren = async (tarOpt) => {
    tarOpt.loading = true;
    const resChildren = await this.getChildren(tarOpt);
    tarOpt.loading = false;
    tarOpt.children = resChildren || [];

    return tarOpt;
  }

  render() {
    const { fieldNames, type } = this.props;
    const { options, finalVal } = this.state;

    return (
      <div>
        <CascaderPlate
          fieldNames={fieldNames}
          options={options}
          onCascaderChange={this.onCascaderChange}
          asyncLoad={this.asyncLoad}
          type={type}
          // matchOption={this.targetOption}
          value={finalVal}
        />
      </div>
    );
  }
}

AsyncCascader.propTypes = {
  fieldNames: PropTypes.object.isRequired,
  optionsKey: PropTypes.string,
  childrenKey: PropTypes.string,
  childrenReqParamKey: PropTypes.string,
  optionsUrl: PropTypes.string,
  onCascaderChange: PropTypes.func,
  childrenUrl: PropTypes.string,
  type: PropTypes.string,
};

AsyncCascader.defaultProps = {
  optionsUrl: testUrl,
  onCascaderChange: () => {},
  childrenUrl: testUrl,
  type: 'add',
  optionsKey: '',
  childrenKey: '',
  childrenReqParamKey: '',
};
