import React from 'react';
import Navigation from './navigation/Navigation';
import { MessageProvider, UserProvider } from './context';
import ApolloProvider from './ApolloProvider';

const Main = () => {
  return (
    <ApolloProvider>
      <UserProvider>
        <MessageProvider>
          <Navigation />
        </MessageProvider>
      </UserProvider>
    </ApolloProvider>
  );
};

export default Main;
