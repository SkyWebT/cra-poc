import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../api';
import Auth from '../auth';
import { T_Profile } from '../types';

const Content = () => {
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
      <div>my account</div>
      <pre>
        {JSON.stringify(data,null,2)}
      </pre>
      <Link to="/logout">Logout </Link>
    </div>
  );
};

export default Content;
