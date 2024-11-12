import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import Placeholder from '../../../../assets/images/placeholder.png';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProfileContext } from '@/providers/ProfileProvider';
import {useAuthContext} from '@/providers/AuthProvider';
import { getUrl } from 'aws-amplify/storage';
import SmartImage from '../../../SmartImage/SmartImage';


const ProfileHead = () => {

  const {firstName, lastName, address, phoneNumber, profilePic, setProfilePic, myDescription} = useProfileContext();

  const {dbUser} = useAuthContext();

  const [loading, setLoading]= useState(true);

  const maxLength = 30;
  const locationText = address;

  const truncatedText = address.length > maxLength 
  ? `${locationText.substring(0, maxLength)}...` 
  : locationText;

  const comingSoon =()=>{
    Alert.alert('Soon', 'Functionality will soon be available')
  };

  // Fetch signed URL for profile picture
  const fetchImageUrl = async () => {
    setLoading(true);
    try {
      const result = await getUrl({
        path: dbUser.profilePic,
        options: {
          validateObjectExistence: true, 
          expiresIn: null, // No expiration limit
        },
      });

      if (result.url) {
        setProfilePic(result.url.toString());
      }
    } catch (error) {
      console.error('Error fetching profile pic URL:', error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dbUser.profilePic) {
      fetchImageUrl();
    }
  }, [dbUser.profilePic]);

  return (
    <View style={styles.container}>
      <View style={styles.profileDetails}>
        <TouchableOpacity style={styles.profilePicContainer} onPress={()=>router.push('/profile/editprofile')}>
          {loading ? (
            <Image 
              source={Placeholder} 
              style={styles.img} 
            /> // Show placeholder while loading
          ) : (
            <Image source={{ uri: profilePic }} style={styles.img} onError={() => setProfilePic(null)} />
          )}
        </TouchableOpacity>
    
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

          {/* Description */}
          <View style={styles.row}>
            <Text style={styles.txtDesc}>
             {myDescription} 
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.profileSubrow}>

        <TouchableOpacity style={styles.subHeaderContainer} onPress={()=>router.push('/profile/editprofile')}>
          <Text style={styles.subHeader}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={comingSoon} style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>
            View Subscription
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ProfileHead;