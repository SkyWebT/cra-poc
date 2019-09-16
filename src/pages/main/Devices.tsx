import React, { useEffect, useState } from 'react';
import { Heading } from 'rebass';

import api from '../../api';
import { T_Device } from '../../types';

const Devices = () => {
  const [data, setData] = useState([] as T_Device []);
  useEffect(() => {
    let current = true;
    const load = async () => {
      const data = await api.user.devices();
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
      <Heading as="h2">my devices</Heading>
      <pre>
        {JSON.stringify(data,null,2)}
      </pre>
    </div>
  );
};

export default Devices;
