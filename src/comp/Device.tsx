import React from 'react';
import { useField, useForm } from 'react-jeff';
import { Box, Button, Flex, Text } from 'rebass';

import { Control, JForm, JInput, validateUsername } from '../forms';
import { BorderBox } from '../primitives';
import DeviceStore from '../stores/device';
import { T_Device } from '../types';

export const Device: React.FC<{
  device: T_Device;
}> = ({ device }) => {
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
      DeviceStore.update(device.deviceId, payload);
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
