import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import styles from './styles';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';

const ShortAlert = ({notification}) => {

    const getStatusText = (status) => {
      if (status === 'PENDING') return 'Pending';
      if (status === 'ACCEPTED') return 'Accepted';
      if (status === 'VIEWING') return 'Viewing';
      if (status === 'VIEWED') return 'Viewed';
      if(status === 'SOLD') return 'Sold';
      if(status === 'CANCELLED') return 'Cancelled';
      if (status === 'DENIED') return 'Denied';
      return 'Pending';
    };


    const handleCopyPhoneNumber = async () => {
        const phoneNumber = notification?.user.phoneNumber;
        
        if (phoneNumber) {
          try {
            await Clipboard.setStringAsync(phoneNumber);
            Alert.alert('Phone Number Copied', 'You can paste it into the dialer to make a call.');
          } catch (error) {
            console.error("Error copying phone number:", error);
            Alert.alert('Error', 'Failed to copy the phone number.');
          }
        } else {
          Alert.alert('Error', 'Phone number is not available.');
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
                <Text style={styles.details}>
                <Text style={styles.detailsSub}>Accommodation Type:</Text> {notification?.propertyType}
                </Text>
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
                {Number(notification.realtorPrice).toLocaleString()}
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
                by: {notification.user.firstName}
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default ShortAlert;