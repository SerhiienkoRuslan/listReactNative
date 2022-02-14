import React from 'react';
import Navigation from './navigation/Navigation';
import { MessageProvider } from './context/message';
import ApolloProvider from './ApolloProvider';

const Main = () => {
  return (
    <ApolloProvider>
      <MessageProvider>
        <Navigation />
      </MessageProvider>
    </ApolloProvider>
  );
};

export default Main;
