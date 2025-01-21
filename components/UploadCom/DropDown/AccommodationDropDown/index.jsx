import { View, Text, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useUploadContext } from '@/providers/UploadProvider';
import styles from './styles';

const AccommodationDropDown = () => {

    const {propertyType, setPropertyType,
      type, setType,
      nameOfType, setNameOfType,
      customInput, setCustomInput,
      accommodationParts, setAccommodationParts,
      bedrooms, setBedrooms,
      bed, setBed,
    } = useUploadContext()

    const [isFocus, setIsFocus] = useState(false);
    

    const propertyTypes = [
      { label: 'House Rent', value: 'House Rent' },
      { label: 'Hotel / Shortlet', value: 'Hotel / Shortlet' },
      { label: 'House Sale', value: 'House Sale' },
      { label: 'Land Sale', value: 'Land Sale' },
      { label: 'Office Space', value: 'Office Space' },
      // { label: 'Shop', value: 'Shop' },
      { label: 'Student Accommodation', value: 'Student Accommodation' },
      
    ];

    const houseData = [
      { label: 'Self Contain', value: 'Self Contain' },
      { label: 'One Bedroom', value: 'One Bedroom' },
      { label: 'Two Bedroom', value: 'Two Bedroom' },
      { label: 'Three Bedroom', value: 'Three Bedroom' },
      { label: 'Five Bedroom', value: 'Five Bedroom' },
      { label: 'Bungalow', value: 'Bungalow' },
      { label: 'Duplex', value: 'Duplex' },
      { label: 'Single-Family Home', value: 'Single-Family Home' },
      { label: 'Condominium (Condo)', value: 'Condominium (Condo)' },
      { label: 'Chalet', value: 'Chalet' },
      { label: 'Apartment', value: 'Apartment' },
      { label: 'Ranch House', value: 'Ranch House' },
      { label: 'Cottage', value: 'Cottage' },
      { label: 'Villa', value: 'Villa' },
      { label: 'Mansion', value: 'Mansion' },
      { label: 'Cabin', value: 'Cabin' },
      { label: 'Farmhouse', value: 'Farmhouse' },
      { label: 'Other', value: 'Other' }, // Add "Other" option
    ]

    const hotelData = [
      {label:'Standard Room', value:'Standard Room'},
      {label:'Single Room', value:'Single Room'},
      {label:'Double Room', value:'Double Room'},
      { label: 'Bungalow', value: 'Bungalow' },
      { label: 'Duplex', value: 'Duplex' },
      {label:'Twin Room', value:'Twin Room'},
      {label:'Triple Room', value:'Triple Room'},
      {label:'Studio Room', value:'Studio Room'},
      {label:'Quad Room', value:'Quad Room'},
      {label:'Queen Room', value:'Queen Room'},
      {label:'King Room', value:'King Room'},
      {label:'Suite', value:'Suite'},
      {label:'Connecting Rooms', value:'Connecting Rooms'},
      {label:'Accessible Room', value:'Accessible Room'},
      {label:'Whole Floor', value:'Whole Floor'},
      {label:'Half Floor', value:'Half Floor'},
      {label:'Balcony/Terrace Room', value:'Balcony/Terrace Room'},
      {label:'Deluxe Room', value:'Deluxe Room'},
      {label:'Penthouse', value:'Penthouse'},
      {label: 'Other', value: 'Other' }, // Add "Other" option
    ]

    const studentData = [
      {label:'Single Room', value:'Single Room'},
      {label:'Single Shared Room', value:'Single Shared Room'},
      {label:'Double Room', value:'Double Room'},
      {label:'Suite-Style Room', value:'Suite-Style Room'},
      {label:'Off-Campus Apartment', value:'Off-Campus Apartment'},
      {label:'Studio Apartment (Off-Campus)', value:'Studio Apartment (Off-Campus'},
      {label:'One-Bedroom Apartment (Off-Campus)', value:'One-Bedroom Apartment (Off-Campus)'},
      {label:'Shared Apartment (Off-Campus)', value:'Shared Apartment (Off-Campus)'},
      {label:'House', value:'House'},
      {label:'Condo', value:'Condo'},
      {label:'Homestay', value:'Homestay'},
      {label:'University-Owned Apartment', value:'University-Owned Apartment'},
      {label:'Purpose-Built Student Accommodation (PBSA)', value:'Purpose-Built Student Accommodation (PBSA)'},
      {label:'Other', value:'Other'},
    ]

    const handleCustomInputSubmit = () => {
      if (type === 'Other' && customInput.trim()) {
          setType(customInput.trim());
      }
    };

  return (
    <View style={styles.container}>

        <Text style={styles.labelTxt}>Property Type</Text>
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: '#0f238a' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={propertyTypes}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Property Type' : '...'}
            searchPlaceholder="Search..."
            value={propertyType}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
            setPropertyType(item.value)
            setCustomInput('')
            setIsFocus(false);
            }}
        />

        {/* House */}
        {propertyType === 'House Rent' && (
          <>
            <Text style={styles.labelTxt}>Accommodation Type</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#0f238a' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={houseData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select House Type' : '...'}
                searchPlaceholder="Search..."
                value={type}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setType(item.value);
                    setIsFocus(false);
                }}
            />
            {type === 'Other' && (
              <TextInput
                  style={styles.customInput}
                  placeholder="Enter House Type"
                  value={customInput}
                  onChangeText={setCustomInput}
                  onBlur={handleCustomInputSubmit} // Update the type state when the user submits the custom input
              />
              )}

            {/* Accomodation Parts House */}
            <Text style={styles.labelTxt}>Accommodation Parts:</Text>
            <TextInput
            style={styles.input}
            value={accommodationParts}
            onChangeText={setAccommodationParts}
            placeholder='eg: 2 parlours, 3 kitchens (optional)'
            multiline
            />

            {/* General Info for Bedroom */}
            
            <View>
              <Text style={styles.labelTxt}>Bedrooms:</Text>
              <TextInput
              style={styles.input}
              value={bedrooms}
              onChangeText={setBedrooms}
              placeholder='Number of Bedrooms'
              keyboardType='numeric'
              />
            </View>
          </>
        )}

        {/* Hotel & Shortlet */}
        {propertyType === 'Hotel / Shortlet' && (
          <>
            <Text style={styles.labelTxt}>Accommodation Type</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#0f238a' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={hotelData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Hotel/Shortlet Type' : '...'}
                searchPlaceholder="Search..."
                value={type}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setType(item.value);
                    setIsFocus(false);
                }}
            />
            {type === 'Other' && (
              <TextInput
                  style={styles.customInput}
                  placeholder="Enter Hotel / Shortlet Type"
                  value={customInput}
                  onChangeText={setCustomInput}
                  onBlur={handleCustomInputSubmit} // Update the type state when the user submits the custom input
              />
            )}

            {/* Hotel  */}
            <Text style={styles.labelTxt}>Name of Accomodation:</Text>
            <TextInput
              style={styles.input}
              value={nameOfType}
              onChangeText={setNameOfType}
              placeholder='eg: Room 202 Lavenda (optional)'
            />

            {/* Accomodatino Parts Hotle/Shortlets */}
            <Text style={styles.labelTxt}>Accommodation Parts:</Text>
            <TextInput
            style={styles.input}
            value={accommodationParts}
            onChangeText={setAccommodationParts}
            placeholder='eg: 2 parlours, 3 kitchens (optional)'
            multiline
            />

            {/* General Info for Bedroom */}
            <View style={styles.generalRow}>
              <View>
                <Text style={styles.labelTxt}>Bedrooms:</Text>
                <TextInput
                style={styles.genInput}
                value={bedrooms}
                onChangeText={setBedrooms}
                placeholder='Number of Bedrooms'
                keyboardType='numeric'
                />
              </View>

              <View>
                <Text style={styles.labelTxt}>Beds:</Text>
                <TextInput
                style={styles.genInput}
                value={bed}
                onChangeText={setBed}
                placeholder='Number of Beds'
                keyboardType='numeric'
                />
              </View>
            </View>
          </>
        )}

        {/* Student Accommodation */}
        {propertyType === 'Student Accommodation' && (
          <>
            <Text style={styles.labelTxt}>Accommodation Type</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#0f238a' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={studentData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Student Accommodation Type' : '...'}
                searchPlaceholder="Search..."
                value={type}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setType(item.value);
                    setIsFocus(false);
                }}
            />
            {type === 'Other' && (
              <TextInput
                  style={styles.customInput}
                  placeholder="Enter Accommodation Type"
                  value={customInput}
                  onChangeText={setCustomInput}
                  onBlur={handleCustomInputSubmit} // Update the type state when the user submits the custom input
              />
              )}

            {/* Accomodation Parts House */}
            <Text style={styles.labelTxt}>Accommodation Parts:</Text>
            <TextInput
            style={styles.input}
            value={accommodationParts}
            onChangeText={setAccommodationParts}
            placeholder='eg: 2 parlours, 3 kitchens (optional)'
            multiline
            />
          </>
        )}
      
    </View>
    
  )
}

export default AccommodationDropDown

// {propertyType === 'Student Accomodation' && (
          
// )}

