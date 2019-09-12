import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import Auth from '../auth';

interface Props {
    component:React.ComponentType
}
const  PrivateRoute:React.FC<Props & RouteProps>= ({ component: Component, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={props =>
          Auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute