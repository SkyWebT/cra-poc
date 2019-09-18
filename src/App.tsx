import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Box } from 'rebass';

import PrivateRoute from './comp/PrivateRoute';
import history from './history';
import Header from './layout/Header';
import Nav from './layout/Nav';
import Devices from './pages/Devices';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Occurrences from './pages/Occurrences';
import Profile from './pages/Profile';
import { Container } from './primitives';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Header />
      <Container>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route
            path="/"
            render={() => (
              <Box>
                <Nav />
                <PrivateRoute path="/" exact component={Profile} />
                <PrivateRoute path="/devices" exact component={Devices} />
                <PrivateRoute
                  path="/occurences"
                  exact
                  component={Occurrences}
                />
              </Box>
            )}
          />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
