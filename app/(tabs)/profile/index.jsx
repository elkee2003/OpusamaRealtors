import { View,} from 'react-native';
import React from 'react';
import EditProfile from '../../../components/ProfileComs/EditProfile';
import ProfileMain from '../../../components/ProfileComs/ProfileMain/ProfileComplete';
import {useAuthContext} from '@/providers/AuthProvider';

const Profile = () => {

  const {dbUser} = useAuthContext();

  return (
    <View style={{flex:1}}>
      {dbUser ?
        <ProfileMain/>
      :
        <EditProfile/>
      }
    </View>
  )
}

export default Profile