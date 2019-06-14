import React, { Component } from 'react';
import { AsyncExtensibleCascader } from '@lib';

const testUrl = '//jsonplaceholder.typicode.com/posts/';

export default class AsyncExtensibleCascaderDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    // const {  } = this.state;

    return (
      <div>
        <AsyncExtensibleCascader />
      </div>
    );
  }
}
