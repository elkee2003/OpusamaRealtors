import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ProfilePage from '../../../components/ProfilePage'
import PostList from '../../../components/PostList'

const Profile = () => {
  return (
    <ScrollView style={{flex:1,}}>
      <ProfilePage/>
      <PostList/>
    </ScrollView>
  )
}

export default Profile