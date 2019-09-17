import React, { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Button, Heading } from 'rebass';

import { Input, Label } from '@rebass/forms';

import api from '../api';
import Auth from '../auth';

const Login: React.FC<RouteComponentProps> = ({ location }) => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [username, setName] = useState('arvtester@mailinator.com');
  const [password, setPwd] = useState('tester1');

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
      <Heading>Login</Heading>
      <form onSubmit={submit}>
        <div>
          <Label>username</Label>
          <Input
            name="username"
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>

        <div>
          <Label>password </Label>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPwd(e.target.value)
            }
          />
        </div>
        <div>
          <Button type="submit">login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
