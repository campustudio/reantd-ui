import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './app.less';
import { Sider } from './lib';
import {
  PicturesWallDemo,
  AsyncCascaderDemo,
  AsyncSelectorDemo,
  AsyncExtensibleCascaderDemo,
} from './demos';

const App = () => (
  <BrowserRouter basename="/ui">
    <div>
      <div className="left-panel" />
      <Sider />
      <div className="right-panel">
        <Switch>
          <Route exact path="/pictures-wall" component={PicturesWallDemo} />
          <Route exact path="/one-stage" component={AsyncExtensibleCascaderDemo} />
          <Route exact path="/two-stage" component={AsyncCascaderDemo} />
          <Route exact path="/async-selector" component={AsyncSelectorDemo} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
