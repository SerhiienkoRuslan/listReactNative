import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AnimatedAppLoader from 'components/AnimatedSplash';

import Navigation from './navigation/Navigation';
import { GlobalProvider } from './context';
import ApolloProvider from './ApolloProvider';

import theme from 'styles/theme';

const Main = () => {
  return (
    <ApolloProvider>
      <AnimatedAppLoader>
        <GlobalProvider>
          <NavigationContainer theme={theme}>
            <Navigation />
          </NavigationContainer>
        </GlobalProvider>
      </AnimatedAppLoader>
    </ApolloProvider>
  );
};

export default Main;
