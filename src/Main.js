import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AnimatedAppLoader from 'components/AnimatedSplash';

import Navigation from './navigation/Navigation';
import { GlobalProvider } from './context';
import ApolloProvider from './ApolloProvider';

const theme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)'
  }
};

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
