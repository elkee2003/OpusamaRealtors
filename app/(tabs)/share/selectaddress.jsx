import { View, Text } from 'react-native';
import React from 'react';
import GooglePlacesAutoCompleteCom from '../../../components/UploadCom/Forms/googlePlacesAuto';

const SelectAddress = () => {
  return (
    <View style={{flex:1}}>
      <GooglePlacesAutoCompleteCom/>
    </View>
  )
}

export default SelectAddress;