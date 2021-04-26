import React from 'react';
import {
  ChakraProvider,
  CSSReset,
} from '@chakra-ui/core';
import theme from '@chakra-ui/theme';

import Routes from './components/navigation/Routes';
import { AuthProvider } from './contexts/AuthContext';

//Uncomment Component to see screen, do one at a time until we have routes implimented

function App() {
  return (
    <AuthProvider>

    <ChakraProvider theme={theme}>
      <CSSReset /> 
      <Routes/>
    </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
