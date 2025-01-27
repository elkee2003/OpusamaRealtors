import { View, Text, TextInput } from 'react-native';
import React, {useState} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useUploadContext } from '@/providers/UploadProvider';
import styles from './styles';

const Recreation = () => {
    
    const {propertyType, 
          type, setType,
          packageType, setPackageType,
          customInput, setCustomInput,
        } = useUploadContext();

    const [isFocus, setIsFocus] = useState(false);

    const recreationData = [
        {label:'Gym & Fitness Center', value:'Gym & Fitness Center'},
        {label:'Yoga', value:'Yoga'},
        { label: 'Spa & Wellness Center', value: 'Spa & Wellness Center' },
        {label:'Park & Garden', value:'Parks & Garden'},
        {label:'Swimming Pool', value:'Swimming Pool'},
        {label:'Cinema', value:'Cinema'},
        {label:'Zoo', value:'Zoo'},
        {label:'Aquarium', value:'Aquarium'},
        { label: 'Skating Rink', value: 'Skating Rink' },
        { label: 'Paint Ball', value: 'Paint Ball' },
        { label: 'Football: 5 Aside', value: 'Football: 5 Aside' },
        { label: 'Football Pitch', value: 'Football Pitch' },
        { label: 'Basketball Court', value: 'Basketball Court' },
        { label: 'Boat Rental', value: 'Boat Rental' },
        { label: 'Boat Cruise', value: 'Boat Cruise' },
        { label: 'Horseback Riding', value: 'Horseback Riding' },
        {label:'Beach & Waterfront', value:'Beach & Waterfront'},
        {label:'Amusement Park', value:'Amusement Park'},
        {label:'Playground & Kiddie Park', value:'Playground & Kiddie Park'},
        {label:'Hiking Trail', value:'Hiking Trail'},
        { label: 'Art Gallery', value: 'Art Gallery' },
        { label: 'Cultural & Art Center', value: 'Cultural & Art Center' },
        {label:'Karate Dojo', value:'Karate Dojo'},
        { label: 'Golf Course', value: 'Golf Course' },
        { label: 'Mini Golf', value: 'Mini Golf' },
        { label: 'Arcade', value: 'Arcade' },
        { label: 'Bowling Alley', value: 'Bowling Alley' },
        { label: 'Meditation Garden', value: 'Meditation Garden' },
        {label:'Other', value:'Other'},
    ]

    const handleCustomInputSubmit = () => {
        if (type === 'Other' && customInput.trim()) {
            setType(customInput.trim());
        }
    };
  return (
    <View>
        {propertyType === 'Recreation' && ( 
            <>
                <Text style={styles.labelTxt}>Recreation Type</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#0f238a' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={recreationData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Recreation Type' : '...'}
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
                    placeholder="Enter Recreation Type"
                    value={customInput}
                    onChangeText={setCustomInput}
                    onBlur={handleCustomInputSubmit} // Update the type state when the user submits the custom input
                />
                )}

                {/* Package Type */}
                <Text style={styles.labelTxt}>Package:</Text>
                <TextInput
                    style={styles.input}
                    value={packageType}
                    onChangeText={setPackageType}
                    placeholder='Exculsive,Premium, Standard, VIP, VVIP, etc... (type of package) (optional)'
                    multiline
                />
            </>
        )}
    </View>
  )
}

export default Recreation;