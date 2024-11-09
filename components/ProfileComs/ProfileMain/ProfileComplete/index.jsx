import { View, Text } from 'react-native';
import React from 'react';
import ProfileHead from '../ProfileHead';
import ProfileMediaList from '../ProfileMediaList';
import styles from './styles';

const ProfileMain = () => {
  return (
    <View style={styles.container}>
      <ProfileHead/>
      <View style={{ flex: 1 }}>
        <ProfileMediaList/>
      </View>
    </View>
  )
}

export default ProfileMain;