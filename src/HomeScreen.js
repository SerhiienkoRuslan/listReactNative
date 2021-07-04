import React from 'react'
import { Text, FlatList, Pressable } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { AppLoading } from 'expo'

import styles from './styles'

const LIST_QUERY = gql`
  query Lists {
    getLists {
      id
      title
    }
  }
`

const ListItem = ({ list, onPress }) => {
  const { title } = list

  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.header}>{title}</Text>
    </Pressable>
  )
}

export default ({ navigation }) => {
  const { data, loading } = useQuery(LIST_QUERY)

  if (loading) {
    return <AppLoading />
  }

  return (
    <FlatList
      data={data?.getLists || []}
      renderItem={({ item }) => (
        <ListItem
          list={item}
          onPress={() => navigation.navigate('List', { list: item })}
        />
      )}
      keyExtractor={(list) => list.id.toString()}
    />
  )
}
