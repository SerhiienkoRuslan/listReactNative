import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import routesName from 'constants/routesName';

import {
  MainStackNavigator,
  CreatePostStackNavigator,
  MessageStackNavigator
} from './StackNavigator';

const Tab = createBottomTabNavigator();

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routesName.HOME_SCREEN}
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarShowLabel: false,
        headerTitle: '',
        headerShown: false
      }}
    >
      <Tab.Screen
        name={routesName.HOME_SCREEN}
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          )
        }}
      />

      <Tab.Screen
        name={routesName.MESSAGE_SCREEN}
        component={MessageStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chatbox-outline" color={color} />
          )
        }}
      />

      <Tab.Screen
        name={routesName.CREATE_POST_SCREEN}
        component={CreatePostStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="create-outline" color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
