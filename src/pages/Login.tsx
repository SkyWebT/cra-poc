import React, { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import api from '../api';
import Auth from '../auth';

const Login: React.FC<RouteComponentProps> = ({ location }) => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await api.auth.login({ name, pwd });
    if ((data.code = 'ok')) {
      Auth.token = data.token;
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
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label>password </label>
          <input
            name="password"
            type="password"
            value={pwd}
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
