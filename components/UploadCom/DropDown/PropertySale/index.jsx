import { View, Text, TextInput } from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import { useUploadContext } from '@/providers/UploadProvider';

const index = () => {

    const {
        propertyType, setPropertyType,
        type, setType,
        accommodationParts, setAccommodationParts,
        bedrooms, setBedrooms,
        availableDocs, setAvailableDocs,
        customInput, setCustomInput,
    } = useUploadContext()

    const [isFocus, setIsFocus] = useState(false);

    const landData = [
        { label: 'Residential Land', value: 'Residential Land' },
        { label: 'Commercial Land', value: 'Commercial Land' },
        { label: 'Industrial Land', value: 'Industrial Land' },
        { label: 'Agricultural Land', value: 'Agricultural Land' },
        { label: 'Mixed-Use Land', value: 'Mixed-Use Land' },
        { label: 'Recreational Land', value: 'Recreational Land' },
        { label: 'Forest Land', value: 'Forest Land' },
        { label: 'Vacant Land', value: 'Vacant Land' },
        { label: 'Development Land', value: 'Development Land' },
        { label: 'Brownfield Land', value: 'Brownfield Land' },
        { label: 'Greenfield Land', value: 'Greenfield Land' },
        { label: 'Wetland', value: 'Wetland' },
        {label:'Other', value:'Other'},
    ]

    const houseSaleData = [
        { label: 'Self Contain', value: 'Self Contain' },
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

    const handleCustomInputSubmit = () => {
        if (type === 'Other' && customInput.trim()) {
            setType(customInput.trim());
        }
    };

  return (
    <View>
      {propertyType === 'Land Sale' && ( 
            <>
                <Text style={styles.labelTxt}>Land Type</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#0f238a' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={landData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Land Type' : '...'}
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
                    placeholder="Enter Land Type"
                    value={customInput}
                    onChangeText={setCustomInput}
                    onBlur={handleCustomInputSubmit} // Update the type state when the user submits the custom input
                />
                )}

                {/* Available Docs */}
                <Text style={styles.labelTxt}>Available Documents:</Text>
                <TextInput
                    style={styles.input}
                    value={availableDocs}
                    onChangeText={setAvailableDocs}
                    placeholder='Kindly input necessary and available documents'
                    multiline
                />
            </>
        )}
      {propertyType === 'House Sale' && ( 
            <>
                <Text style={styles.labelTxt}>House Type</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#0f238a' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={houseSaleData}
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

                {/* Available Docs */}
                <Text style={styles.labelTxt}>Available Documents:</Text>
                <TextInput
                    style={styles.input}
                    value={availableDocs}
                    onChangeText={setAvailableDocs}
                    placeholder='Kindly input necessary and available documents'
                    multiline
                />
            </>
        )}
    </View>
  )
}

export default index;