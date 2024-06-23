import { View, Text, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';

const ProfilePage = ({name, surname,phoneNumeber}) => {

  const maxLength = 30
  const locationText = 'No. 10B Presdential Estate'

  const truncatedText = locationText.length > maxLength 
  ? `${locationText.substring(0, maxLength)}...` 
  : locationText;

  return (
    <View style={styles.container}>
      <View style={styles.profileDetails}>

        {/* Profile Picture */}
        <View style={styles.profilePicContainer}>
        </View>
        
        <View style={styles.details}>
          {/* Name and Surname */}
          <View style={styles.row}>
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.name}>Opara Horsfal</Text>
          </View>

          {/* PhoneNumber */}
          <View style={styles.row}>
            <FontAwesome name="phone" size={24} color="black" />
            <Text style={styles.txt}>+2348043355466</Text>
          </View>
          

          {/* Address */}
          <View style={styles.row}>
            <Entypo name="location" size={24} color="black" />
            <Text style={styles.txt}>{truncatedText}</Text>
          </View>
        </View>

      </View>
      <View style={styles.profileSubrow}>

        <Link href={'/profile/writeProfile'} asChild>
          <Pressable onPress={()=>console.warn('Edit Profile')} style={styles.subHeaderContainer}>
            <Text style={styles.subHeader}>Edit Profile</Text>
          </Pressable>
        </Link>

        <Pressable onPress={()=>console.warn('View Sub')} style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>
            View Subscription
          </Text>
        </Pressable>

      </View>
    </View>
  )
}

export default ProfilePage