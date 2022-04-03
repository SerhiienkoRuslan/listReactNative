import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { useQuery } from '@apollo/client';

import graphqlVar from 'graphqlVar';

import DrawerNavigator from 'navigation/DrawerNavigator';
import {
  AuthStackNavigator,
  ErrorStackNavigator
} from 'navigation/StackNavigator';

const NavigationContent = () => {
  const { data: dataIsLogged } = useQuery(graphqlVar.IS_LOGGED_IN);
  const { data: dataError } = useQuery(graphqlVar.IS_ERROR);

  const isLoggedIn = dataIsLogged?.isLoggedIn;
  const isError = dataError?.isError;

  if (isError) return <ErrorStackNavigator />;

  return (
    <>
      {isLoggedIn ? <DrawerNavigator /> : <AuthStackNavigator />}

      <StatusBar style="dark" />
    </>
  );
};

export default NavigationContent;
