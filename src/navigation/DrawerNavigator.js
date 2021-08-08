import React from "react";
import { TouchableOpacity, Text } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { gql, useApolloClient, useQuery } from '@apollo/client';

import authHelpers from 'helpers/auth.helpers';
import graphqlVar from 'graphqlVar';
import routesName from 'constants/routesName';

import { ProfileStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id, username
    }
  }
`

const DrawerNavigator = () => {
  const { data } = useQuery(ME_QUERY);
  const client = useApolloClient();
  // console.log(data)

  if (!data) {
    // TODO: ERROR REDIRECT
    // authHelpers.deleteToken();
  }

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          style={{ marginTop: 'auto' }}
          label="Logout"
          onPress={() => {
            DrawerActions.closeDrawer();
            authHelpers.deleteToken();
            client.cache.writeQuery({
              query: graphqlVar.IS_LOGGED_IN,
              data: {
                isLoggedIn: false
              }
            });
          }}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name={routesName.HOME_SCREEN} component={TabNavigator} />
      <Drawer.Screen name={routesName.PROFILE_SCREEN} component={ProfileStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
