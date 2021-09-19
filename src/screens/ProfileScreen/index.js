import React, { useState } from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Input from 'components/Input';

import graphqlVar from 'graphqlVar';

const PROFILE_UPDATE = gql`
  mutation profileMutation($id: Int!, $email: String, $username: String) {
    updateProfile(id: $id, email: $email, username: $username) {
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
  const profileDataCache = client.readQuery({ query: graphqlVar.ME_QUERY });
  const [profileData, setProfile] = useState(profileDataCache?.me || defaultProfile);

  const onUpdateProfile = async () => {
    await submitProfile({ variables: { ...profileData } })
      .then(({ data }) => setProfile(prev => ({ ...prev, ...data?.updateProfile })));
  };

  return (
    <View style={styles.center}>
      <Text>Profile</Text>

      <Input
        value={profileData?.username || ''}
        placeholder="User Name"
        onChangeText={(username) => setProfile(prev => ({ ...prev, username }))}
      />

      <Input
        value={profileData?.email || ''}
        placeholder="Email"
        onChangeText={(email) => setProfile(prev => ({ ...prev, email }))}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={onUpdateProfile}>
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
