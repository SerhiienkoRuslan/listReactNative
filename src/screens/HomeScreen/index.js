import React from 'react';
import { Text, FlatList, Pressable } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import AppLoading from 'expo-app-loading';

import routesName from 'constants/routesName';

import styles from './styles';

const POSTS_QUERY = gql`
  query Posts {
    getPosts {
      id
      title
    }
  }
`;

const ListItem = ({ post, onPress }) => {
  const { title } = post;

  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.header}>{title}</Text>
    </Pressable>
  );
};

export default ({ navigation }) => {
  const { data, loading } = useQuery(POSTS_QUERY);

  const handleOnPress = (item) =>
    navigation.navigate(routesName.POST_SCREEN, { post: item });

  if (loading) {
    return <AppLoading />;
  }

  return (
    <FlatList
      data={data?.getPosts || []}
      renderItem={({ item }) => (
        <ListItem post={item} onPress={() => handleOnPress(item)} />
      )}
      keyExtractor={(post) => post.id.toString()}
    />
  );
};
