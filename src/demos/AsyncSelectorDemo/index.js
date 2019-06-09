import React, { Component } from 'react';
import { AsyncSelector, AsyncInput } from '@lib';

const testUrl = '//jsonplaceholder.typicode.com/posts/';

export default class AsyncSelectorDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      presetLoaded: false,
    };
  }

  componentDidMount() {
    this.getPreset();
  }

  getPreset = async () => {
    const apiRes = await fetch(testUrl);
    this.setState({
      value: 99,
      inputValue: '阿斯顿马丁',
      // inputValue: '',
      presetLoaded: true,
    });
  }

  onSelectorChange = (value) => {
    console.log('onSelectorChange value: ', value);
    this.setState({
      value,
    });
  }

  onInputChange = (inputValue) => {
    console.log('onInputChange inputValue: ', inputValue);
    this.setState({
      inputValue,
    });
  }

  render() {
    const { value, presetLoaded, inputValue } = this.state;

    return (
      <div>
        {
          presetLoaded
            && (
              <div>
                <AsyncSelector
                  onChange={this.onSelectorChange}
                  value={value}
                  disabledIfDefaultValue
                />
                <AsyncInput
                  onChange={this.onInputChange}
                  value={inputValue}
                  disabledIfDefaultValue
                />
              </div>
            )
        }
      </div>
    );
  }
}
