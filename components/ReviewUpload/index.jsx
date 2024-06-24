import { View, Text, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'
import { useUploadContext } from '../../providers/UploadProvider'

const ReviewUpload = () => {

    const {apartmentType, 
        roomNumbers,
        buildingParts, 
        description, 
        rent, 
        totalRent, 
        media, 
        coverPhoto, setCoverPhoto,
        location, setLocation, onUpload
    } = useUploadContext()

  return (
    <View style={styles.container}>
      {/* Displaying Input Data */}
        <View style={styles.inputDisplay}>
            <Text style={styles.displayLabel}>Apartment Type:</Text>
            <Text>{apartmentType}</Text>
            
            <Text style={styles.displayLabel}>Rent:</Text>
            <Text>{rent}</Text>
            
            <Text style={styles.displayLabel}>Total Rent:</Text>
            <Text>{totalRent}</Text>
            
            <Text style={styles.displayLabel}>Number of Rooms:</Text>
            <Text>{roomNumbers}</Text>
            
            <Text style={styles.displayLabel}>Building Parts:</Text>
            <Text>{buildingParts}</Text>
            
            <Text style={styles.displayLabel}>Description:</Text>
            <Text>{description}</Text>
        </View>
        <Pressable onPress={onUpload} style={styles.btnUpload}>
          <Text style={styles.uploadTxt}>Upload!</Text>
        </Pressable>
    </View>
  )
}

export default ReviewUpload