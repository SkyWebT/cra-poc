import React from 'react';
import { Route, Router } from 'react-router-dom';

import PrivateRoute from './comp/PrivateRoute';
import history from './history';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Main from './pages/main';
import { Container } from './primitives';

const App: React.FC = () => {
  return (
    <Container>
      <Router history={history}>
        <PrivateRoute path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Router>
    </Container>
  );
};

export default App;
