import React, { Component } from 'react';
import { Table } from 'antd';
import { AccessRecord } from '@lib';

const testUrl = '//jsonplaceholder.typicode.com/posts/';

export default class AccessRecordDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      num1: 0,
      num2: 0,
    };
  }

  componentDidMount() {
    // async
    this.setState({
      num1: 12000,
      num2: 4500,
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
    })
  }

  render() {
    const {
      items,
      num1,
      num2,
    } = this.state;

    return (
      <div>
        <AccessRecord
          title1="我是title1啊哈哈哈哈哈哈哈哈："
          title2="我是title2哇哇哇哇哇哈哈哈哈："
          title3="我是title3呀呀呀呀呀呀呀呀呀ya"
          num1={num1}
          num2={num2}
          items={items}
          columns={[{
            title: 'Name',
            dataIndex: 'name',
          }, {
            title: 'Age',
            dataIndex: 'age',
          }]}
        />
      </div>
    );
  }
}
