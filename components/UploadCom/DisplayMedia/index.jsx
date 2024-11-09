import { View, Text, Pressable, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import React, {useState,useRef, useCallback, useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles'
import { Video } from 'expo-av';
import { useUploadContext } from '@/providers/UploadProvider'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const DisplayMedia = () => {

  const {media, removeMedia} = useUploadContext()
  
  // function to go to forms
  const goToForms =()=>{
    if(media.length >= 3){
     router.push('/share/forms')
     return true; 
    }else{
      Alert.alert('Kindly add more media files')
      return false;
    }
  }

  // function to remove particular media
  const handleRemove =(index)=>{
    removeMedia(index);

  }

  return (
    <View style={styles.container}>
      {/* Icon Container */}
      <View style={styles.iconContainer}>

        {/* Back Icon */}
        <TouchableOpacity style={styles.backIconContainer} onPress={()=>{router.back()}}>
          <Ionicons name="arrow-back" style={styles.icon} />
        </TouchableOpacity>

        {/* Forward Icon */}
        <TouchableOpacity style={styles.forwardIconContainer} onPress={goToForms}>
          <Ionicons name="arrow-forward" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={media}
        keyExtractor={(item, index)=>index.toString()}
        horizontal={true}
        showsVerticalScrollIndicator={false}  
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mediaFullDisplayContainer}
        renderItem={({item, index})=>(
          <View style={styles.mediaContainer}>
            <Image source={{uri: item.uri}} style={styles.media}/>
            
            <TouchableOpacity onPress={() => handleRemove(index)} style={styles.removeButtonContainer}>
              <MaterialIcons style={styles.removebtn}  name="cancel" />
              {/* <FontAwesome style={styles.removebtn} name="remove" /> */}
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  )
}

export default DisplayMedia;