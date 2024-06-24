import { View, Text, ScrollView, TextInput, Pressable,} from 'react-native'
import React from 'react'
import { useUploadContext } from '../../providers/UploadProvider';
import { router} from 'expo-router';
import styles from './styles'

const Forms = () => {

    const {apartmentType, setApartmentType,
      roomNumbers, setRoomNumbers,
      buildingParts, setBuildingParts,
      description, setDescription,
      rent, setRent,
      totalRent, setTotalRent,
      media, setMedia,
      coverPhoto, setCoverPhoto,
      location, setLocation,
      errors, onValidate
      } = useUploadContext()

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.label}>Apartment Type:</Text>
      <TextInput
      style={styles.input}
      value={apartmentType}
      onChangeText={setApartmentType}
      placeholder='Apartment Type'
      />

      <Text style={styles.label}>Rent:</Text>
      <TextInput
      style={styles.input}
      value={rent}
      onChangeText={setRent}
      placeholder='Rent Amount'
      keyboardType='numeric'
      />

      <Text style={styles.label}>Total Rent:</Text>
      <TextInput
      style={styles.input}
      value={totalRent}
      onChangeText={setTotalRent}
      keyboardType='numeric'
      placeholder='Amount of Additional Things (Optional)'
      />

      <Text style={styles.label}>Number of Rooms:</Text>
      <TextInput
      style={styles.input}
      value={roomNumbers}
      onChangeText={setRoomNumbers}
      placeholder='Number Of Rooms'
      keyboardType='numeric'
      />

      <Text style={styles.label}>Building Parts:</Text> 
      <TextInput
      style={styles.input}
      value={buildingParts}
      onChangeText={setBuildingParts}
      placeholder='eg: 2 parlours, 3 kitchens'
      />
      <Text style={styles.label}>Description of Apartment:</Text>
      <TextInput
      style={styles.input}
      value={description}
      onChangeText={setDescription}
      placeholder='Kindly describe the Apartment'
      multiline
    />

    <Text style={styles.error}>{errors}</Text>

    {/* Button */}
    <Pressable onPress={()=>console.warn('rest')} style={styles.btnReview}>
        <Text style={styles.reviewTxt}>Review</Text>
    </Pressable>

    </ScrollView>
  )
}

export default Forms