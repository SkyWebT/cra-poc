import React from 'react';
import { Box, BoxProps, SxStyleProp } from 'rebass';

export const Container: React.FC<BoxProps> = props => (
  <Box
    {...props}
    sx={{
      maxWidth: '64em',
      mx: 'auto',
    }}
  />
);

export const BorderBox: React.FC<BoxProps> = props => {

  const sx = {
    borderColor: 'primary',
    borderWidth: 2,
    borderStyle: 'solid',
    m: 2,
    p: 2,
    borderRadius: 5,
    ...props.sx
  } as SxStyleProp;
  
  return <Box {...props} sx={sx} />;
};
