import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from 'rebass';

import api from '../../api';
import { T_Device } from '../../types';

const Devices = () => {
  const [data, setData] = useState([] as T_Device[]);
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
      {data.map(device => (
        <Box
          key={device.deviceId}
          sx={{
            display: 'inline-block',
            color: 'white',
            bg: 'primary',
            m:2,
            p:2,
            borderRadius: 5,
          }}
        >
          <Text>
            {device.description} / {device.alias}
          </Text>
          <pre>{JSON.stringify(device, null, 2)}</pre>
        </Box>
      ))}
    </div>
  );
};

export default Devices;
