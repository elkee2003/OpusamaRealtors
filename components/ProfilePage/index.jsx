import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import styles from './styles'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useProfileContext } from '../../providers/ProfileProvider';

const ProfilePage = () => {

  const {firstName, lastName, address, phoneNumber, profilePic,} = useProfileContext()

  const maxLength = 30
  const locationText = address

  const truncatedText = address.length > maxLength 
  ? `${locationText.substring(0, maxLength)}...` 
  : locationText;

  return (
    <View style={styles.container}>
      <View style={styles.profileDetails}>

        {/* Profile Picture */}
        <Link href={'/profile/writeProfile'} asChild>
          <TouchableOpacity style={styles.profilePicContainer}>
            <Image source={{ uri: profilePic }} style={styles.img} />
          </TouchableOpacity>
        </Link>
    
        <View style={styles.details}>
          {/* Name and Surname */}
          <View style={styles.row}>
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.name}>{firstName}</Text>
          </View>

          {/* PhoneNumber */}
          <View style={styles.row}>
            <FontAwesome name="phone" size={24} color="black" />
            <Text style={styles.txt}>{phoneNumber}</Text>
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
          <TouchableOpacity style={styles.subHeaderContainer}>
            <Text style={styles.subHeader}>Edit Profile</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity onPress={()=>console.warn('View Sub')} style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>
            View Subscription
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ProfilePage