import React, { useEffect, useState } from 'react';
import { Heading } from 'rebass';

import api from '../../api';
import Auth from '../../auth';
import { T_Profile } from '../../types';

const Profile = () => {
  const [data, setData] = useState(undefined as T_Profile | undefined);
  useEffect(() => {
    let current = true;
    const load = async () => {
      const data = await api.user.profile(Auth.profileId);
      current && setData(data);
    };
    load();

    return () => {
      current = false;
    };
  }, []);

  if (!data) return null;

  return (
    <div>
      <Heading as="h2">my profile</Heading>
      <pre>
        {JSON.stringify(data,null,2)}
      </pre>
    </div>
  );
};

export default Profile;
