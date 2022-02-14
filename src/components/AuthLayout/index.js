import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import routesName from 'constants/routesName';
import styles from './styles';

const AuthLayout = ({
  children,
  isLogin = false,
  handleSubmit,
  navigation
}) => (
  <View style={styles.container}>
    <Text style={styles.logo}>SoWhat?</Text>

    {children}

    {isLogin && (
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
    )}

    <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
      <Text style={styles.loginText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          isLogin ? routesName.REGISTRATION_SCREEN : routesName.LOGIN_SCREEN
        )
      }
    >
      <Text style={styles.loginText}>{!isLogin ? 'Login' : 'Sign Up'}</Text>
    </TouchableOpacity>
  </View>
);

export default AuthLayout;
