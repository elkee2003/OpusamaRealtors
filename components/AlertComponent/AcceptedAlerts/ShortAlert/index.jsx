import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

const ShortAlert = ({alert}) => {

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.card}>
        <Text style={styles.details}>
                <Text style={styles.detailsSub}>Name:</Text> {alert.guestFirstName}
            </Text>
            <Text style={styles.details}>
                <Text style={styles.detailsSub}>Type:</Text> {alert.accommodationType}
            </Text>
            <Text style={styles.details}>
                <Text style={styles.detailsSub}>Check-in:</Text> 
                {alert.checkInDate}
            </Text>
            <Text style={styles.details}>
                <Text style={styles.detailsSub}>Check-out:</Text> 
                {alert.checkOutDate}
            </Text>
            <Text style={styles.details}>
                <Text style={styles.detailsSub}>Amount:</Text>
                {alert.realtorPrice}
            </Text>
            <Text style={styles.accOwner}>
                by: {alert.user.firstName}
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default ShortAlert;