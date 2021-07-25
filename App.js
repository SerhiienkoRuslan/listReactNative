import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { persistCache } from 'apollo3-cache-persist';
import { AppLoading } from 'expo';
import { setContext } from 'apollo-link-context';
import { API_URL } from '@env';

import authHelpers from 'helpers/auth.helpers';

import DrawerNavigator from 'navigation/DrawerNavigator';
import { AuthStackNavigator } from "navigation/StackNavigator";

const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri: API_URL });

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: await authHelpers.getToken() || ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

export default function App() {
  const [loadingCache, setLoadingCache] = useState(true);
  const [isLogin, setLogin] = useState(false);

  const token = async () => await authHelpers.getToken();

  useEffect(() => {
  if (token) setLogin(true);
  }, [token]);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false))
  }, [])

  if (loadingCache) return <AppLoading />;

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLogin
          ? <DrawerNavigator />
          : <AuthStackNavigator />
        }

        <StatusBar style="light" />
      </NavigationContainer>
    </ApolloProvider>
  )
}
