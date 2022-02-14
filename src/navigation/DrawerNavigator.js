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

import { ProfileStackNavigator } from './StackNavigator';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { error } = useQuery(graphqlVar.ME_QUERY);
  const client = useApolloClient();

  if (error) authHelpers.handleLogout(client);

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          style={{ marginTop: 'auto' }}
          label="Logout"
          onPress={() => {
            DrawerActions.closeDrawer();
            authHelpers.handleLogout(client);
          }}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name={routesName.HOME_SCREEN} component={TabNavigator} />
      <Drawer.Screen
        name={routesName.PROFILE_SCREEN}
        component={ProfileStackNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
