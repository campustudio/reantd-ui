import React, { Component } from 'react';
import { AsyncDCInput } from '@lib';

const testUrl = '//jsonplaceholder.typicode.com/posts/';

export default class AsyncDCInputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cv: 10,
    };
  }

  onBlur = (cv) => {
    this.setState({
      cv,
      editable: false,
    });
  }

  render() {
    const { editable, cv } = this.state;

    return (
      <div>
        <AsyncDCInput
          onDoubleClick={() => this.setState({ editable: true })}
          onBlur={this.onBlur}
          editable={editable}
          cv={cv}
        />
      </div>
    );
  }
}
