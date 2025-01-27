import { View, Text, TextInput } from 'react-native';
import React, {useState} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useUploadContext } from '@/providers/UploadProvider';
import styles from './styles';

const NightLife = () => {
    
    const {propertyType, 
        type, setType,
        packageType, setPackageType,
        customInput, setCustomInput,
        } = useUploadContext();

    const [isFocus, setIsFocus] = useState(false);

    const nightLifeData = [
        {label:'Bar & Lounge', value:'Bar & Lounge'},
        {label:'Night Club', value:'Night Club'},
        { label: 'Casino', value: 'Casino' },
        {label:'Live Music', value:'Live Music'},
        {label:'Sit Out', value:'Sit Out'},
        {label:'Theaters / Cinema', value:'Theaters / Cinema'},
        {label:'Comedy Club', value:'Comedy Club'},
        {label:'Karaoke Bar', value:'Karaoke Bar'},
        { label: 'Rooftop Bar', value: 'Rooftop Bar' },
        { label: 'Game & Arcade', value: 'Game & Arcade' },
        { label: 'Escape Room', value: 'Escape Room' },
        { label: 'Late-Night Cafe', value: 'Late-Night Cafe' },
        { label: 'Private Club', value: 'Private Club' },
        {label:'Other', value:'Other'},
    ];

    const handleCustomInputSubmit = () => {
        if (type === 'Other' && customInput.trim()) {
            setType(customInput.trim());
        }
    };
  return (
    <View>
        {propertyType === 'Nightlife' && ( 
            <>
                <Text style={styles.labelTxt}>Night Life Type</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#0f238a' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={nightLifeData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Nightlife Type' : '...'}
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
                    placeholder="Enter Nightlife Type"
                    value={customInput}
                    onChangeText={setCustomInput}
                    onBlur={handleCustomInputSubmit} // Update the type state when the user submits the custom input
                />
                )}

                {/* Available Docs */}
                <Text style={styles.labelTxt}>Package:</Text>
                <TextInput
                    style={styles.input}
                    value={packageType}
                    onChangeText={setPackageType}
                    placeholder='Exculsive, Premium, Standard, VIP, VVIP, etc... (type of package) (optional)'
                    multiline
                />
            </>
        )}
    </View>
  )
}

export default NightLife