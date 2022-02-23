import React from 'react';
import Navigation from './navigation/Navigation';
import { GlobalProvider } from './context';
import ApolloProvider from './ApolloProvider';

const Main = () => {
  return (
    <ApolloProvider>
      <GlobalProvider>
        <Navigation />
      </GlobalProvider>
    </ApolloProvider>
  );
};

export default Main;
