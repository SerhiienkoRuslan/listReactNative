import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { useApolloClient, useQuery } from '@apollo/client';

import authHelpers from 'helpers/auth.helpers';
import graphqlVar from 'graphqlVar';
import routesName from 'constants/routesName';

import { useGlobalDispatch } from 'context';
import { SET_CURRENT_USER } from 'context/actions';

import { ProfileStackNavigator } from './StackNavigator';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dispatch = useGlobalDispatch();
  const client = useApolloClient();

  useQuery(graphqlVar.ME_QUERY, {
    onCompleted: (data) => {
      dispatch({ type: SET_CURRENT_USER, payload: { user: data.me } });
    },
    onError: () => authHelpers.handleLogout(client.cache)
  });

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          style={{ marginTop: 'auto' }}
          label="Logout"
          onPress={() => {
            DrawerActions.closeDrawer();
            authHelpers.handleLogout(client.cache);
          }}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        options={{ headerShown: false }}
        name={routesName.HOME_SCREEN}
        component={TabNavigator}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={routesName.PROFILE_SCREEN}
        component={ProfileStackNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
