import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import RealtorRatingsReview from '../../../components/ProfileComs/UsersReviews';
import { useLocalSearchParams } from 'expo-router';
import { useAuthContext } from '@/providers/AuthProvider';
import { DataStore } from 'aws-amplify/datastore';
import {Realtor} from '@/src/models';

const RealtorRatings = () => {
    
    const {dbUser} = useAuthContext();
    const [realtor, setRealtor] = useState('')

    const fetchRealtor = async () =>{
      try{
        if(dbUser?.id){
          const foundRealtor = await DataStore.query(Realtor, dbUser?.id);
          setRealtor(foundRealtor)
        }
      }catch(error){
        console.error('Fetching Realtor error:', error)
      }
    }

    useEffect(()=>{
      fetchRealtor()
    },[])
    

  return (
    <View style={{flex:1}}>
      <RealtorRatingsReview realtor={realtor}/>
    </View>
  )
}

export default RealtorRatings;