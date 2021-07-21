import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ProfileStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

import routesName from 'constants/routesName';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={routesName.HOME_SCREEN} component={TabNavigator} />
      <Drawer.Screen name={routesName.PROFILE_SCREEN} component={ProfileStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
