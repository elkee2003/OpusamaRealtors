import { View } from 'react-native'
import React from 'react'
import PostList from '../../../components/MyPostsComs/PostList';

const Home = () => {

  return (
    <View style={{flex:1 }}>
      <PostList/>
    </View>
  )
}

export default Home;