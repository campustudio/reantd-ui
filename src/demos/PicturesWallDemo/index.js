import React, { Component } from 'react';
import { PicturesWall, MdPanel } from '@lib';
import README from './README.md';

const jph = '//jsonplaceholder.typicode.com/posts/';

export default class PicturesWallDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      ],
      md: '',
    };
  }

  componentWillMount() {
    fetch(README)
      .then(res => res.text())
      .then((md) => {
        this.setState({ md });
      });
  }

  transformFiles2PureUrl = (files) => {
    let pureUrlArr = [];
    if (files && files instanceof Array) {
      pureUrlArr = files.map((ele) => {
        if (ele.url) {
          return ele.url || '';
        }
        if (ele.response && ele.response.url) { // dynamic
          return ele.response.url || '';
        }
        return '//mock.url';
      });
    }

    return pureUrlArr;
  }

  onFilesChange = (files) => {
    console.log('filtered files: ', files);
    this.setState({
      files
    });
  }

  render() {
    const { files, md } = this.state;
    console.log('Demo render files: ', files);

    return (
      <div>
        <PicturesWall
          action={jph}
          onFilesChange={this.onFilesChange}
          transformFiles2PureUrl={this.transformFiles2PureUrl}
          isMultiple
          files={files}
        />
        <MdPanel source={md} />
      </div>
    );
  }
}
