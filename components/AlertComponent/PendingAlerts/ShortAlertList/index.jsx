import { View, Text, FlatList, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import ShortAlert from '../ShortAlert';
import styles from './styles';
import { DataStore } from 'aws-amplify/datastore';
import {Booking} from '@/src/models';
import { useAuthContext } from '@/providers/AuthProvider';

const ShortAlertList = () => {

    const {dbUser} = useAuthContext()

    const [alerts, setAlerts] = useState(alert)
    const [loading, setLoading] = useState(true)

    const fetchBookings = async () =>{
      setLoading(true);
      try{
        const fetchedBookings = await DataStore.query(Booking, (b)=> b.bookingRealtorId.eq(dbUser.id));

        const filteredBookings = fetchedBookings.filter((booking)=>booking.status === 'ACCEPTED').sort((a, b)=> new Date(b.createdAt) - new Date(a.createdAt));

        const bookingwithUserID = await Promise.all(filteredBookings.map(async (booking)=>{
          if(booking.userID){
            const bookedUser = await DataStore.query(User, (u)=>u.userID.eq(booking.userID));
            return {...booking, user: bookedUser[0] || null};
          }
          return {...booking, user: null};
        }))
        setAlerts(bookingwithUserID)
        
      }catch(e){
        Alert.alert('Error fetching Bookings', e.message)
      }finally{
        setLoading(false);
      }
    }

    useEffect(()=>{
      fetchBookings();

      const subscription = DataStore.observe(Booking).subscribe(({opType})=>{
        if(opType === 'INSERT' || opType === 'UPDATE' || opType === 'DELETE'){
          fetchBookings();
        }
      });
  
      return () => subscription.unsubscribe();
    },[])

  return (
    <View style={styles.container}>
        { alerts && alerts.length > 0 ? (
            <FlatList
                showsVerticalScrollIndicator={false} 
                data={alerts}
                renderItem={({item})=> <ShortAlert alert={item}/>}
            />
        ): (
            <Text style={styles.noListings}>You have no Alerts</Text>
        )}
        
    </View>
  )
}

export default ShortAlertList