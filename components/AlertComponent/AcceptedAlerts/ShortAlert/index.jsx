import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, {useEffect, } from 'react';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const ShortAlert = ({notification, onUpdateStatus}) => {

    const TIMER_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

    // Start the countdown and save the start time in AsyncStorage
    const startCountdown = async () => {
      const startTime = Date.now();
      await AsyncStorage.setItem(`timer_${notification.id}`, JSON.stringify(startTime));
      scheduleStatusUpdate(startTime);
    };

    // Schedule the status update after the remaining time
    const scheduleStatusUpdate = (startTime) => {
      const elapsed = Date.now() - startTime;
      const remainingTime = TIMER_DURATION - elapsed;

      if (remainingTime <= 0) {
        // If time has already passed, immediately update the status
        onUpdateStatus(notification.id, 'DELAYED_PAYMENT');
      } else {
        // Otherwise, set a timeout for the remaining time
        setTimeout(() => {
          onUpdateStatus(notification.id, 'DELAYED_PAYMENT');
        }, remainingTime);
      }
    };

    // Check if a countdown exists for this notification and resume if necessary
    const checkCountdown = async () => {
      const startTime = await AsyncStorage.getItem(`timer_${notification.id}`);
      if (startTime) {
        scheduleStatusUpdate(JSON.parse(startTime));
      } else if (notification.propertyType === 'Hotel / Shortlet' && notification.status === 'ACCEPTED') {
        startCountdown();
      }
    };

    // Clear the timer data from AsyncStorage when the status changes
    const clearTimer = async () => {
      await AsyncStorage.removeItem(`timer_${notification.id}`);
    };

    useEffect(() => {
      checkCountdown();
  
      return () => {
        clearTimer(); // Cleanup the timer when the component unmounts or the status changes
      };
    }, [notification.status]);

    const getStatusText = (status) => {
      if (status === 'PENDING') return 'Pending';
      if (status === 'ACCEPTED') return 'Accepted';
      if (status === 'VIEWING') return 'Viewing';
      if (status === 'VIEWED') return 'Viewed';
      if(status === 'SOLD') return 'Sold';
      if(status === 'PAID') return 'Paid';
      if(status === 'RECEIVED') return 'Received';
      if (status === 'DENIED') return 'Denied';
      return 'Pending';
    };

    // Handle Remove function
    const handleRemove = () => {
        if (['VIEWED', 'CHECKED_OUT', 'VISITED', 'PAID', 'SOLD'].includes(notification.status)) {
        onUpdateStatus(notification.id, 'REMOVED_REALTOR'); 
        } else {
        Alert.alert('Action Not Allowed', 'You can only remove bookings with statuses VIEWED, CHECKED_OUT, VISITED, or SOLD.');
        }
    };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={()=> router.push(`screens/alertdetails/acceptedalerts/${notification.id}`)}>

            {/* First Name */}
            {notification.clientFirstName && (
                <Text style={styles.details}>
                <Text style={styles.detailsSub}>Name:</Text> {notification?.clientFirstName}
                </Text>
            )}

            {/* Property Type */}
            {notification.propertyType &&(
              <TouchableOpacity onPress={()=> router.push(`home/${notification?.post?.id}`)}>
                <Text style={styles.details}>
                <Text style={styles.detailsSub}>Accommodation Type (click to view):</Text> {notification?.propertyType}
                </Text>
              </TouchableOpacity>
            )}

            {/* Accommodation Type */}
            {notification.accommodationType && (
                <Text style={styles.details}>
                <Text style={styles.detailsSub}>Type:</Text> {notification?.accommodationType}
                </Text>
            )}

            {/* Check-in */}
            {notification.checkInDate && (
                <Text style={styles.details}>
                <Text style={styles.detailsSub}>Check-in:</Text> 
                {notification?.checkInDate?.substring(0,17)}
                </Text>
            )}

            {/* Check-out */}
            {notification.checkOutDate && (
                <Text style={styles.details}>
                <Text style={styles.detailsSub}>Check-out:</Text> 
                {notification.checkOutDate?.substring(0,17)}
                </Text>
            )}

            {/* Realtor Price */}
            {notification.realtorPrice &&( 
                <Text style={styles.details}>
                <Text style={styles.detailsSub}>Amount:</Text> ₦
                {Number(notification.realtorPrice)?.toLocaleString()}
                </Text>
            )}

            {/* Status */}
            <View style={styles.statusRow}>
            <Text style={styles.details}>
              {getStatusText(notification.status)}
            </Text>
            <View style={styles.greenIcon}/>
          </View>

            {/* By account owner */}
            <Text style={styles.accOwner}>
                by: {notification?.user?.firstName}
            </Text>
            {/* If booking status is VIEWED */}
            {(notification.status === 'VIEWED' || notification.status === 'CHECKED_OUT' || notification.status === 'VISITED' || notification.status === 'SOLD' || notification.status === 'RECEIVED') &&  (
            <TouchableOpacity 
                style={styles.delCon}
                onPress={()=>{
                Alert.alert(
                    'Remove Order',
                    'Are you sure you want to remove this booking?',
                    [
                    {text:'Cancel', style:'cancel'},
                    {text: 'Remove', style:'destructive', onPress:handleRemove}
                    ]
                );
                }} 
            >
                <Text style={styles.removeTxt}>Remove</Text>
            </TouchableOpacity> 
            )}
        </TouchableOpacity>
    </View>
  )
}

export default ShortAlert;