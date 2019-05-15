
##### Coded based on Antd PicturesWall component
------------
## Using Demo
```js
import React, { Component } from 'react';
import PicturesWall from 'ui-components/src/lib/PicturesWall';

const testUrl = '//jsonplaceholder.typicode.com/posts/';

const jph = testUrl;

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      ],
    };
  }

  // transform the complicated antd uploaded files array structure to pure url string array
  transformFiles2PureUrl = (files) => {
    let pureUrlArr = [];
    if (files && files instanceof Array) {
      pureUrlArr = files.map((ele) => {
        if (ele.url) {
          return ele.url || '';
        }
        // this logic depends on the response structure of your upload api
        // this logic is dynamic on your demand, not fixed
        if (ele.response && ele.response.url) {
          return ele.response.url || '';
        }
        return '//mock.url';
      });
    }

    return pureUrlArr;
  }

  onFilesChange = (files) => {
    this.setState({
      files
    });
  }

  render() {
    const { files } = this.state;
    console.log('render files: ', files);

    return (
      <div>
        <PicturesWall
          action={jph}
          onFilesChange={this.onFilesChange}
          transformFiles2PureUrl={this.transformFiles2PureUrl}
          isMultiple
          files={files}
        />
      </div>
    );
  }
}
```

## API
```js
  static propTypes = {
    action: PropTypes.string.isRequired, // backend upload api
    onFilesChange: PropTypes.func.isRequired, // upload change event
    transformFiles2PureUrl: PropTypes.func.isRequired, // transform current files array to pure urls array
    files: PropTypes.array, // current files
    validType: PropTypes.string, // valid image type
    limitSize: PropTypes.number, // limit size for uploaded image
    isMultiple: PropTypes.bool, // support multiple selection or not
    outerProps: PropTypes.object, // other outer props obj, such as aliyun OSS params
  }

  static defaultProps = {
    files: [],
    validType: 'image/png,image/jpg,image/jpeg',
    limitSize: 10,
    isMultiple: false,
    outerProps: {},
  }
```
## Author
Chris Du