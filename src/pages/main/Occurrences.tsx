import React, { useEffect, useState } from 'react';
import { Heading } from 'rebass';

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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Occurrences;
