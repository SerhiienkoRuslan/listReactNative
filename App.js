import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import AsyncStorage from '@react-native-community/async-storage'
import { persistCache } from 'apollo3-cache-persist'
import { AppLoading } from 'expo'

import HomeScreen from './src/HomeScreen'
import ListScreen from './src/ListScreen'
import { screenOptions } from './src/styles'

const Stack = createStackNavigator()

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  // uri: 'https://api.graphql.guide/graphql',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

export default function App() {
  const [loadingCache, setLoadingCache] = useState(true)

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false))
  }, [])

  if (loadingCache) {
    return <AppLoading />
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: '📖 Your Lists' }}
          />

          <Stack.Screen
            name="List"
            component={ListScreen}
            options={({
              route: {
                params: {
                  list: { title },
                },
              },
            }) => ({
              title: `List: ${title}`,
              gestureResponseDistance: { horizontal: 500 }
            })}
          />
        </Stack.Navigator>

        <StatusBar style="light" />
      </NavigationContainer>
    </ApolloProvider>
  )
}
