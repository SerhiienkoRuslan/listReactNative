import React, { useState } from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { View, StyleSheet } from 'react-native';

import Input from 'components/Input';
import CustomButton from 'components/CustomButton';

import graphqlVar from 'graphqlVar';

const PROFILE_UPDATE = gql`
  mutation profileMutation($id: Int!, $email: String, $name: String) {
    updateProfile(_id: $id, email: $email, name: $name) {
      email
      name
    }
  }
`;

const defaultProfile = {
  email: null,
  name: null
};

const ProfileScreen = () => {
  const client = useApolloClient();
  const [submitProfile] = useMutation(PROFILE_UPDATE);
  const profileDataCache = client.readQuery({ query: graphqlVar.ME_QUERY });
  const [profileData, setProfile] = useState(
    profileDataCache?.me || defaultProfile
  );

  const onUpdateProfile = async () => {
    await submitProfile({ variables: { ...profileData } }).then(({ data }) =>
      setProfile((prev) => ({ ...prev, ...data?.updateProfile }))
    );
  };

  return (
    <View style={styles.wrap}>
      <Input
        value={profileData?.name || ''}
        placeholder="User Name"
        onChangeText={(name) => setProfile((prev) => ({ ...prev, name }))}
      />

      <Input
        value={profileData?.email || ''}
        placeholder="Email"
        onChangeText={(email) => setProfile((prev) => ({ ...prev, email }))}
      />

      <CustomButton
        onPress={onUpdateProfile}
        text="Submit"
        customStyles={{ width: '80%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default ProfileScreen;
