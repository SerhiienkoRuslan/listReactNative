import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';

import routesName from 'constants/routesName';

const RegistrationScreen = ({ navigation }) => {
  const [authData, setAuthData] = useState({
    username: null,
    password: null,
    passwordRepeat: null
  });

  const onRegister = () => Alert.alert('Credentials', `${authData.username || ''}`);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SoWhat?</Text>

      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#ffffff"
          onChangeText={(username) => setAuthData(prev => ({ ...prev, username }))}
        />
      </View>

      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#ffffff"
          onChangeText={(password) => setAuthData(prev => ({ ...prev, password }))}
        />
      </View>

      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Repeat Password"
          placeholderTextColor="#ffffff"
          onChangeText={(passwordRepeat) => setAuthData(prev => ({ ...prev, passwordRepeat }))}
        />
      </View>

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
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
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
