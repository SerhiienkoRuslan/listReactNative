import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-community/async-storage';
import { AUTH_TOKEN } from '@env';

const authTokenName = AUTH_TOKEN || '';
const isWeb = Platform.OS === 'web';

const saveToken = async (token) => {
  if (isWeb) {
    await AsyncStorage.setItem(authTokenName, token)
  } else {
    await SecureStore.setItemAsync(authTokenName, token)
  }
}

const getToken = async () => {
  let tokenVal;
  if (isWeb) {
    tokenVal = await AsyncStorage.getItem(authTokenName)
  } else {
    tokenVal = await SecureStore.getItemAsync(authTokenName)
  }
  return tokenVal;
}

const deleteToken = async () => {
  if (isWeb) {
    await AsyncStorage.removeItem(authTokenName)
  } else {
    await SecureStore.deleteItemAsync(authTokenName)
  }
}

export default { saveToken, getToken, deleteToken };
