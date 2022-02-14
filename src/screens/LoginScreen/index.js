import React, { useState } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';

import Input from 'components/Input';
import AuthLayout from 'components/AuthLayout';

import authHelpers from 'helpers/auth.helpers';

const LOGIN = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [submitLogin] = useMutation(LOGIN);
  const [authData, setAuthData] = useState({
    email: null,
    password: null
  });

  const onLogin = () => {
    submitLogin({ variables: { ...authData } }).then((resp) => {
      if (resp?.data?.login?.token) {
        authHelpers.handleSaveToken(resp.data.login.token, client);
      }
    });
  };

  return (
    <AuthLayout handleSubmit={onLogin} navigation={navigation} isLogin>
      <Input
        placeholder="Email"
        onChangeText={(email) => setAuthData((prev) => ({ ...prev, email }))}
      />

      <Input
        placeholder="Password"
        onChangeText={(password) =>
          setAuthData((prev) => ({ ...prev, password }))
        }
        secureTextEntry
      />
    </AuthLayout>
  );
};

export default LoginScreen;
