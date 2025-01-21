import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import styles from './styles';
import { router } from 'expo-router';

const ShortAlert = ({notification}) => {

    const getStatusText = (status) => {
        if (status === 'PENDING') return 'Pending';
        if (status === 'ACCEPTED') return 'Accepted';
        if (status === 'VIEWING') return 'Viewing';
        if (status === 'VIEWED') return 'Viewed';
        if(status === 'SOLD') return 'Sold';
        if(status === 'PAID') return 'Paid';
        if(status === 'DELAYED_PAYMENT') return 'Delayed Payment';
        if(status === 'RECEIVED') return 'Received';
        if (status === 'DENIED') return 'Denied';
        return 'Pending';
      };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={()=> router.push(`screens/alertdetails/pendingalerts/${notification.id}`)}>

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
                <Text style={styles.status}>
                {getStatusText(notification.status)}
                </Text>
                {(notification.status === 'ACCEPTED') ? (
                    <View style={styles.greenIcon}/>
                ):(
                    <View style={styles.redIcon}/>
                )}
            </View>

            {/* by Account Owner */}
            <Text style={styles.accOwner}>
                by: {notification?.user?.firstName}
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default ShortAlert;