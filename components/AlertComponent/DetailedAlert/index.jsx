import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'

const DetailedAlert = ({booking, post}) => {

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Guest Details</Text>

        {/* Details */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.details}>
            <Text style={styles.subHeader}>Name(s):</Text> Veronica Tari
          </Text>
          <Text style={styles.details}>
            <Text style={styles.subHeader}>Phone Number:</Text> 08060108660
          </Text>
          <Text style={styles.details}>
            <Text style={styles.subHeader}>Type:</Text> KingSize Room 1
          </Text>
          <Text style={styles.details}>
            <Text style={styles.subHeader}>Stay Duration:</Text> From 18th February 2025 - 3rd March 2025
          </Text>
          <Text style={styles.details}>
            <Text style={styles.subHeader}>Amount:</Text> N1,000,000
          </Text>
          <Text style={styles.details}>
            by: Damini Zeus
          </Text>
        </ScrollView>
    </View>
  )
}

export default DetailedAlert;