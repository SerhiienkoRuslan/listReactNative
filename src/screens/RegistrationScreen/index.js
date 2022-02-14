import React, { useState } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';

import Input from 'components/Input';
import AuthLayout from 'components/AuthLayout';

import authHelpers from 'helpers/auth.helpers';

const REGISTRATION = gql`
  mutation registerMutation(
    $email: String!
    $password: String!
    $username: String
  ) {
    registerUser(email: $email, password: $password, username: $username) {
      token
    }
  }
`;

const RegistrationScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [submitRegistration] = useMutation(REGISTRATION);
  const [authData, setAuthData] = useState({
    email: null,
    username: null,
    password: null,
    passwordRepeat: null
  });

  const onRegister = () => {
    submitRegistration({ variables: { ...authData } }).then((resp) => {
      if (resp?.data?.registerUser?.token) {
        authHelpers.handleSaveToken(resp.data.registerUser.token, client);
      }
    });
  };

  return (
    <AuthLayout handleSubmit={onRegister} navigation={navigation}>
      <Input
        placeholder="User Name"
        onChangeText={(username) =>
          setAuthData((prev) => ({ ...prev, username }))
        }
      />

      <Input
        placeholder="Email"
        onChangeText={(email) => setAuthData((prev) => ({ ...prev, email }))}
      />

      <Input
        secureTextEntry
        placeholder="Password"
        onChangeText={(password) =>
          setAuthData((prev) => ({ ...prev, password }))
        }
      />

      <Input
        secureTextEntry
        placeholder="Repeat Password"
        onChangeText={(passwordRepeat) =>
          setAuthData((prev) => ({ ...prev, passwordRepeat }))
        }
      />
    </AuthLayout>
  );
};

export default RegistrationScreen;
