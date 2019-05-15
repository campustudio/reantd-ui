import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class Sider extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

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
    this.props.history.push(e.key);
  }

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        onClick={this.onClick}
        style={{ width: 256 }}
      >
        <SubMenu
          key="sub1"
          title={(
            <span>
              <Icon type="upload" />
              <span>Upload</span>
            </span>
          )}
        >
          <Menu.Item key="/upload-image">image</Menu.Item>
          <Menu.Item key="/pictures-wall">pictures wall</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={(
            <span>
              <Icon type="block" />
              <span>Cascader</span>
            </span>
          )}
        >
          <Menu.Item key="/two-stage">two stage</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(Sider);
