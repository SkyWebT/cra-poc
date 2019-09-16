import React, { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import api from '../api';
import Auth from '../auth';

const Login: React.FC<RouteComponentProps> = ({ location }) => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [username, setName] = useState('dan_sit@skytv.co.nz');
  const [password, setPwd] = useState('test@123');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await api.auth.login({ username, password });
    if ((data.status = '200')) {
      Auth.token = data.sessiontoken;
      Auth.profileId = data.profileId;
      setRedirectToReferrer(true);
    }
  };

  let { from } = location.state || { from: { pathname: '/' } };
  if (redirectToReferrer) return <Redirect to={from} />;

  return (
    <div>
      Login
      <form onSubmit={submit}>
        <div>
          <label>username</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label>password </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={e => setPwd(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
