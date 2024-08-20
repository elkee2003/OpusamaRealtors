import { View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles'
import { useUploadContext } from '../../../providers/UploadProvider'

const Shop = () => {

    const {
        propertyType, setPropertyType,
        type, setType,
        customInput, setCustomInput,
    } = useUploadContext()

    const [isFocus, setIsFocus] = useState(false);

    const shopData = [
        { label: 'Retail Store', value: 'Retail Store' },
        { label: 'Boutique', value: 'Boutique' },
        { label: 'Department Store', value: 'Department Store' },
        { label: 'Supermarket', value: 'Supermarket' },
        { label: 'Convenience Store', value: 'Convenience Store' },
        { label: 'Pop-up Shop', value: 'Pop-up Shop' },
        { label: 'Mall Kiosk', value: 'Mall Kiosk' },
        { label: 'Specialty Store', value: 'Specialty Store' },
        { label: 'Thrift Store', value: 'Thrift Store' },
        { label: 'Outlet Store', value: 'Outlet Store' },
        { label: 'Franchise Store', value: 'Franchise Store' },
        { label: 'Pharmacy', value: 'Pharmacy' },
        { label: 'Bakery', value: 'Bakery' },
        { label: 'Coffee Shop', value: 'Coffee Shop' },
        { label: 'Bookstore', value: 'Bookstore' },
        { label: 'Flower Shop', value: 'Flower Shop' },
        { label: 'Pet Shop', value: 'Pet Shop' },
        { label: 'Furniture Store', value: 'Furniture Store' },
        { label: 'Hardware Store', value: 'Hardware Store' },
        { label: 'Art Gallery', value: 'Art Gallery' },
        {label:'Other', value:'Other'},
    ]

    const handleCustomInputSubmit = () => {
      if (type === 'Other' && customInput.trim()) {
          setType(customInput.trim());
      }
    };

  return (
    <View>
      {propertyType === 'Shop' && ( 
            <>
              <Text style={styles.labelTxt}>Shop Type</Text>
              <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: '#0f238a' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={shopData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select Shop Type' : '...'}
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
                  placeholder="Enter Shop Type"
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

export default Shop;