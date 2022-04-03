import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import routesName from 'constants/routesName';
import CustomButton from 'components/CustomButton';

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

    <CustomButton
      onPress={handleSubmit}
      text={isLogin ? 'Login' : 'Sign Up'}
      customStyles={{ width: '80%', marginTop: 10, marginBottom: 10 }}
    />

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
