
import React from 'react';
import { Route, Router } from 'react-router-dom';

import PrivateRoute from './comp/PrivateRoute';
import history from './history';
import Content from './pages/Content';
import Login from './pages/Login';
import Logout from './pages/Logout';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Router history={history}>
          <PrivateRoute path="/" exact component={Content} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Router>
      </header>
    </div>
  );
};

export default App;
