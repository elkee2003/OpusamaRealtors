import { View, Text, ScrollView, TextInput, Pressable,} from 'react-native'
import React, {useState} from 'react'
import { useUploadContext } from '../../providers/UploadProvider';
import AccommodationDropDown from '../DropDown/AccommodationDropDown';
import CountryDropDown from '../DropDown/CountryDropDown';
import PropertySale from '../DropDown/PropertySale';
import WriteDescription from '../DropDown/Description';
import OfficeSpace from '../DropDown/OfficeSpace';
import Shop from '../DropDown/Shop';
import { router} from 'expo-router';
import styles from './styles'

const Forms = () => {
    
    const {
      propertyType, setPropertyType,
      type, setType,
      availableDocs, setAvailableDocs,
      accommodationParts, setAccommodationParts,
      description, setDescription,
      bedroom, setBedroom,
      beds, setBeds,
      price, setPrice,
      totalPrice, setTotalPrice,
      country, setCountry,
      state, setState,
      city, setCity,
      location, setLocation,
      amenities, setAmenities,
      policies, setPolicies,
      errors, onValidate
      } = useUploadContext()

    // Function to format numbers with commas
    const formatNumberWithCommas = (value) => {
      // Remove any non-digit characters
      const numericValue = value.replace(/\D/g, '');
      // Format the number with commas
      return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleRentChange = (value) => {
      const formattedValue = formatNumberWithCommas(value);
      setRent(formattedValue);
    };
    const handleTotalRentChange = (value) => {
      const formattedValue = formatNumberWithCommas(value);
      setTotalRent(formattedValue);
    };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
  
      <Text style={styles.header}>Property Details</Text>

      <AccommodationDropDown/>

      {propertyType === 'Land Sale' && <PropertySale/>}

      {propertyType === 'House Sale' && <PropertySale/>}

      {propertyType === 'Office Space' && <OfficeSpace/>}

      {propertyType === 'Shop' && <Shop/>}
      
      {/* General Info for Price */}
      <View style={styles.generalRow}>
        <View>
          <Text style={styles.label}>Price:</Text>
          <TextInput
          style={styles.genInput}
          value={price}
          onChangeText={setPrice}
          placeholder='Price'
          multiline
          />
        </View>

        <View>
          <Text style={styles.label}>Total Price:</Text>
          <TextInput
          style={styles.genInput}
          value={totalPrice}
          onChangeText={setTotalPrice}
          placeholder='Total Price'
          multiline
          />
        </View>
      </View>
      
      <Text style={styles.label}>Location:</Text>
      <TextInput
      style={styles.input}
      value={location}
      onChangeText={setLocation}
      placeholder='Location'
      multiline
      />
      {/* Country and State */}
      <CountryDropDown/>

      <WriteDescription/>
   
      

      <Text style={styles.error}>
        {errors}
      </Text>

      {/* Button */}
      <Pressable onPress={onValidate} style={styles.btnReview}>
          <Text style={styles.btnReviewTxt}>Review</Text>
      </Pressable>

    </ScrollView>
  )
}

export default Forms