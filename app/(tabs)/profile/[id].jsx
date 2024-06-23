import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import feeds from '../../../assets/data/feed'
import PostItem from '../../../components/PostItem'

const Post = () => {

  const {id}= useLocalSearchParams()

  const photo = feeds.find(item=>item.id === id)

  return (
    <View>
      <PostItem post={photo}/>
    </View>
  )
}

export default Post