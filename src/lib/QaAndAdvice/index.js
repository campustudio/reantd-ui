import React, { Component } from 'react';
import { Table, Input, message } from 'antd';

const { TextArea } = Input;

export default class QaAndAdvice extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.changeTextArea = this.changeTextArea.bind(this);
  }

  changeTextArea(e) {
    const value = e.target.value;
    const {
      inputLimitedNum = 500,
      changeTextArea = () => {},
    } = this.props;

    if (value.length <= 500) {
      changeTextArea(value);
    } else {
      message.warning('最多输入 ' + inputLimitedNum + ' 字');
    }
  }

  render() {
    const {
      title1 = 'Title1',
      title2 = '次数次数次数：',
      items = [],
      width = 600,
      columns = [{
        title: 'title1',
        dataIndex: 'dataIndex1',
      }, {
        title: 'title2',
        dataIndex: 'dataIndex2',
      }, {
        title: 'title3',
        dataIndex: 'dataIndex3',
      }],
      inputLimitedNum = 500,
      textAreaValue = '',
    } = this.props;

    return (
      <div style={{ width }}>
        <div>{title1}</div>
        <hr />
        <Table columns={columns} dataSource={items} pagination={false} size="small" />
        <div style={{ marginTop: 50 }}>{title2}</div>
        <hr />
        <TextArea value={textAreaValue} rows={4} onChange={this.changeTextArea} />
        <span style={{ fontSize: 12 }}>备注：最多输入{inputLimitedNum}字</span>
      </div>
    );
  }
}
