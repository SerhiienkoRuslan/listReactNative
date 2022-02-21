import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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

// Message pages
import MessageListScreen from 'screens/MessageListScreen';
import MessageScreen from 'screens/MessageScreen';

const Stack = createStackNavigator();

import { screenOptions } from 'styles';

const navBtn = (navigation) => (
  <TouchableOpacity
    onPress={() => navigation?.openDrawer()}
    style={{ padding: 10 }}
  >
    <FontAwesome name="navicon" size={24} color="white" />
  </TouchableOpacity>
);

const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName={routesName.HOME_SCREEN}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={routesName.HOME_SCREEN}
        component={HomeScreen}
        options={{
          title: 'All Posts',
          headerLeft: () => navBtn(navigation)
        }}
      />

      <Stack.Screen
        name={routesName.POST_SCREEN}
        component={PostScreen}
        options={({
          route: {
            params: {
              post: { title }
            }
          }
        }) => ({
          title: title,
          gestureResponseDistance: { horizontal: 500 }
        })}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName={routesName.PROFILE_SCREEN}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={routesName.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          title: routesName.PROFILE_SCREEN,
          headerLeft: () => navBtn(navigation)
        }}
      />
    </Stack.Navigator>
  );
};

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
};

const MessageStackNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const tabHiddenRoutes = [routesName.CHAT_SCREEN];

    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      initialRouteName={routesName.CREATE_POST_SCREEN}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name={routesName.MESSAGE_SCREEN}
        component={MessageListScreen}
        options={{
          title: 'Messages',
          headerLeft: () => navBtn(navigation)
        }}
      />

      <Stack.Screen
        name={routesName.CHAT_SCREEN}
        component={MessageScreen}
        options={({
          route: {
            params: {
              messager: { title }
            }
          }
        }) => ({
          title: title,
          gestureResponseDistance: { horizontal: 500 }
        })}
      />
    </Stack.Navigator>
  );
};

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
};

export {
  MainStackNavigator,
  ProfileStackNavigator,
  AuthStackNavigator,
  CreatePostStackNavigator,
  MessageStackNavigator
};
