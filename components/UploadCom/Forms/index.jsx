import { View, ScrollView, Text, TextInput, Pressable, TouchableOpacity} from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view';
import React, {useState, useEffect, useRef} from 'react'
import { Dropdown } from 'react-native-element-dropdown';
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
      inspectionFee, setInspectionFee,
      totalPrice, setTotalPrice,
      timeFrame, setTimeFrame,
      address, setAddress,
      setLat, setLng,
      amenities, setAmenities,
      policies, setPolicies,
      errors, onValidate, media,
      } = useUploadContext()

      const timeOptions = [
        { label: 'Night', value: 'Night' },
        { label: 'Week', value: 'Week' },
        { label: 'Month', value: 'Month' },
        { label: 'Year', value: 'Year' },
      ];

      

     const goToReview = ()=>{
      if(onValidate()){
        router.push('/share/review')
      }
     }

     


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

        {propertyType !== 'Hotel / Shortlet' && (
          <View>
            <Text style={styles.label}>Inspection Fee:</Text>
            <TextInput
              style={styles.genInput}
              value={inspectionFee}
              onChangeText={setInspectionFee}
              placeholder='Inspection Fee (Opt)'
              keyboardType='numeric'
              multiline
            />
          </View>
          )}

        {propertyType !== 'House Sale' && propertyType !== 'Land Sale' && (
          <View>
            <Text style={styles.label}>Time Frame:</Text>
            <Dropdown
                style={[styles.timeDropdown, isFocused && { borderColor: '#0f238a' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={timeOptions}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocused ? 'Select Time Frame' : '...'}
                searchPlaceholder="Search..."
                value={timeFrame}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={item => {
                setTimeFrame(item.value)
                setIsFocused(false);
                }}
            />
          </View>
        )}
        
        {/* </View> */}
        {/* <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder='Address'
        multiline
        /> */}


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