import React, {useState} from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Input from 'components/Input';

const PROFILE_UPDATE = gql`
  mutation profileMutation($email: String!, $username: String) {
    updateProfile(email: $email, username: $username) {
        email, username
    }
  }
`;

const defaultProfile = {
  email: null,
  username: null
}

const ProfileScreen = () => {
  const client = useApolloClient();
  const [submitProfile] = useMutation(PROFILE_UPDATE);
  const [profileData, setProfile] = useState(defaultProfile);

  console.log(client.cache)

  const onRegister = async () => {
    await submitProfile({ variables: { ...profileData, id: 5 } })
      .then(resp => console.log(resp));
  };

  return (
    <View style={styles.center}>
      <Text>Profile</Text>

      <Input
        placeholder="User Name"
        onChangeText={(username) => setProfile(prev => ({ ...prev, username }))}
      />

      <Input
        placeholder="Email"
        onChangeText={(email) => setProfile(prev => ({ ...prev, email }))}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={onRegister}>
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  submitBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  submitBtnText:{
    color:"white"
  }
});

export default ProfileScreen;
