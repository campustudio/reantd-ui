import React, { Component } from 'react';
import { Table } from 'antd';
import { QaAndAdvice } from '@lib';

export default class QaAndAdviceDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      textAreaValue: '',
      finished1: false,
      finished2: false,
      finished3: true,
      finished4: false,
      finished5: true,
    };
    this.changeTextArea = this.changeTextArea.bind(this);
  }

  componentDidMount() {
    // async
    this.setState({
      items: [{
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        }, {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        }, {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
      }]
    });
  }

  changeTextArea(v) {
    this.setState({
      textAreaValue: v,
    });
  }

  render() {
    const {
      items,
      textAreaValue,
      finished1,
      finished2,
      finished3,
      finished4,
      finished5,
      endTime = '13: 00',
    } = this.state;

    return (
      <div>
        <QaAndAdvice
          title1="我是title1啊哈哈哈哈哈哈哈哈："
          title2="我是title2哇哇哇哇哇哈哈哈哈："
          items={items}
          textAreaValue={textAreaValue}
          changeTextArea={this.changeTextArea}
          columns={[{
            title: 'Name',
            dataIndex: 'name',
          }, {
            title: 'Age',
            dataIndex: 'age',
          }, {
            title: 'Address',
            dataIndex: 'address',
          }]}
        />
        <div>
          <div>今日报表数据生成进度哗啦啦啦：</div>
          <div>{finished1 ? '' : '预计'}数据生成完成时间哗啦啦啦：{finished1 ? endTime : '12: 00'}</div>
          <div>
            <span style={{ marginRight: 15 }}>
              汇总报表：<span style={{color: finished2 ? 'green' : 'red'}}>{finished2 ? '未完成' : '已完成'}</span>
            </span>
            <span style={{ marginRight: 15 }}>
              偏高/偏低明细：<span style={{color: finished3 ? 'green' : 'red'}}>{finished3 ? '未完成' : '已完成'}</span>
            </span>
            <span style={{ marginRight: 15 }}>
              波动明细：<span style={{color: finished4 ? 'green' : 'red'}}>{finished4 ? '未完成' : '已完成'}</span>
            </span>
            <span>
              趋势图：<span style={{color: finished5 ? 'green' : 'red'}}>{finished5 ? '未完成' : '已完成'}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
