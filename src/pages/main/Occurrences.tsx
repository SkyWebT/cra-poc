import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from 'rebass';

import api from '../../api';
import { T_Occurrence } from '../../types';

const Occurrences = () => {
  const [data, setData] = useState([] as T_Occurrence[]);
  useEffect(() => {
    let current = true;
    const load = async () => {
      const data = await api.user.occurrences();
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
      <Heading as="h2">my Occurrences</Heading>
      {data.map(occ => (
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
          <Text>{occ.nickName} / {occ.occurrenceType} / {occ.portType}</Text>
          <Text>Entitlements:</Text>
          {occ.entitlements.map(ent => (
            <Box
              key={ent.code}
              sx={{ display: 'inline-block', bg: 'palevioletred', m: 1, p: 1 ,borderRadius: 5,}}
            >
              {ent.name}
            </Box>
          ))}
        </Box>
      ))}
    </div>
  );
};

export default Occurrences;
