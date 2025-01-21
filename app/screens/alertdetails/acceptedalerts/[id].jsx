import { View, Text, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import AcceptedDetailedAlertCom from '../../../../components/AlertComponent/AcceptedAlerts/DetailedAlert'
import { useLocalSearchParams } from 'expo-router'
import { DataStore } from 'aws-amplify/datastore';
import {Booking, User, Post} from '@/src/models';

// I should update the post to available false when accepted. I haven't done it yet.

const AcceptedDetailedAlert = () => {

  const {id} = useLocalSearchParams()
  const [booking, setBooking] = useState(null)
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null); 
  const [isloading, setIsLoading] = useState(false);

  const fetchBooking = async (id) =>{
    setIsLoading(true);
    try{
      if(id){
        const foundBooking = await DataStore.query(Booking, id)

        if(foundBooking){
          const foundUser = foundBooking.userID ? await DataStore.query(User, foundBooking.userID)
          : null;
          const foundPost = foundBooking.PostID
          ? await DataStore.query(Post, foundBooking.PostID)
          : null;


          setBooking(foundBooking);
          setUser(foundUser);
          setPost(foundPost);

        } else {
          setBooking(null);
          setPost(null);
        }
      }
    }catch(e){
      Alert.alert('Error', 'Error fetching Booking');
    }finally{
      setIsLoading(false);
    }
  }

  const updateBookingStatus = async (newStatus) => {
    if (booking) {
      try {
        const updatedBooking = await DataStore.save(
          Booking.copyOf(booking, (updated) => {
            updated.status = newStatus;
          })
        );
        setBooking(updatedBooking); // Update local state with new status
      } catch (error) {
        Alert.alert('Error', 'Unable to update booking status');
      }
    }
  };

  useEffect(()=>{
    fetchBooking(id)
  },[id])

  useEffect(()=>{
    if(!booking){
      return;
    }

    const subscription =  DataStore.observe(Booking, booking.id).subscribe(({opType, element})=>{
      if(opType === 'UPDATE'){
        setBooking(element);
      }
    });

    return () => subscription.unsubscribe();
  },[booking])
  
  if (!booking) {
      return (
        <View style={{top:'50%', justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:30, fontWeight:'bold', color:'#afadad'}}>No Alert Found</Text>
        </View>
      );
  }


  return (
    <View style={{flex:1}}>
      <AcceptedDetailedAlertCom 
        notification={{...booking, user, post}} 
        onStatusChange={updateBookingStatus}
      />
    </View>
  )
}

export default AcceptedDetailedAlert;