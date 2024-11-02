import { View, Text, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import DetailedAlertCom from '../../../components/AlertComponent/PendingAlerts/DetailedAlert'
import { useLocalSearchParams } from 'expo-router'

const DetailedAlert = () => {

  const {id} = useLocalSearchParams()
  cosnt [booking, setBooking] = useState(null)
  const [post, setPost] = useState(null)
  const [isloading, setIsLoading] = useState(true)

  if (isloading) {
      return (
          <SafeAreaView>
              <ActivityIndicator size="large" color="#0000ff" />
          </SafeAreaView>
      );
  }

  if (!post) {
      return (
        <View style={{top:'50%', justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:30, fontWeight:'bold', color:'#afadad'}}>No Alert Found</Text>
        </View>
      );
  }

  return (
    <View style={{flex:1}}>
      <DetailedAlertCom booking={booking} post={post}/>
    </View>
  )
}

export default DetailedAlert