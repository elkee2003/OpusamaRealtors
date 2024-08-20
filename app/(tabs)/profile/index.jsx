import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ProfilePage from '../../../components/ProfilePage'
import PostList from '../../../components/PostList'
import LocationDropDown from '../../../components/DropDown/CountryDropDown'

const Profile = () => {
  return (
    <ScrollView style={{flex:1,}}>
      {/* <ProfilePage/>
      <PostList/> */}
      <LocationDropDown/>
    </ScrollView>
  )
}

export default Profile