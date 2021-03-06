import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Flex, Heading } from 'rebass';

import { Device } from '../comp/Device';
import { BorderBox } from '../primitives';
import deviceStore from '../stores/device';

const Devices: React.FC = () => {
  const devices = deviceStore.devices;
  useEffect(() => {
    deviceStore.fetch();
  }, []);

  if (!devices.length) return <Flex justifyContent="center">loading...</Flex>;

  return (
    <BorderBox>
      <Heading as="h2">my devices</Heading>
      {devices.map(device => (
        <Device key={device.deviceId} device={device} />
      ))}
    </BorderBox>
  );
};

export default observer(Devices);
