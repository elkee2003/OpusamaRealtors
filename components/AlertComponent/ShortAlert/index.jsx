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
                <Text style={styles.detailsSub}>Duration:</Text> 9th October 2024 - 12th October 2024
            </Text>
            <Text style={styles.details}>
                <Text style={styles.detailsSub}>Amount:</Text> N3,000,000
            </Text>
            <Text style={styles.accOwner}>
                by: Damini Zeus
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default ShortAlert;