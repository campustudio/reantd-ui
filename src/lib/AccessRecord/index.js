import React, { Component } from 'react';
import { Table } from 'antd';

export default class AccessRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      title1 = '人数人数人数：',
      num1 = 200,
      title2 = '次数次数次数：',
      num2 = 2000,
      title3 = '累计访问次数前10同学名单',
      items = [],
      width = 300,
      columns = [{
        title: 'title1',
        dataIndex: 'dataIndex1',
      }, {
        title: 'title2',
        dataIndex: 'dataIndex2',
      }],
    } = this.props;

    return (
      <div style={{ width }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}
        >
          <div>{title1}{num1}</div>
          <div>{title2}{num2}</div>
        </div>
        <div style={{ textAlign: 'center', fontWeight: 700, marginBottom: 8 }}>{title3}</div>
        <Table columns={columns} dataSource={items} pagination={false} size="small" />
      </div>
    );
  }
}
