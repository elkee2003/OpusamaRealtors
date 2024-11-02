import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'

const DetailedAlert = ({alert, user}) => {

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Guest Details</Text>

        {/* Details */}
        <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.details}>
            <Text style={styles.subHeader}>Name(s):</Text>
            {alert.guestFirstName}
          </Text>

          <Text style={styles.details}>
            <Text style={styles.subHeader}>Last Name(s):</Text>
            {alert.guestLastName}
          </Text>

          <Text style={styles.details}>
            <Text style={styles.subHeader}>Phone Number:</Text> 
            {alert.guestPhonenumber}
          </Text>

          <Text style={styles.details}>
            <Text style={styles.subHeader}>Purpose:</Text> 
            {alert.purpose}
          </Text>

          <Text style={styles.details}>
            <Text style={styles.subHeader}>Duration:</Text> 
            {alert.duration}
          </Text>

          <Text style={styles.details}>
            <Text style={styles.subHeader}>Check-in:</Text> 
            {alert.checkInDate}
          </Text>

          <Text style={styles.details}>
            <Text style={styles.subHeader}>Check-out:</Text> 
            {alert.checkOutDate}
          </Text>

          <Text style={styles.details}>
            <Text style={styles.subHeader}>Accommodation Type:</Text> 
            {alert.propertyType}
          </Text>

          <Text style={styles.details}>
            <Text style={styles.subHeader}>Room Type:</Text> 
            {alert.accommodationType}
          </Text>

          <Text style={styles.details}>
            <Text style={styles.subHeader}>Room Name:</Text> 
            {alert.nameOfType}
          </Text>

          <Text style={styles.details}>
            <Text style={styles.subHeader}>Price:</Text> 
            {alert.realtorPrice}
          </Text>
          <Text style={styles.details}>
            by: Damini Zeus
          </Text>
        </ScrollView>
    </View>
  )
}

export default DetailedAlert;