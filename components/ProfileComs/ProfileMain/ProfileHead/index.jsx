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
import { DataStore } from 'aws-amplify/datastore';
import {Realtor} from '@/src/models';
import { getUrl } from 'aws-amplify/storage';
import SmartImage from '../../../SmartImage/SmartImage';


const ProfileHead = () => {

  const {firstName, lastName, address, phoneNumber, profilePic, setProfilePic, myDescription} = useProfileContext();

  const {dbUser} = useAuthContext();

  const [loading, setLoading]= useState(true);
  const [readMoreDescription, setReadMoreDescription] = useState(false);

  const descriptionMaxLength = 80; 
  const truncatedDescription = myDescription.length > descriptionMaxLength 
    ? `${myDescription.substring(0, descriptionMaxLength)}...` 
    : myDescription;

  const maxLength = 30;
  const locationText = address;

  const truncatedText = address.length > maxLength 
  ? `${locationText.substring(0, maxLength)}...` 
  : locationText;

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

    const subscription = DataStore.observe(Realtor).subscribe(({opType})=>{
      if(opType === 'INSERT' || opType === 'UPDATE' || opType === 'DELETE'){
        fetchImageUrl();
      }
    });

    return () => subscription.unsubscribe();
  }, [dbUser.profilePic]);

  return (
    <View style={styles.container}>
      <View style={styles.profileDetails}>

        {/* Three dots */}
        <TouchableOpacity 
          style={styles.dotCon}
          onPress={()=>router.push('/screens/profileoptions')}
        >
          <Entypo name="dots-three-vertical" style={styles.icon}/>
        </TouchableOpacity>

        {/* Image */}
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
              {readMoreDescription || myDescription.length <= descriptionMaxLength ? myDescription : truncatedDescription}
              {myDescription.length > descriptionMaxLength && (
                <Text 
                  onPress={() => setReadMoreDescription(!readMoreDescription)} 
                  style={readMoreDescription ? [styles.readMoreLess, { color: "#c2021b" }] : styles.readMoreLess}
                >
                  {readMoreDescription ? ' show less' : ' read more'}
                </Text>
              )} 
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.profileSubrow}>

        <TouchableOpacity style={styles.subHeaderContainer} onPress={()=>router.push('/profile/editprofile')}>
          <Text style={styles.subHeader}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>router.push('/screens/realtorratings')} style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>
            View Ratings
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ProfileHead;