import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routesName from 'constants/routesName';

// Main pages
import HomeScreen from 'screens/HomeScreen';
import PostScreen from 'screens/PostScreen';

// Create Post pages
import CreatePostScreen from 'screens/CreatePostScreen';

// Auth pages
import LoginScreen from 'screens/LoginScreen';
import RegistrationScreen from 'screens/RegistrationScreen';

// Profile pages
import ProfileScreen from 'screens/ProfileScreen';

const Stack = createStackNavigator();

import { screenOptions } from 'styles';

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routesName.HOME_SCREEN}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={routesName.HOME_SCREEN}
        component={HomeScreen}
        options={{ title: 'All Posts' }}
      />

      <Stack.Screen
        name={routesName.POST_SCREEN}
        component={PostScreen}
        options={({ route: { params: { list: { title } } } }) => ({
          title: title,
          gestureResponseDistance: { horizontal: 500 }
        })}
      />
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routesName.PROFILE_SCREEN}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={routesName.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ title: routesName.PROFILE_SCREEN }}
      />
    </Stack.Navigator>
  );
}

const CreatePostStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routesName.CREATE_POST_SCREEN}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={routesName.CREATE_POST_SCREEN}
        component={CreatePostScreen}
        options={{ title: routesName.CREATE_POST_SCREEN }}
      />
    </Stack.Navigator>
  );
}

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routesName.LOGIN_SCREEN}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={routesName.REGISTRATION_SCREEN}
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={routesName.LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ProfileStackNavigator, AuthStackNavigator, CreatePostStackNavigator };