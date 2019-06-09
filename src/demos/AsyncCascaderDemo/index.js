import React, { Component } from 'react';
import { AsyncCascader } from '@lib';

const optionsUrl = '//jsonplaceholder.typicode.com/posts/';
const childrenUrl = '//jsonplaceholder.typicode.com/posts/';

export default class AsyncCascaderDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <AsyncCascader
          fieldNames={{ label: 'id', value: 'id' }}
          optionsUrl={optionsUrl}
          childrenUrl={childrenUrl}
          currentValue={[4, 2]}
          onCascaderChange={this.onCascaderChange}
          type="edit"
        />
      </div>
    );
  }
}
