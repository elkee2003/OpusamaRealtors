import { View, Text, Pressable, FlatList, Image, TouchableOpacity,ScrollView } from 'react-native'
import React,{useState,useRef, useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles'
import { useUploadContext } from '../../providers/UploadProvider'

const ReviewUpload = () => {

    const {apartmentType, 
        roomNumbers,
        buildingParts, 
        description, 
        rent, 
        totalRent, 
        media, 
        location, onUpload
    } = useUploadContext()

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

              {/* Controls container */}
            <View style={styles.videoOverlayContainer}>
              <TouchableOpacity style={styles.videoOverlayLeft} onPress={() => handleRewind(index)} />

              <TouchableOpacity style={styles.videoOverlayCenter} onPress={() => handlePlayPause(index)}/>

              <TouchableOpacity style={styles.videoOverlayRight} onPress={() => handleFastForward(index)} />
            </View>
            <TouchableOpacity style={styles.videoOverlayRight} onPress={() => handleFastForward(index)} />
          </View>
        </View>
    )
    }
    return null
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>Review</Text>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backIconContainer} onPress={()=>{router.back()}}>
        <Ionicons name="arrow-back" style={styles.icon} />
      </TouchableOpacity>

      {<FlatList
        data={media}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={renderItem}
        horizontal={true}
        showsVerticalScrollIndicator={false}  
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mediaFullDisplayContainer}
      />}

      {/* Displaying Input Data */}
      <ScrollView style={styles.inputDisplay}>
          <Text style={styles.displayLabel}>Apartment Type:</Text>
          <Text style={styles.inputReview}>{apartmentType}</Text>
          
          <Text style={styles.displayLabel}>Location:</Text>
          <Text style={styles.inputReview}>{location}</Text>

          <Text style={styles.displayLabel}>Rent:</Text>
          <Text style={styles.inputReview}>{rent}</Text>
          
          <Text style={styles.displayLabel}>Total Rent:</Text>
          <Text style={styles.inputReview}>{totalRent}</Text>
          
          <Text style={styles.displayLabel}>Number of Rooms:</Text>
          <Text style={styles.inputReview}>{roomNumbers}</Text>
          
          <Text style={styles.displayLabel}>Building Parts:</Text>
          <Text style={styles.inputReview}>{buildingParts}</Text>
          
          <Text style={styles.displayLabel}>Description:</Text>
          <Text style={styles.inputReview}>{description}</Text>
      </ScrollView>

        <Pressable onPress={onUpload} style={styles.btnUpload}>
          <Text style={styles.uploadTxt}>Upload!</Text>
        </Pressable>
    </View>
  )
}

export default ReviewUpload