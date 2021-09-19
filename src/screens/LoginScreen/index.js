import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { gql, useMutation, useApolloClient } from '@apollo/client';

import Input from 'components/Input';

import routesName from 'constants/routesName';
import authHelpers from 'helpers/auth.helpers';
import graphqlVar from 'graphqlVar';

const LOGIN = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginScreen = ({ navigation }) => {
  const [submitLogin] = useMutation(LOGIN);
  const client = useApolloClient();
  const [authData, setAuthData] = useState({
    email: null,
    password: null
  });

  const onLogin = () => {
    submitLogin({ variables: { ...authData } })
      .then(resp => {
        if (resp?.data?.login?.token) {
          authHelpers.saveToken(resp.data.login.token);
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
        placeholder="Email"
        onChangeText={(email) => setAuthData(prev => ({ ...prev, email }))}
      />

      <Input
        placeholder="Password"
        onChangeText={(password) => setAuthData(prev => ({ ...prev, password }))}
        secureTextEntry
      />

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(routesName.REGISTRATION_SCREEN)}>
        <Text style={styles.loginText}>Sign Up</Text>
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
  forgot:{
    color:"white",
    fontSize:11
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

export default LoginScreen;
