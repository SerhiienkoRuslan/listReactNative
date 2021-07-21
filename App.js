import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { persistCache } from 'apollo3-cache-persist';
import { AppLoading } from 'expo';

import DrawerNavigator from 'navigation/DrawerNavigator';
import { AuthStackNavigator } from "navigation/StackNavigator";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  // uri: 'https://api.graphql.guide/graphql',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

export default function App() {
  const [loadingCache, setLoadingCache] = useState(true);
  const [isLogin, setLogin] = useState(false);

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
