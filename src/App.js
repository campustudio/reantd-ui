import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './app.less';
import { Sider } from './lib';
import { PicturesWallDemo } from './demos';

const App = () => (
  <BrowserRouter basename="/ui">
    <div>
      <div className="left-panel" />
      <Sider />
      <div className="right-panel">
        <Switch>
          <Route exact path="/pictures-wall" component={PicturesWallDemo} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
