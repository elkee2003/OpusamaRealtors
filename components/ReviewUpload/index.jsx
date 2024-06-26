import { View, Text, Pressable, FlatList, Image, TouchableOpacity,ScrollView } from 'react-native'
import React,{useState,useRef, useCallback, useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';
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
    const [showControls, setShowControls] = useState(false);
    
     // This useFocusEffect is to pause the video, when navigating to another screen
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

      // Toggle controls visibility on interaction
      const toggleControls = () => {
          setShowControls(true);
          // Reset the timer to hide controls after 3 seconds of inactivity
          clearTimeout(controlTimer);
          controlTimer = setTimeout(() => {
              setShowControls(false);
          }, 3000); // Adjust the duration (in milliseconds) as needed
      };
    // Function to handle play/pause, fastward and rewind below

    // Function to handle play/pause a video
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
      toggleControls(); // Show controls when playing/pausing
    };

    // Function to handle fastforward a video
    const handleFastForward = async (index) => {
      const videoRef = videoRefs.current[index];
      const status = await videoRef.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = status.positionMillis + 5000; // fast forward by 5 seconds
        await videoRef.setPositionAsync(newPosition);
      }
      toggleControls(); // Show controls when fast forwarding
    };

    // Function to handle rewinding a video
    const handleRewind = async (index) => {
      const videoRef = videoRefs.current[index];
      const status = await videoRef.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.max(status.positionMillis - 5000, 0); // rewind by 5 seconds
        await videoRef.setPositionAsync(newPosition);
      }
      toggleControls(); // Show controls when rewinding
    };

    // Function to calculate video length
    const getVideoLength = async (index) => {
      const videoRef = videoRefs.current[index];
      const status = await videoRef.getStatusAsync();
      return status.durationMillis;
    };

    // Timer to hide controls after a period of inactivity
    let controlTimer;

    useEffect(() => {
      // Initial setup: hide controls after a delay
      controlTimer = setTimeout(() => {
          setShowControls(false);
      }, 3000); // Adjust the duration (in milliseconds) as needed

      return () => {
          clearTimeout(controlTimer); // Clear the timer on unmount
      };
    }, []);

    // Function Render Items for Flatlist
    const renderItem = ({item, index})=>{

    // if statement for the main function
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