import React, { useEffect, useState } from 'react';
import { useField, useForm } from 'react-jeff';
import { Box, Button, Flex, Heading, Text } from 'rebass';

import api from '../api';
import { Control, JForm, JInput, validateUsername } from '../forms';
import { BorderBox } from '../primitives';
import Auth from '../stores/auth';
import { T_Device } from '../types';

const Device: React.FC<{ device: T_Device }> = ({ device }) => {
  let alias = useField({
    defaultValue: device.alias,
    required: true,
    validations: [validateUsername],
  });
  const onSubmit_ = async () => {
    const payload = {
      alias: alias.value,
    };
    if (form.valid) {
      await api.user.devices.update(Auth.profileId, device.deviceId, payload);
      window.location.reload();
    }
  };

  let form = useForm({
    fields: [alias],
    onSubmit: onSubmit_,
  });
  return (
    <BorderBox
      key={device.deviceId}
      sx={{
        display: 'inline-block',
        m: 2,
        p: 2,
        borderRadius: 5,
      }}
    >
      <Text>
        {device.description} / {device.alias}
      </Text>

      <JForm {...form.props}>
        <Flex mx={-2} mb={3}>
          <Box width={1 / 2} px={2}>
            <Control field={alias}>
              <JInput label="Alias" id="alias" {...alias.props} />
            </Control>
          </Box>
        </Flex>
        <Flex>
          <Box width={1 / 2} px={2}>
            <Button type="submit" disabled={!form.valid}>
              Update device
            </Button>
          </Box>
        </Flex>
      </JForm>

      <pre>{JSON.stringify(device, null, 2)}</pre>
    </BorderBox>
  );
};

const Devices = () => {
  const [data, setData] = useState([] as T_Device[]);
  useEffect(() => {
    let current = true;
    const load = async () => {
      const data = await api.user.devices.get();
      current && setData(data);
    };
    load();

    return () => {
      current = false;
    };
  }, []);

  if (!data) return null;

  return (
    <BorderBox>
      <Heading as="h2">my devices</Heading>
      {data.map(device => (
        <Device key={device.deviceId} device={device} />
      ))}
    </BorderBox>
  );
};

export default Devices;
