import React, { Component } from 'react';

export default class PartInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onTypeToogle = (partIdx, typeIdx) => {
    const { onTypeToogle = () => {} } = this.props;
    onTypeToogle(partIdx, typeIdx);
  }

  onCancelTypeToogle = (partIdx) => {
    const { onCancelTypeToogle = () => {} } = this.props;
    onCancelTypeToogle(partIdx);
  }

  render() {
    const { partIdx, part = {} } = this.props;
    const { partTypes = [] } = part;

    return (
      <div>
        {
            Array.isArray(partTypes) && partTypes.map((type, typeIdx) => {
              const { id, checked, disabled } = type;
              console.log('checked: ', checked);
              return (
                <div>
                  <span>{id}</span>
                  <input key={typeIdx} type="checkbox" id="bike" value="Bike" />
                </div>
              );
            })
          }
        <button type="button" onClick={() => this.onCancelTypeToogle(partIdx)}>
          取消
        </button>
      </div>
    );
  }
}
