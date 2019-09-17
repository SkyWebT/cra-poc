import React, { useEffect, useState } from 'react';
import { useField, useForm } from 'react-jeff';
import { Box, Button, Flex, Heading } from 'rebass';

import api from '../../api';
import Auth from '../../auth';
import {
    Control, JCheckBox, JForm, JInput, JSelect, validateUsername
} from '../../forms';
import { BorderBox } from '../../primitives';
import { T_Profile } from '../../types';

const AdultContentMapping = [
  { level: '2', rating: 'G', description: 'General Showing' },
  { level: '4', rating: 'PG', description: 'Parental Guidance' },
  { level: '6', rating: 'M', description: 'Mature' },
  { level: '8', rating: '16', description: '16' },
  { level: '10', rating: '18', description: '18' },
  { level: '12', rating: '18+', description: '18+' },
  { level: '13', rating: 'R20', description: 'R20' },
  { level: '14', rating: 'R20+', description: 'R20+' },
];

const ProfileForm: React.FC<{
  profile: T_Profile;
  onSubmit: (p: any) => void;
}> = ({ profile, onSubmit }) => {
  let firstName = useField({
    defaultValue: profile.firstName,
    required: true,
    validations: [validateUsername],
  });
  let lastName = useField({
    defaultValue: profile.lastName,
    required: true,
    validations: [validateUsername],
  });
  let displayName = useField({
    defaultValue: profile.displayName || '',
    validations: [validateUsername],
  });
  let parentalPin = useField({
    defaultValue: profile.parentalPin,
  });
  let parentalRatingLevel = useField({
    defaultValue: profile.parentalRatingLevel,
  });

  let receiveMarketingEmail = useField<boolean>({
    defaultValue: profile.receiveMarketingEmail,
  });

  let blockAdultContent = useField<boolean>({
    defaultValue: profile.blockAdultContent,
  });
  const onSubmit_ = () => {
    const payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      displayName: displayName.value,
      receiveMarketingEmail: receiveMarketingEmail.value,
      blockAdultContent: blockAdultContent.value,
      parentalPin: parentalPin.value,
      parentalRatingLevel:parentalRatingLevel.value
    };
    form.valid && onSubmit(payload);
  };

  // Create your form...
  let form = useForm({
    fields: [
      firstName,
      lastName,
      displayName,
      receiveMarketingEmail,
      blockAdultContent,

      parentalPin,
      parentalRatingLevel
    ],
    onSubmit: onSubmit_,
  });

  return (
    <JForm {...form.props}>
      <Flex mx={-2} mb={3}>
        <Box width={1 / 3} px={2}>
          <Control field={firstName}>
            <JInput label="First name" id="firstName" {...firstName.props} />
          </Control>
        </Box>
        <Box width={1 / 3} px={2}>
          <Control field={lastName}>
            <JInput label="Last name" id="lastName" {...lastName.props} />
          </Control>
        </Box>
        <Box width={1 / 3} px={2}>
          <Control field={displayName}>
            <JInput
              label="Display name"
              id="displayName"
              {...displayName.props}
            />
          </Control>
        </Box>
      </Flex>
      <Flex mx={-2} mb={3}>
        <Box width={1 / 3} px={2}>
          <Control field={parentalPin}>
            <JInput
              label="Parental Pin"
              id="parentalPin"
              {...parentalPin.props}
            />
          </Control>
        </Box>

        <Box width={1 / 3} px={2}>
          <Control field={parentalPin}>
            <JSelect
              label="Parental Rating Level"
              id="parentalRatingLevel"
              {...parentalRatingLevel.props}
              options={AdultContentMapping.map(i=>({
                value:i.level, text:i.rating
              }))}
            />
          </Control>
        </Box>
      </Flex>
      <Flex mx={-2} mb={3}>
        <Box width={1 / 3} px={2}>
          <JCheckBox
            label="Receive marketing email"
            id="receiveMarketingEmail"
            {...receiveMarketingEmail.props}
          />
        </Box>
        <Box width={1 / 3} px={2}>
          <JCheckBox
            label="Block Adult Content"
            id="blockAdultContent"
            {...blockAdultContent.props}
          />
        </Box>
      </Flex>
      <Flex>
        <Box>
          <Button type="submit" disabled={!form.valid}>
            Update profile
          </Button>
        </Box>
      </Flex>
    </JForm>
  );
};
const Profile = () => {
  const [data, setData] = useState(undefined as T_Profile | undefined);

  useEffect(() => {
    let current = true;
    const load = async () => {
      const data = await api.user.profile.get(Auth.profileId);
      current && setData(data);
    };
    load();
    return () => {
      current = false;
    };
  }, []);

  const onSubmit = async (payload: any) => {
    await api.user.profile.update(payload);
    // FIXME
    window.location.reload();
  };

  const resetParentalPin = async () => {
    await api.user.parentalPin.reset(Auth.profileId);
  };

  if (!data) return null;

  return (
    <BorderBox>
      <Heading as="h2">my profile</Heading>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <ProfileForm profile={data} onSubmit={onSubmit} />

      <Button onClick={resetParentalPin}>
        Reset Parental Pin ( not working)
      </Button>
    </BorderBox>
  );
};

export default Profile;
