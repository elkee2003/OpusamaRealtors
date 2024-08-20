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

    const {
        propertyType,
        type,
        availableDocs, 
        bedroom,
        beds,
        accommodationParts, 
        description, 
        price, 
        totalPrice, 
        country,
        state,
        location,
        city,
        media,
        policies,
        amenities, 
        onUpload
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
    // Function to handle play/pause a video
  const handlePlayPause = async (index)=>{
    const videoRef = videoRefs.current[index];
    if(videoRef){
      try {
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
        toggleControls(index); // Show controls when playing/pausing
        }catch(error){
          console.error('Error playing/pausing video:', error);
        }
    }
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
                ref={ref => (videoRefs.current[index] = ref)}
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
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>Review</Text>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backIconContainer} onPress={()=>{router.back()}}>
        <Ionicons name="arrow-back" style={styles.icon} />
      </TouchableOpacity>

      <ScrollView horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.mediaFullDisplayContainer}>
        {
          media.map((item, index)=>(
            <View key={index} style={styles.mediaContainer}>
              {item.type && item.type.includes('image') && (
                <Image source={{uri:item.uri}} style={styles.media}/>
              )}
              {item.type && item.type.includes('video') && (
                <View style={styles.videoWrapper}>
                  <Video
                    ref={(ref)=>(videoRefs.current[index]= ref)}
                    source={{uri:item.uri}}
                    style={styles.media}
                    useNativeControls={false}
                    resizeMode='contain'
                    isLooping
                  />
                  {/* Controls container */}
                  <View style={styles.videoOverlayContainer}>
                    <TouchableOpacity style={styles.videoOverlayLeft} onPress={() => handleRewind(index)} />
                    <TouchableOpacity style={styles.videoOverlayCenter} onPress={() => handlePlayPause(index)} />
                    <TouchableOpacity style={styles.videoOverlayRight} onPress={() => handleFastForward(index)} />
                  </View>
                </View>
              )}
            </View>
          ))
        }
      </ScrollView>

      {/* Displaying Input Data */}
      <View style={styles.inputDisplay}>
        <View style={styles.row}>
          <Text style={styles.displayLabel}>Property Type:</Text>
          <Text style={styles.inputReview}>{propertyType}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.displayLabel}>Property Sub Type:</Text>
          <Text style={styles.inputReview}>{type}</Text>
        </View>

        {availableDocs && <View style={styles.row}>
          <Text style={styles.displayLabel}>Available Documents:</Text>
          <Text style={styles.inputReview}>{availableDocs}</Text>
        </View>}

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>Location:</Text>
          <Text style={styles.inputReview}>{location}</Text>
        </View>

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>City:</Text>
          <Text style={styles.inputReview}>{city}</Text>
        </View>

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>State:</Text>
          <Text style={styles.inputReview}>{state}</Text>
        </View>

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>Country:</Text>
          <Text style={styles.inputReview}>{country}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.displayLabel}>Price:</Text>
          <Text style={styles.inputReview}>₦{price}</Text>
        </View>
          
        <View style={styles.row}>
          <Text style={styles.displayLabel}>Total Price:</Text>
          <Text style={styles.inputReview}>₦{totalPrice}</Text>
        </View>

        {bedroom && <View style={styles.row}>  
          <Text style={styles.displayLabel}>Number of Rooms:</Text>
          <Text style={styles.inputReview}>{bedroom}</Text>
        </View>}

        {beds && <View style={styles.row}>  
          <Text style={styles.displayLabel}>Number of Beds:</Text>
          <Text style={styles.inputReview}>{beds}</Text>
        </View>}
          
        {accommodationParts && <View style={styles.row}>
          <Text style={styles.displayLabel}>Accommodation Parts:</Text>
          <Text style={styles.inputReview}>{accommodationParts}</Text>
        </View>}

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>Description:</Text>
          <Text style={styles.inputReview}>{description}</Text>
        </View>

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>Amenities:</Text>
          <Text style={styles.inputReview}>{amenities}</Text>
        </View>

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>Policies:</Text>
          <Text style={styles.inputReview}>{policies}</Text>
        </View>
        
      </View>

        <Pressable onPress={onUpload} style={styles.btnUpload}>
          <Text style={styles.uploadTxt}>Upload!</Text>
        </Pressable>
    </ScrollView>
  )
}

export default ReviewUpload