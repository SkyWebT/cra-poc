import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Box, Flex, Heading, Image, Text } from 'rebass';

import { BorderBox } from '../primitives';
import OccurrenceStore from '../stores/occurence';

const Occurrences: React.FC = () => {
  const occurences = OccurrenceStore.occurences;
  useEffect(() => {
    OccurrenceStore.fetch();
  }, []);

  if (!occurences.length)
    return <Flex justifyContent="center">loading...</Flex>;

  return (
    <BorderBox>
      <Heading as="h2">my Occurrences</Heading>
      {occurences.map(occ => (
        <Box
          key={occ.itemNumber}
          sx={{
            display: 'inline-block',
            color: 'white',
            bg: 'primary',
            m: 2,
            p: 2,
            borderRadius: 5,
          }}
        >
          <Text>
            {occ.nickName} / {occ.occurrenceType} / {occ.portType}
          </Text>
          <Text>Entitlements:</Text>
          {occ.entitlements.map(ent => {
            const img = OccurrenceStore.getImage(ent.code);
            return (
              <Box
                key={ent.code}
                sx={{
                  display: 'inline-block',
                  bg: 'secondary',
                  m: 1,
                  p: 1,
                  borderRadius: 5,
                }}
              >
                {ent.name}
                <Box bg="white">
                  {img && (
                    <Image
                      sx={{ height: 40 }}
                      src={`https://sky.co.nz/${img}`}
                    />
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      ))}
    </BorderBox>
  );
};

export default observer(Occurrences);
