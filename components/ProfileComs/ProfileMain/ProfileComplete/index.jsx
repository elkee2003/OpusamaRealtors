import { View, Text } from 'react-native';
import React from 'react';
import ProfileHead from '../ProfileHead';
import ProfilePictureList from '../ProfilePictureList';

const ProfileMain = () => {
  return (
    <View style={{flex:1}}>
      <ProfileHead/>
      <ProfilePictureList/>
    </View>
  )
}

export default ProfileMain;