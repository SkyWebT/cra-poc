import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Button, Flex, Heading } from 'rebass';

import api from '../api';
import { ProfileForm } from '../comp/ProfileForm';
import { BorderBox } from '../primitives';
import Auth from '../stores/auth';
import profileStore from '../stores/profile';

const Profile: React.FC = () => {
  const profile = profileStore.values;
  useEffect(() => {
    profileStore.fetch();
  }, []);

  const onSubmit = async (payload: any) => {
    profileStore.update(payload)
  };

  const resetParentalPin = async () => {
    await api.user.parentalPin.reset(Auth.profileId);
  };

  if (!profile) return <Flex justifyContent="center">loading...</Flex>;

  return (
    <BorderBox>
      <Heading as="h2">my profile</Heading>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      <ProfileForm profile={profile} onSubmit={onSubmit} />

      <Button onClick={resetParentalPin}>
        Reset Parental Pin ( not working)
      </Button>
    </BorderBox>
  );
};

export default observer(Profile);
