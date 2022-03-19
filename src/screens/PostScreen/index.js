import React from 'react';
import { View, Text } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import Loading from 'components/Loading';

const POST_QUERY = gql`
  query Post($id: Int!) {
    getPost(id: $id) {
      id
      title
      content
    }
  }
`;

const PostScreen = ({ route }) => {
  const { data, loading } = useQuery(POST_QUERY, {
    variables: { id: route?.params?.post?.id }
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <Text>{data?.getPost?.content || ''}</Text>
    </View>
  );
};

export default PostScreen;
