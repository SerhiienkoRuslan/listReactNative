import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { gql, useApolloClient, useMutation } from '@apollo/client';

import Input from 'components/Input';

import routesName from 'constants/routesName';
import authHelpers from 'helpers/auth.helpers';
import graphqlVar from 'graphqlVar';

const REGISTRATION = gql`
  mutation registerMutation($email: String!, $password: String!, $username: String) {
    registerUser(email: $email, password: $password, username: $username) {
      token
    }
  }
`;

const RegistrationScreen = ({ navigation }) => {
  const [submitRegistration] = useMutation(REGISTRATION);
  const client = useApolloClient();
  const [authData, setAuthData] = useState({
    email: null,
    username: null,
    password: null,
    passwordRepeat: null
  });

  const onRegister = () => {
    submitRegistration({ variables: { ...authData } })
      .then(resp => {
        if (resp?.data?.registerUser?.token) {
          authHelpers.saveToken(resp.data.registerUser.token);
          client.cache.writeQuery({
            query: graphqlVar.IS_LOGGED_IN,
            data: {
              isLoggedIn: true
            }
          });
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SoWhat?</Text>

      <Input
        placeholder="User Name"
        onChangeText={(username) => setAuthData(prev => ({ ...prev, username }))}
      />

      <Input
        placeholder="Email"
        onChangeText={(email) => setAuthData(prev => ({ ...prev, email }))}
      />

      <Input
        secureTextEntry
        placeholder="Password"
        onChangeText={(password) => setAuthData(prev => ({ ...prev, password }))}
      />

      <Input
        secureTextEntry
        placeholder="Repeat Password"
        onChangeText={(passwordRepeat) => setAuthData(prev => ({ ...prev, passwordRepeat }))}
      />

      <TouchableOpacity style={styles.loginBtn} onPress={onRegister}>
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(routesName.LOGIN_SCREEN)}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});

export default RegistrationScreen;
