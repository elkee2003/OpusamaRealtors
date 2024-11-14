import { View, Text, ScrollView, TextInput, Pressable, TouchableOpacity} from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view';
import React, {useState, useEffect, useRef} from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '@/keys';
import { Ionicons } from '@expo/vector-icons';
import { useUploadContext } from '@/providers/UploadProvider';
import AccommodationDropDown from '../DropDown/AccommodationDropDown';
import CountryDropDown from '../DropDown/CountryDropDown';
import PropertySale from '../DropDown/PropertySale';
import WriteDescription from '../DropDown/Description';
import OfficeSpace from '../DropDown/OfficeSpace';
import Shop from '../DropDown/Shop';
import { router} from 'expo-router';
import styles from './styles'

const Forms = () => {

    const [isFocused, setIsFocused] = useState(false);

    const autocompleteRef = useRef(null)
    
    const {
      propertyType, setPropertyType,
      type, setType,
      cautionFee, setCautionFee,
      price, setPrice,
      totalPrice, setTotalPrice,
      address, setAddress,
      setLat, setLng,
      amenities, setAmenities,
      policies, setPolicies,
      errors, onValidate, media,
      } = useUploadContext()

      // function to clear autocompleter
    const handleClearAddress = () => {
      autocompleteRef.current?.clear(); // Clear the autocomplete input
      setAddress(null);
    };

     const goToReview = ()=>{
      if(onValidate()){
        router.push('/share/review')
      }
     }

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

    // Function to update totalPrice whenever cautionFee or price changes
    useEffect(() => {
        const updatedTotalPrice = parseFloat(cautionFee || 0) + parseFloat(price || 0);
        setTotalPrice(updatedTotalPrice.toFixed(2));
    }, [cautionFee, price]);

  return (
    <View 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
  
      <Text style={styles.header}>Property Details</Text>

      <ScrollView 
        showsVerticalScrollIndicator={false}  
      >
        <AccommodationDropDown/>

        {propertyType === 'Land Sale' && <PropertySale/>}

        {propertyType === 'House Sale' && <PropertySale/>}

        {propertyType === 'Office Space' && <OfficeSpace/>}

        {/* {propertyType === 'Shop' && <Shop/>} */}
        
        {/* General Info for Price */}
        <View style={styles.generalRow}>
          <View>
            <Text style={styles.label}>Price:</Text>
            <TextInput
              style={styles.genInput}
              value={price}
              onChangeText={setPrice}
              placeholder='Price'
              keyboardType='numeric'
              multiline
            />
          </View>
          {propertyType !== 'House Sale' && propertyType !== 'Land Sale' && (
            <View>
              <Text style={styles.label}>Caution Fee:</Text>
              <TextInput
                style={styles.genInput}
                value={cautionFee}
                onChangeText={setCautionFee}
                placeholder='Caution Fee'
                keyboardType='numeric'
                multiline
              />
            </View>
          )}
        </View>
        
        <Text style={styles.label}>Address:</Text>
        {/* Googleplaces autocomplete */}
        {/* <View style={isFocused ? styles.gContainerFocused : styles.gContainer}>
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
              />
              <TouchableOpacity onPress={handleClearAddress} style={styles.clearIconContainer}>
                  <Ionicons name='close-circle' style={styles.clearIcon}/>
              </TouchableOpacity>
        </View> */}
        <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder='Address'
        multiline
        />


        {/* Country and State */}
        <CountryDropDown/>

        <WriteDescription/>

      </ScrollView>
   
      

      <Text style={styles.error}>
        {errors}
      </Text>

      {/* Button */}
      <Pressable onPress={goToReview} style={styles.btnReview}>
          <Text style={styles.btnReviewTxt}>Review</Text>
      </Pressable>

    </View>
  )
}

export default Forms;