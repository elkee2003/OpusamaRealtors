import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import PostItem from '../../../components/PostItem'
import feeds from '../../../assets/data/feed'

const Home = () => {

  return (
    <View style={{flex:1, }}>
      {<FlatList
      data={feeds}
      renderItem={({item})=><PostItem post={item}/>}
      />}
    </View>
  )
}

export default Home;