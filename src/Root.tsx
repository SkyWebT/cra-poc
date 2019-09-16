import { ThemeProvider } from 'emotion-theming';
import React from 'react';

import theme from '@rebass/preset';

import App from './App';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

export default Root;
