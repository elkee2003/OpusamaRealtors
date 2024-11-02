import { View, Text, ScrollView, TextInput, Pressable,} from 'react-native';
import React, {useState} from 'react';
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
    
    const {
      propertyType, setPropertyType,
      type, setType,
      availableDocs, setAvailableDocs,
      accommodationParts, setAccommodationParts,
      description, setDescription,
      bedrooms, setBedrooms,
      bed, setBed,
      price, setPrice,
      totalPrice, setTotalPrice,
      country, setCountry,
      state, setState,
      city, setCity,
      address, setAddress,
      amenities, setAmenities,
      policies, setPolicies,
      errors, onValidate, media,
      } = useUploadContext()

     const goToReview = ()=>{
      if(onValidate()){
        router.push('/share/review')
      }
     }

    // Function to format numbers with commas
    const formatNumberWithCommas = (value) => {
      // Remove any non-digit characters
      const numericValue = value.replace(/\D/g, '');
      // Format the number with commas
      return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handlePriceChange = (value) => {
      const formattedValue = formatNumberWithCommas(value);
      setPrice(formattedValue);
    };
    const handleTotalPriceChange = (value) => {
      const formattedValue = formatNumberWithCommas(value);
      setTotalPrice(formattedValue);
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
          onChangeText={handlePriceChange}
          placeholder='Price'
          keyboardType='numeric'
          multiline
          />
        </View>

        <View>
          <Text style={styles.label}>Total Price:</Text>
          <TextInput
          style={styles.genInput}
          value={totalPrice}
          onChangeText={handleTotalPriceChange}
          placeholder='Total Price'
          keyboardType='numeric'
          multiline
          />
        </View>
      </View>
      
      <Text style={styles.label}>Address:</Text>
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
   
      

      <Text style={styles.error}>
        {errors}
      </Text>

      {/* Button */}
      <Pressable onPress={goToReview} style={styles.btnReview}>
          <Text style={styles.btnReviewTxt}>Review</Text>
      </Pressable>

    </ScrollView>
  )
}

export default Forms;