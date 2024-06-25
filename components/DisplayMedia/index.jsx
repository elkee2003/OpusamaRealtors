import { View, Text, Pressable, FlatList, Image, TouchableOpacity } from 'react-native'
import React, {useState,useRef, useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles'
import { Video } from 'expo-av';
import { useUploadContext } from '../../providers/UploadProvider'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const DisplayMedia = () => {

  const {media, removeMedia} = useUploadContext()
  const videoRefs = useRef([]);  // Array to hold references to Video components
  const [isPlaying, setIsPlaying] = useState([]);

  // This useFocusEffect is to pause the video, when navigate to another screen
  useFocusEffect(
    useCallback(() => {
      return () => {
        // Stop all videos when the screen loses focus
        videoRefs.current.forEach(async (videoRef) => {
          if (videoRef) {
            await videoRef.pauseAsync();
          }
        });
        setIsPlaying([]);
      };
    }, [])
  );
  
  // Function Render Items for Flatlist
  const renderItem = ({item, index})=>{

    // function to remove particular media
    const handleRemove =()=>{
      removeMedia(index);
    }

    const handlePlayPause = async (index)=>{
      const videoRef = videoRefs.current[index];
      if (isPlaying[index]){
        await videoRef.pauseAsync();
      }else {
        await videoRef.playAsync();
      }
      setIsPlaying((prev)=>{
        const newPlayingState = [...prev];
        newPlayingState[index] = !newPlayingState[index];
        return newPlayingState;
      });
    };

    const handleFastForward = async (index) => {
      const videoRef = videoRefs.current[index];
      const status = await videoRef.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = status.positionMillis + 10000; // fast forward by 10 seconds
        await videoRef.setPositionAsync(newPosition);
      }
    };

    const handleRewind = async (index) => {
      const videoRef = videoRefs.current[index];
      const status = await videoRef.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.max(status.positionMillis - 10000, 0); // rewind by 10 seconds
        await videoRef.setPositionAsync(newPosition);
      }
    };

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
          <View style={styles.videoWrapper}>
          {/* For pausing and playing videos */}
              <Video
                ref={(el)=>(videoRefs.current[index] = el)}
                source={{uri: item.uri}}
                style={styles.media}
                useNativeControls={false}
                resizeMode='contain'
                isLooping
              />

              {/* If I want to use an Icon to control the Pause and Play */}
              {/* <MaterialIcons style={styles.controlbtn} name={isPlaying[index] ? "pause" : "play-arrow"} /> */}

              {/* Controls container */}
            <View style={styles.videoOverlayContainer}>
              <TouchableOpacity style={styles.videoOverlayLeft} onPress={() => handleRewind(index)} />

              <TouchableOpacity style={styles.videoOverlayCenter} onPress={() => handlePlayPause(index)}/>

              <TouchableOpacity style={styles.videoOverlayRight} onPress={() => handleFastForward(index)} />
            </View>
            <TouchableOpacity style={styles.videoOverlayRight} onPress={() => handleFastForward(index)} />
          </View>
          {/* For the cancel button */}
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
    if(media.length >= 3){
     router.push('/share/forms')
     return true; 
    }else{
      return false;
    }
    
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