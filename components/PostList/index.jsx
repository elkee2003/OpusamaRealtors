import { View, Text, FlatList } from 'react-native'
import React from 'react'
import feed from '../../assets/data/feed'
import ProfileImageGrid from '../ProfileImageGrid'
import styles from './styles'

const PostList = () => {
  return (
    <View style={styles.container}>
      <FlatList 
          data={feed}
          renderItem={({item})=> <ProfileImageGrid post={item}/>}
          contentContainerStyle={{gap:1}}
          columnWrapperStyle={{gap:1}}
          numColumns={3} // Add this line
      />
    </View>
  )
}

export default PostList