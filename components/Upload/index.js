import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'

const Upload = () => {
    
    const [apartmentType, setApartmentType] = useState('')
    const [roomNumbers, setRoomNumbers] = useState('')
    const [buildingParts, setBuildingParts] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [gallery, setGallery] = useState([])
    const [location, setLocation]= useState('')

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      value={apartmentType}
      onChangeText={setApartmentType}
      placeholder='Type of Apartment'
      />
      <TextInput
      style={styles.input}
      value={roomNumbers}
      onChangeText={setRoomNumbers}
      placeholder='Number Of Rooms'
      />
      <TextInput
      style={styles.input}
      value={buildingParts}
      onChangeText={setBuildingParts}
      placeholder='eg: 2 parlours, 3 kitchens'
      />
      <TextInput
      style={styles.input}
      value={description}
      onChangeText={setDescription}
      placeholder='Kindly describe the Apartment'
      />
      <Text>Hello</Text>
    </View>
  )
}

export default Upload