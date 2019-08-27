import React, { Component } from 'react';
import { PartTypesConfirmSync } from '@lib';
import { pd, rpt } from './mock';
import { mutatePartDetail } from './convertor';
import PartInfo from './PartInfo';

export default class PartTypesConfirmSyncDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partDetail: {},
      rawPartTypes: [],
    };
    this.checkedNum = 0;
  }

  componentDidMount() {
    this.setState({
      partDetail: mutatePartDetail(pd),
      rawPartTypes: rpt,
    });
  }

  onTypeToogle = (partIdx, typeIdx) => {
    console.log('partIdx: ', partIdx);
    console.log('typeIdx: ', typeIdx);
    const { partDetail } = this.state;
    const { partList = [] } = partDetail;

    if (Array.isArray(partList)) {
      partList[partIdx].partTypes[typeIdx].checked = !partList[partIdx].partTypes[typeIdx].checked;
      this.onOffDisabled(partList[partIdx].partTypes[typeIdx].checked, partList[partIdx].partTypes);
      this.setState(
        partList,
      );
    }
  }

  onCancelTypeToogle = (partIdx) => {
    console.log('onCancelTypeToogle partIdx: ', partIdx);
    const { partDetail } = this.state;
    const { partList = [] } = partDetail;

    if (Array.isArray(partList)) {
      const { partTypes = [] } = partList[partIdx];
      if (Array.isArray(partTypes)) {
        partTypes.forEach((type) => {
          type.checked = false;
          type.disabled = false;
        });
        this.checkedNum = 0;
        this.setState(
          partList,
        );
      }
    }
  }

  onOffDisabled = (tChecked, pt) => {
    if (tChecked) {
      this.checkedNum += 1;
    } else {
      this.checkedNum -= 1;
    }

    if (this.checkedNum === 3) {
      pt.forEach((p) => {
        if (!p.checked) {
          p.disabled = true;
        }
      });
    } else {
      pt.forEach((p) => {
        p.disabled = false;
      });
    }
  }

  render() {
    const { partDetail, rawPartTypes } = this.state;
    const { partList = [] } = partDetail;
    console.log('partDetail: ', partDetail);
    console.log('partList: ', partList);
    console.log('this.checkedNum: ', this.checkedNum);

    return (
      <div>
        {
          Array.isArray(partList) && partList.map((part, partIdx) => (
            <PartInfo
              key={partIdx}
              partIdx={partIdx}
              part={part || {}}
              onTypeToogle={this.onTypeToogle}
              onCancelTypeToogle={this.onCancelTypeToogle}
            />
          ))
        }
      </div>
    );
  }
}
