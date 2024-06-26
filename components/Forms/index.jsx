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
      location, setLocation,
      state, setState,
      city, setCity,
      errors, onValidate
      } = useUploadContext()

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.header}>Property Details</Text>

      <Text style={styles.label}>Apartment Type:</Text>
      <TextInput
      style={styles.input}
      value={apartmentType}
      onChangeText={setApartmentType}
      placeholder='Apartment Type'
      multiline
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
      style={styles.input}
      value={location}
      onChangeText={setLocation}
      placeholder='Location'
      multiline
      />

      <Text style={styles.label}>State:</Text>
      <TextInput
      style={styles.input}
      value={state}
      onChangeText={setState}
      placeholder='State'
      />

      <Text style={styles.label}>City:</Text>
      <TextInput
      style={styles.input}
      value={city}
      onChangeText={setCity}
      placeholder='State'
      />

      <Text style={styles.label}>Rent (₦):</Text>
      <TextInput
      style={styles.input}
      value={rent}
      onChangeText={setRent}
      placeholder='Rent Amount'
      keyboardType='numeric'
      />

      <Text style={styles.label}>Total Rent (₦):</Text>
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
      multiline
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
    <Pressable onPress={onValidate} style={styles.btnReview}>
        <Text style={styles.reviewTxt}>Review</Text>
    </Pressable>

    </ScrollView>
  )
}

export default Forms