import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN } from '@env';
import graphqlVar from 'graphqlVar';

const authTokenName = AUTH_TOKEN || '';
const isWeb = Platform.OS === 'web';

const saveToken = async (token) => {
  if (isWeb) {
    await AsyncStorage.setItem(authTokenName, token);
  } else {
    await SecureStore.setItemAsync(authTokenName, token);
  }
};

const getToken = async () => {
  let tokenVal;
  if (isWeb) {
    tokenVal = await AsyncStorage.getItem(authTokenName);
  } else {
    tokenVal = await SecureStore.getItemAsync(authTokenName);
  }
  return tokenVal;
};

const deleteToken = async () => {
  if (isWeb) {
    await AsyncStorage.removeItem(authTokenName);
  } else {
    await SecureStore.deleteItemAsync(authTokenName);
  }
};

const handleLogout = (client) => {
  deleteToken();
  client.cache.writeQuery({
    query: graphqlVar.IS_LOGGED_IN,
    data: {
      isLoggedIn: false
    }
  });
};

const handleSaveToken = (token, client) => {
  saveToken(token);
  client.cache.writeQuery({
    query: graphqlVar.IS_LOGGED_IN,
    data: {
      isLoggedIn: true
    }
  });
};

export default {
  saveToken,
  getToken,
  deleteToken,
  handleLogout,
  handleSaveToken
};
