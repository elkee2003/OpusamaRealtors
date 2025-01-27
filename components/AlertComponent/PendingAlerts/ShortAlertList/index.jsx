import { View, Text, TextInput, FlatList, Alert, RefreshControl } from 'react-native';
import React, {useState, useEffect} from 'react';
import ShortAlert from '../ShortAlert';
import styles from './styles';
import { DataStore } from 'aws-amplify/datastore';
import {Booking, User, Post} from '@/src/models';
import { useAuthContext } from '@/providers/AuthProvider';

const ShortAlertList = () => {

    const {dbUser} = useAuthContext()

    const [alerts, setAlerts] = useState([]);
    const [filteredAlerts, setFilteredAlerts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchBookings = async () =>{
      setLoading(true);
      try{
        const fetchedBookings = await DataStore.query(Booking, (b)=> b.realtorID.eq(dbUser.id));

        const filteredBookings = fetchedBookings.filter((booking)=>booking.status === 'PENDING' || booking.status === 'DELAYED_PAYMENT').sort((a, b)=> new Date(b.createdAt) - new Date(a.createdAt));

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
        setAlerts(bookingwithUserID);
        setFilteredAlerts(bookingwithUserID);
        
      }catch(e){
        Alert.alert('Error fetching Bookings', e.message)
      }finally{
        setLoading(false);
        setRefreshing(false);
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

    const handleRefresh = () => {
      setRefreshing(true); // Start the refreshing spinner
      fetchBookings();
    };

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

        {/* Alert List */}
        { filteredAlerts && filteredAlerts.length > 0 ?  (
            <FlatList
                showsVerticalScrollIndicator={false} 
                data={filteredAlerts}
                renderItem={({item})=> <ShortAlert 
                  notification={item} />}
                refreshControl={
                  <RefreshControl
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                      colors={['#11032b']} // Spinner color
                  />
                }
            />
        ): (
            <Text style={styles.noListings}>No pending alert or No matching alerts found</Text>
        )}
        
    </View>
  )
}

export default ShortAlertList