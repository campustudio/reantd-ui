import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';

const { SubMenu } = Menu;

class Sidebar extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  onClick = (e) => {
    const { history = {} } = this.props;
    history.push(e.key);
  }

  render() {
    const { openKeys } = this.state;

    return (
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={this.onOpenChange}
        onClick={this.onClick}
        style={{ width: 256 }}
      >
        <SubMenu key="sub1" title={(<span>Upload</span>)}>
          <Menu.Item key="/upload-image">image</Menu.Item>
          <Menu.Item key="/pictures-wall">pictures wall v1.0.0</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={(<span>Cascader</span>)}>
          <Menu.Item key="/one-stage">one stage</Menu.Item>
          <Menu.Item key="/two-stage">two stage v1.0.0</Menu.Item>
          <Menu.Item key="/async-selector">async selector</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={(<span>Input</span>)}>
          <Menu.Item key="/dc-input">async double click v1.0.0</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={(<span>Toogle</span>)}>
          <Menu.Item key="/pts-confirm-sync">PartTypesConfirmSync</Menu.Item>
          <Menu.Item key="/pts-on-change-sync">PartTypesOnChangeSync</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(Sidebar);
