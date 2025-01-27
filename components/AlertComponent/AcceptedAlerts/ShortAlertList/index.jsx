import { View, Text, TextInput,FlatList, Alert, RefreshControl } from 'react-native';
import React, {useState, useEffect} from 'react';
import ShortAlert from '../ShortAlert';
import styles from './styles';
import { DataStore } from 'aws-amplify/datastore';
import {Booking, User, Post} from '@/src/models';
import { useAuthContext } from '@/providers/AuthProvider';

// Note I should write a code here that if status is accepted, and payment has not been made in 10mins the status will change to delayed payment 'DELAYED_PAYMENT'. You can check the web app of this page to get an idea

const ShortAlertList = () => {

    const {dbUser} = useAuthContext()

    const [alerts, setAlerts] = useState([]);
    const [filteredAlerts, setFilteredAlerts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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
        setFilteredAlerts(bookingwithUserID);

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


    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query) {
            setFilteredAlerts(alerts);
            return;
        }

        const lowercasedQuery = query.toLowerCase();
        const filtered = alerts.filter((alert) => {
            const clientFirstName = alert?.clientFirstName?.toLowerCase() || '';
            const clientLastName = alert?.clientLastName?.toLowerCase() || '';
            return (
                clientFirstName.includes(lowercasedQuery) || clientLastName.includes(lowercasedQuery)
            );
        });

        setFilteredAlerts(filtered);
    };

    const handleRefresh = () => {
      setRefreshing(true); // Start the refreshing spinner
      fetchBookings();
    };

  return (
    <View style={styles.container}>

        {/* Search */}
        <TextInput 
          style={styles.searchInput}
          placeholder='Search by client name'
          value={searchQuery}
          onChangeText={(query) => {
            setSearchQuery(query);
            handleSearch(query);
          }}
        />

        {/* Alert list */}
        { filteredAlerts && filteredAlerts.length > 0 ? (
            <FlatList
                showsVerticalScrollIndicator={false} 
                data={filteredAlerts}
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
            <Text style={styles.noListings}>No pending alert or No matching alerts found </Text>
        )}
        
    </View>
  )
}

export default ShortAlertList