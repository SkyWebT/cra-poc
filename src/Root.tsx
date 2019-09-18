import { ThemeProvider } from 'emotion-theming';
import React from 'react';

import preset from '@rebass/preset';
import material from '@rebass/preset-material';

import App from './App';

const theme = Math.random()>0.5? material: preset

console.log(theme)
const Root = () => {
  return (
    <ThemeProvider theme={ theme}>
      <App />
    </ThemeProvider>
  );
};

export default Root;
