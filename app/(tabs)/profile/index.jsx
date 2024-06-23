import { View, Text } from 'react-native'
import React from 'react'
import ProfilePage from '../../../components/ProfilePage'
import PostList from '../../../components/PostList'

const Profile = () => {
  return (
    <View style={{flex:1,}}>
      <ProfilePage/>
      <PostList/>
    </View>
  )
}

export default Profile