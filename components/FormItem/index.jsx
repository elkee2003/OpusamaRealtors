import { View, Text, TextInput } from 'react-native'
import React from 'react'

const index = () => {

    const [apartmentType, setApartmentType] = useState('')

  return (
    <View>
        <TextInput
            style={styles.input}
            value={apartmentType}
            onChangeText={setApartmentType}
            placeholder='Apartment Type eg: Bungalow'
        />
    </View>
  )
}

export default index