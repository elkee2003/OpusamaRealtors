import { View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles'
import { useUploadContext } from '../../../providers/UploadProvider'

const OfficeSpace = () => {

    const {
        propertyType, setPropertyType,
        type, setType,
        customInput, setCustomInput,
    } = useUploadContext()

    const [isFocus, setIsFocus] = useState(false);

    const officeData = [
        { label: 'Private Office', value: 'Private Office' },
        { label: 'Coworking Space', value: 'Coworking Space' },
        { label: 'Executive Suite', value: 'Executive Suite' },
        { label: 'Virtual Office', value: 'Virtual Office' },
        { label: 'Meeting Room', value: 'Meeting Room' },
        { label: 'Hot Desk', value: 'Hot Desk' },
        { label: 'Dedicated Desk', value: 'Dedicated Desk' },
        { label: 'Serviced Office', value: 'Serviced Office' },
        { label: 'Open-plan Office', value: 'Open-plan Office' },
        { label: 'Team Office', value: 'Team Office' },
        { label: 'Creative Studio', value: 'Creative Studio' },
        { label: 'Training Room', value: 'Training Room' },
        { label: 'Shared Office', value: 'Shared Office' },
        { label: 'Industrial Office', value: 'Industrial Office' },
        { label: 'Subleased Office', value: 'Subleased Office' },
        { label: 'Startup Incubator', value: 'Startup Incubator' },
        {label:'Other', value:'Other'},
    ]

    const handleCustomInputSubmit = () => {
        if (type === 'Other' && customInput.trim()) {
            setType(customInput.trim());
        }
    };

  return (
    <View>
        {propertyType === 'Office Space' && ( 
            <>
                <Text style={styles.labelTxt}>Office Space Type</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#0f238a' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={officeData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Office Space Type' : '...'}
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
                    placeholder="Enter Office Space Type"
                    value={customInput}
                    onChangeText={setCustomInput}
                    onBlur={handleCustomInputSubmit} // Update the type state when the user submits the custom input
                />
                )}
            </>
        )}
    </View>
  )
}

export default OfficeSpace