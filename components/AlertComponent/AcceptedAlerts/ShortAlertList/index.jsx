import { View, Text, FlatList, Alert, RefreshControl } from 'react-native';
import React, {useState, useEffect} from 'react';
import ShortAlert from '../ShortAlert';
import styles from './styles';
import { DataStore } from 'aws-amplify/datastore';
import {Booking, User, Post} from '@/src/models';
import { useAuthContext } from '@/providers/AuthProvider';

const ShortAlertList = () => {

    const {dbUser} = useAuthContext()

    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchBookings = async () =>{
      setLoading(true);
      try{
        const fetchedBookings = await DataStore.query(Booking, (b)=> b.realtorID.eq(dbUser.id));      

        const filteredBookings = fetchedBookings.filter((booking)=>booking.status === 'ACCEPTED' || booking.status === 'VIEWING' || booking.status === 'CHECKED_IN' || booking.status === 'VISITING' || booking.status === 'VIEWED' || booking.status === 'CHECKED_OUT' || booking.status === 'VISITED' || booking.status === 'SOLD' || booking.status === 'RECEIVED' || booking.status === 'REMOVED_CLIENT').sort((a, b)=> new Date(b.createdAt) - new Date(a.createdAt));

        const bookingwithUserID = await Promise.all(filteredBookings.map(async (booking)=>{
          if(booking.userID){
            const bookedUser = await DataStore.query(User, (u)=>u.id.eq(booking.userID));

            // Fetch associated post
            const post = booking.PostID
            ? await DataStore.query(Post, (p) => p.id.eq(booking.PostID))
            : null;

            
            return {...booking, 
              user: bookedUser[0] || null,
              post: post ? post[0] : null,
            };
          }
          return {...booking, user: null, post: null};
        }))
        setAlerts(bookingwithUserID)

      }catch(e){
        Alert.alert('Error fetching Bookings', e.message)
      }finally{
        setLoading(false);
        setRefreshing(false);
      }
    }

    const updateBookingStatus = async (bookingId, newStatus) => {
      try {
        const bookingToUpdate = await DataStore.query(Booking, bookingId);
        if (bookingToUpdate) {
          await DataStore.save(
            Booking.copyOf(bookingToUpdate, updated => {
              updated.status = newStatus;
            })
          );
        }
      } catch (e) {
        console.error('Error updating booking status:', e);
      }
    };

    useEffect(()=>{
      if(dbUser?.id){
        fetchBookings();

        const subscription = DataStore.observe(Booking).subscribe(({opType})=>{
          if(opType === 'INSERT' || opType === 'UPDATE' || opType === 'DELETE'){
            fetchBookings();
          }
        });
    
        return () => subscription.unsubscribe();
    }
    },[dbUser?.id])

    const handleRefresh = () => {
      setRefreshing(true); // Start the refreshing spinner
      fetchBookings();
    };

  return (
    <View style={styles.container}>
        { alerts && alerts.length > 0 ? (
            <FlatList
                showsVerticalScrollIndicator={false} 
                data={alerts}
                renderItem={({item})=> <ShortAlert 
                  notification={item}
                  onUpdateStatus={updateBookingStatus} 
                />}
                refreshControl={
                  <RefreshControl
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                      colors={['#11032b']} // Spinner color
                  />
                }
            />
        ): (
            <Text style={styles.noListings}>You have no accepted alert</Text>
        )}
        
    </View>
  )
}

export default ShortAlertList