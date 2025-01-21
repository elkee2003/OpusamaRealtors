import { View, Text, TouchableOpacity } from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles'
import { useUploadContext } from '@/providers/UploadProvider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '@/keys';
import { router } from 'expo-router';

const GooglePlacesAutoCompleteCom = () => {

  const [isFocused, setIsFocused] = useState(false);
  
  const autocompleteRef = useRef(null)
  
  const {
    address, setAddress,
    setLat, setLng,

  } = useUploadContext()

  // function to clear autocompleter
  const handleClearAddress = () => {
    autocompleteRef.current?.clear(); // Clear the autocomplete input
    setAddress(null);
  };

  // function to handle focus
  const handleFocusChange = (focused) => {
      setIsFocused(focused);
  };

  // Start Of GooglePlacesAutoComplete function
  const handlePlaceSelect = (data, details = null) => {
    // Extract the address from the selected place
    const selectedAddress = data?.description || details?.formatted_address;

    const selectedAddylat = JSON.stringify(details?.geometry?.location.lat) 

    const selectedAddylng = JSON.stringify(details?.geometry?.location.lng) 

    console.log(selectedAddylng, selectedAddylat)

    // Update the address state
    setAddress(selectedAddress);
    setLat(selectedAddylat)
    setLng(selectedAddylng)

  };

  useEffect(()=>{
    if(address){
      router.push('share/forms');
    }
  },[address])
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Address:</Text>
        {/* Googleplaces autocomplete */}
        {/* <View style={isFocused ? styles.gContainerFocused : styles.gContainer}> */}
      <GooglePlacesAutocomplete
      fetchDetails
      ref={autocompleteRef}
      placeholder='Select Address From Here'
      onPress={handlePlaceSelect}
      textInputProps={{
      onFocus:() => handleFocusChange(true),
      onBlur:() => handleFocusChange(false),
      
      }} 
      styles={{
      textInput:styles.gTextInput,
      textInputContainer:styles.gTextInputContainer,
      listView:styles.glistView,
      poweredContainer:styles.gPoweredContainer
      }}
      query={{
      key: GOOGLE_API_KEY,
      language: 'en',
      components: 'country:ng',
      }}
      renderRightButton={() => (
        <TouchableOpacity onPress={handleClearAddress} style={styles.clearIconContainer}>
          <Ionicons name='close-circle' style={styles.clearIcon}/>
        </TouchableOpacity>
      )}
      />
      
    </View>
  )
}

export default GooglePlacesAutoCompleteCom;