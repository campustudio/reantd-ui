import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { menuTree } from './menu.js';

const { SubMenu } = Menu;

class Sidebar extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = menuTree.map(e => e.key);

  state = {
    openKeys: ( // openKeys init mode-1: no path specified
      sessionStorage.getItem('latestOpenKey')
      && sessionStorage.getItem('currentItemIndex')
      && sessionStorage.getItem('currentItemIndex').length > 0
    ) ? [sessionStorage.getItem('latestOpenKey')] : [],

    // openKeys init mode-2: there's one dynamic path specified, need to calculate i2 and i1 based on the path.
  };

  componentDidMount() {
    this.syncSelectedItemStyle();
  }

  syncSelectedItemStyle = () => {
    const currentItemIndex = sessionStorage.getItem('currentItemIndex');
    if (currentItemIndex && currentItemIndex.length > 0) {
      const cuNode = document.getElementById(currentItemIndex);
      if (cuNode) {
        cuNode.setAttribute(
          'style',
          document.getElementById(currentItemIndex).getAttribute('style')
          + 'border-right:3px solid #ff5b0a;background-color:#fff2e6;color:#ff5b0a;'
        )
      }
    }
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    sessionStorage.setItem('latestOpenKey', latestOpenKey); // store 4 syncing opened key after refreshing page
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) { // seems false 4ever
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

  onItemClick = (i1, i2) => {
    // store 4 syncing style of current selected item after refreshing page
    sessionStorage.setItem('currentItemIndex', i1 + '-' + i2);
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
        {
          menuTree.map((mt, i1) => {
            return (
              <SubMenu key={mt.key} title={(<span>{mt.title}</span>)}>
                {
                  mt.items.map((mti, i2) => {
                    return (
                      <Menu.Item id={i1 + '-' + i2} onClick={() => this.onItemClick(i1, i2)} key={mti.key}>
                        {mti.title}
                      </Menu.Item>
                    )
                  })
                }
              </SubMenu>
            )
          })
        }
      </Menu>
    );
  }
}

export default withRouter(Sidebar);
