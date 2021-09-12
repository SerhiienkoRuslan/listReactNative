import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gql, useMutation } from '@apollo/client';

import Input from 'components/Input';
import CustomButton from 'components/CustomButton';

import routesName from 'constants/routesName';

const POST = gql`
  mutation Mutation($title: String!, $content: String!) {
    createPost(post: { title: $title, content: $content }) {
      title
      content
      id
    }
  }
`;

const CreatePostScreen = ({ navigation }) => {
  const [submitLogin] = useMutation(POST);
  const [postData, setPostData] = useState({
    title: null,
    content: null
  });

  const onSubmit = () => {
    submitLogin({ variables: { ...postData } })
      .then(resp => {
        if (resp?.data?.createPost) {
          navigation.navigate('Post', { post: resp?.data?.createPost })
        }
      });
  };

  return (
    <View style={styles.center}>
      <Text>CREATE POST</Text>

      <Input
        placeholder="Title"
        onChangeText={(title) => setPostData(prev => ({ ...prev, title }))}
      />

      <Input
        placeholder="Content"
        onChangeText={(content) => setPostData(prev => ({ ...prev, content }))}
      />

      <CustomButton
        onPress={onSubmit}
        text="Submit"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
});

export default CreatePostScreen;
