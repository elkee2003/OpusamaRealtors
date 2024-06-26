import { View, Text, Pressable, FlatList, Image, TouchableOpacity } from 'react-native'
import React, {useState,useRef, useCallback, useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles'
import { Video } from 'expo-av';
import { useUploadContext } from '../../providers/UploadProvider'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const DisplayMedia = () => {

  const {media, removeMedia} = useUploadContext()
  const videoRefs = useRef([]);  // Array to hold references to Video components
  const [isPlaying, setIsPlaying] = useState([]);
  const [showControlsState, setShowControlsState] = useState([]);
  const [videoDurations, setVideoDurations] = useState([]);
  const [videoPositions, setVideoPositions] = useState([]);

  // Initialize showControlsState based on number of media items
  useEffect(() => {
    setShowControlsState(Array(media.length).fill(false));
    setIsPlaying(Array(media.length).fill(false));
    setVideoDurations(Array(media.length).fill(0));
    setVideoPositions(Array(media.length).fill(0));
  }, [media]);

  // This useFocusEffect is to pause the video, when navigate to another screen
  useFocusEffect(
    useCallback(() => {
      return () => {
        // Stop all videos when the screen loses focus
        videoRefs.current.forEach(async (videoRef) => {
          if (videoRef) {
            try{
              await videoRef.pauseAsync();
            }catch(error){
              console.error("Error pausing video", error)
            }
          }
        });
        setIsPlaying([]);
        setShowControlsState(Array(media.length).fill(false));
      };
    }, [media])
  );

  // Toggle controls visibility on interaction for a specific video
  const toggleControls = (index) => {
    setShowControlsState((prev) => {
      const newShowControlsState = [...prev];
      newShowControlsState[index] = true;
      return newShowControlsState;
    });

  // Reset the timer to hide controls after 3 seconds of inactivity
  clearTimeout(controlTimers[index]);
  controlTimers[index] = setTimeout(() => {
    setShowControlsState((prev) => {
      const newShowControlsState = [...prev];
      newShowControlsState[index] = false;
      return newShowControlsState;
    });
  }, 3000); // Adjust the duration (in milliseconds) as needed
  };

  // Function to handle play/pause, fastward and rewind below

  // Function to handle play/pause a video
  const handlePlayPause = async (index)=>{
    const videoRef = videoRefs.current[index];
    try {if (isPlaying[index]){
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
  };

  // Function to handle fastforward a video
  const handleFastForward = async (index) => {
    const videoRef = videoRefs.current[index];
    try{
       const status = await videoRef.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = status.positionMillis + 5000; // fast forward by 5 seconds
        await videoRef.setPositionAsync(newPosition);
      }
      toggleControls(index); // Show controls when fast forwarding
    }catch(error){
      console.error('Error fastforwarding video:', error)
    }
   
  };

  // Function to handle rewinding a video
  const handleRewind = async (index) => {
    const videoRef = videoRefs.current[index];
    try{
      const status = await videoRef.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.max(status.positionMillis - 5000, 0); // rewind by 5 seconds
        await videoRef.setPositionAsync(newPosition);
      }
      toggleControls(index); // Show controls when rewinding
    }catch(error){
      console.error('Error rewinding video:', error)
    }
  };

  // Function to update video position and duration
  const updateVideoStatus = async (index) => {
    const videoRef = videoRefs.current[index];
    try{
        const status = await videoRef.getStatusAsync();
        if (status.isLoaded) {
          setVideoPositions((prev) => {
            const newVideoPositions = [...prev];
            newVideoPositions[index] = status.positionMillis;
            return newVideoPositions;
          });
          setVideoDurations((prev) => {
            const newVideoDurations = [...prev];
            newVideoDurations[index] = status.durationMillis;
            return newVideoDurations;
          });
      }
    }catch(error){
      console.error('Error updating video status:', error)
    }
  };

  // Timer to hide controls after a period of inactivity
  const controlTimers = useRef([])

  useEffect(() => {
    // Initialize controlTimers array
    controlTimers.current = Array(media.length).fill(null);

    // Update video status every second
    const progressTimers = media.map((_, index) => setInterval(() => {
      updateVideoStatus(index);
    }, 1000));

    return () => {
      progressTimers.forEach((timer) => clearInterval(timer)); // Clear the timers on unmount
      controlTimers.current.forEach((timer) => clearTimeout(timer));
    };
}, [media]);
  
  // Function Render Items for Flatlist
  const renderItem = ({item, index})=>{

    // function to remove particular media
    const handleRemove =()=>{
      removeMedia(index);
    }

    // if statement for the main function
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
                onTouchStart={()=> toggleControls(index)}
              />

              {/* If I want to use an Icon to control the Pause and Play */}
              {/* <MaterialIcons style={styles.controlbtn} name={isPlaying[index] ? "pause" : "play-arrow"} /> */}

              {/* Controls container */}
            {showControlsState[index] && <View style={styles.videoOverlayContainer}>
              <TouchableOpacity style={styles.videoOverlayLeft} onPress={() => handleRewind(index)} >
                <Entypo style={styles.controlbtn} name="controller-fast-backward"/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.videoOverlayCenter} onPress={() => handlePlayPause(index)}>
                <AntDesign style={styles.controlbtn} name={ isPlaying[index] ? "pause" : "playcircleo"} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.videoOverlayRight} onPress={() => handleFastForward(index)} >
                <Entypo style={styles.controlbtn} name="controller-fast-forward"/>
              </TouchableOpacity>
            </View>}

            {/* Progress bar */}
            {showControlsState[index] && (
                <View style={styles.progressBar}>
                    <View style={[styles.progress, { width: (videoPositions[index] / videoDurations[index]) * 100 + '%' }]} />
                </View>
            )}
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