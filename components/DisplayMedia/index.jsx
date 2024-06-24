import { View, Text, Pressable, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { Video } from 'expo-av';
import { useUploadContext } from '../../providers/UploadProvider'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const DisplayMedia = () => {

  const {media, removeMedia} = useUploadContext()
  
  // Function Render Items for Flatlist
  const renderItem = ({item, index})=>{

    // function to remove particular media
    const handleRemove =()=>{
      removeMedia(index);
    }

    if(item.type && item.type.includes('image')){
      return (
        <View style={styles.mediaContainer}>
          <Image source={{uri: item.uri}} style={styles.media}/>
          <TouchableOpacity onPress={handleRemove}>
            <MaterialIcons style={styles.removebtn}  name="cancel" />
          </TouchableOpacity>
        </View>
      )
    }else if (item.type && item.type.includes('video')){
      return (
        <View style={styles.mediaContainer}>
          <Video
            source={{uri: item.uri}}
            style={styles.media}
            useNativeControls
            resizeMode='contain'
            isLooping
          />
          <TouchableOpacity onPress={handleRemove}>
            <MaterialIcons style={styles.removebtn} name="cancel"  />
          </TouchableOpacity>
        </View>
    )
    }
    return null
  };

  // function to go to forms
  const goToForms =()=>{
    router.push('/share/forms')
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

      {<FlatList
        data={media}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={renderItem}
        horizontal={true}
        showsVerticalScrollIndicator={false}  
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mediaFullDisplayContainer}
      />}

      {/* Map function of iterating over Media */}

      {/* <View style={styles.mediaUploadContainer}>
      {media && media.map((item, index) => (
        item.type && item.type.includes('image') ? (
          <Image key={index} style={styles.media} source={{ uri: item.uri }} />
        ) : item.type && item.type.includes('video') ? (
          <Video
            key={index}
            source={{ uri: item.uri }}
            style={styles.media}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        ) : null
      ))}
      </View> */}
    </View>
  )
}

export default DisplayMedia