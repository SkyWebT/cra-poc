import React from 'react';
import { Box, BoxProps } from 'rebass';

export const Container :React.FC<BoxProps> = props =>
  <Box
    {...props}
    sx={{
      maxWidth: '64em',
      mx: 'auto',
    }}
  />