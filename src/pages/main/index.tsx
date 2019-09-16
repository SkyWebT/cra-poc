import React from 'react';
import { Link } from 'react-router-dom';
import { Heading } from 'rebass';

import Devices from './Devices';
import Subscriptions from './Occurrences';
import Profile from './Profile';

const Index = () => {
  return (
    <div>
      <Heading as="h1">my account</Heading>
      <Profile />
      <Devices />
      <Subscriptions />
      <Link to="/logout">Logout </Link>
    </div>
  );
};

export default Index;
