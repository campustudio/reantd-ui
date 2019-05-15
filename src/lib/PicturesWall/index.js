import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Upload, Icon, Modal, message,
} from 'antd';

let uid = -1; // 设置负数防止与 antd 内部的重合
function genImgUid() {
  uid--;
  return uid;
}

function transformPureUrl2Files(images = []) {
  return images.map(x => ({
    status: 'done',
    uid: genImgUid(),
    url: x,
  }));
}

export default class PicturesWall extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    onFilesChange: PropTypes.func.isRequired,
    transformFiles2PureUrl: PropTypes.func.isRequired,
    files: PropTypes.array,
    validType: PropTypes.string,
    limitSize: PropTypes.number,
    isMultiple: PropTypes.bool,
    outerProps: PropTypes.object,
  }

  static defaultProps = {
    files: [],
    validType: 'image/png,image/jpg,image/jpeg',
    limitSize: 10,
    isMultiple: false,
    outerProps: {},
  }

  state = {
    fileList: [],
    previewVisible: false,
    previewImage: '',
  }

  componentDidMount() {
    const { files } = this.props;
    if (files && files instanceof Array && files.length > 0) {
      const objFiles = transformPureUrl2Files(files);
      this.setState({
        fileList: objFiles,
      });
    }
  }

  beforeUploadImage = (file) => {
    const { limitSize } = this.props;

    return new Promise((success, fail) => {
      const isValidSize = file.size < limitSize * 1024 * 1024;

      if (!isValidSize) {
        message.warning(`图片应小于${limitSize}M，请重新点击上传`);
        fail(file);
      }

      success(file);
    });
  }

  handleFileListChange = ({ fileList }) => {
    const files = fileList.filter((ele) => {
      if (ele.status === 'error') {
        message.error(`上传图片 ${ele.name} 失败，请重试`);
      }
      return ele.status !== 'error';
    });

    this.setState({
      fileList: files,
    });

    const { transformFiles2PureUrl } = this.props;
    let pureUrlArr = [];
    if (transformFiles2PureUrl) {
      pureUrlArr = transformFiles2PureUrl(files);
    }

    const { onFilesChange } = this.props;
    if (onFilesChange) {
      onFilesChange(pureUrlArr);
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    console.log('PicturesWall render fileList: ', fileList);
    const {
      action, validType, isMultiple, outerProps,
    } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );

    const props = {
      action,
      fileList,
      accept: validType,
      multiple: isMultiple,
      listType: 'picture-card',
      onPreview: this.handlePreview,
      onChange: this.handleFileListChange,
      beforeUpload: this.beforeUploadImage,
      ...outerProps,
    };

    return (
      <Fragment>
        <Upload
          {...props}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} onCancel={this.handleCancel}>
          <img alt="ima" src={previewImage} />
        </Modal>
      </Fragment>
    );
  }
}
