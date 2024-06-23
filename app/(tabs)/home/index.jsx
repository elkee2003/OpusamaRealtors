import { View, Text, Image } from 'react-native'
import React from 'react'
import DetailedPost from '../../../components/DetailedPost'

const Home = () => {

  return (
    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
      <DetailedPost/>
    </View>
  )
}

export default Home