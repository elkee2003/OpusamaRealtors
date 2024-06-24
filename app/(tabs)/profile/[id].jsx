import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import feeds from '../../../assets/data/feed'
import DetailedPost from '../../../components/DetailedPost'

const Post = () => {

  const {id}= useLocalSearchParams()

  const photo = feeds.find(item=>item.id === id)

  return (
    <View>
      <DetailedPost post={photo}/>
    </View>
  )
}

export default Post