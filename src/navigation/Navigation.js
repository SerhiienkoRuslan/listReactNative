import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

import graphqlVar from 'graphqlVar';

import DrawerNavigator from 'navigation/DrawerNavigator';
import { AuthStackNavigator } from 'navigation/StackNavigator';

const cacheResourcesAsync = async () => {
  const images = [require('../../assets/splash.png')];

  const cacheImages = images.map((image) => {
    return Asset.fromModule(image).downloadAsync();
  });
  return Promise.all(cacheImages);
};

export default function Navigation() {
  const { data, loading, error } = useQuery(graphqlVar.IS_LOGGED_IN);
  const isLoggedIn = data?.isLoggedIn;

  if (loading) {
    // TODO: THINK ABOUT IT
    return (
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={() => console.log('loading...')}
        onError={console.warn(error, '!')}
      />
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigator /> : <AuthStackNavigator />}

      <StatusBar style="light" />
    </NavigationContainer>
  );
}
