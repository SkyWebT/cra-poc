import { ThemeProvider } from 'emotion-theming';
import React from 'react';

import theme from '@rebass/preset';

import App from './App';

console.log(theme)
const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

export default Root;
