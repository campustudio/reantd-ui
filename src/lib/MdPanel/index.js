import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import './index.less';

export default class MdPanel extends Component {
  render() {
    const { source = '' } = this.props;

    return (
      <div className="md-panel">
        <ReactMarkdown source={source} />
      </div>
    );
  }
}
