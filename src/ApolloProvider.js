import React, { useState, useEffect } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  split,
  HttpLink
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import AsyncStorage from '@react-native-community/async-storage';
import { persistCache } from 'apollo3-cache-persist';
import { AppLoading } from 'expo';
import { setContext } from 'apollo-link-context';
import { API_URL, API_WS } from '@env';

import authHelpers from 'helpers/auth.helpers';

const cache = new InMemoryCache();

const httpLinkCreate = new HttpLink({ uri: API_URL });

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: (await authHelpers.getToken()) || ''
    }
  };
});

const wsLink = new WebSocketLink({
  uri: API_WS,
  options: {
    reconnect: true
  }
  // connectionParams: {
  //   authToken: authHelpers.getToken() || ''
  // }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLinkCreate)
);

const client = new ApolloClient({
  link: splitLink,
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
  resolvers: {
    Query: {
      async isLoggedIn() {
        const token = await authHelpers.getToken();
        return Boolean(token);
      }
    }
  }
});

export default function ApolloProvider({ children }) {
  const [loadingCache, setLoadingCache] = useState(true);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage
    }).then(() => setLoadingCache(false));
  }, []);

  if (loadingCache) return <AppLoading />;

  return <Provider client={client}>{children}</Provider>;
}
