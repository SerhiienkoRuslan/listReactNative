import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, CreatePostStackNavigator, MessageStackNavigator } from "./StackNavigator";

import routesName from 'constants/routesName';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={routesName.HOME_SCREEN} component={MainStackNavigator} />
      <Tab.Screen name={routesName.MESSAGE_SCREEN} component={MessageStackNavigator} />
      <Tab.Screen name={routesName.CREATE_POST_SCREEN} component={CreatePostStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
