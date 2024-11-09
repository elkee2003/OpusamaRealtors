import { View, Text, Image, TouchableOpacity,ScrollView } from 'react-native'
import React,{useState,useRef, useCallback, useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';
import { useUploadContext } from '@/providers/UploadProvider';

const ReviewUpload = () => {

    const {
        propertyType,
        type,
        nameOfType,
        availableDocs, 
        bedrooms,
        bed,
        accommodationParts, 
        description, 
        price, 
        totalPrice, 
        country,
        state,
        address,
        city,
        media,
        policies,
        amenities, 
    } = useUploadContext()

     const displayPrice = price;
     const displayTotalPrice = totalPrice;

     const formattedPrice = Number(displayPrice).toLocaleString();
     const formattedTotalPrice = Number(displayTotalPrice).toLocaleString();
    
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

      <ScrollView horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.mediaFullDisplayContainer}>
        {media.map( (mediaItem, index)=>(
          <View key={index} style={styles.mediaContainer}>
            <Image source={{uri: mediaItem.uri}} style={styles.media}/>
          </View>
        )
      )}
      </ScrollView>

      {/* Displaying Input Data */}
      <ScrollView style={styles.inputDisplay}>
        <View style={styles.row}>
          <Text style={styles.displayLabel}>Property Type:</Text>
          <Text style={styles.inputReview}>{propertyType}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.displayLabel}>Property Sub Type:</Text>
          <Text style={styles.inputReview}>{type}</Text>
        </View>

        {nameOfType && (
          <View style={styles.row}>
            <Text style={styles.displayLabel}>Name of Accommodation:</Text>
            <Text style={styles.inputReview}>{nameOfType}</Text>
          </View>
        )}
        

        {availableDocs && <View style={styles.row}>
          <Text style={styles.displayLabel}>Available Documents:</Text>
          <Text style={styles.inputReview}>{availableDocs}</Text>
        </View>}

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>Address:</Text>
          <Text style={styles.inputReview}>{address}</Text>
        </View>

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>City:</Text>
          <Text style={styles.inputReview}>{city}</Text>
        </View>

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>State:</Text>
          <Text style={styles.inputReview}>{state}</Text>
        </View>

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>Country:</Text>
          <Text style={styles.inputReview}>{country}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.displayLabel}>Price:</Text>
          <Text style={styles.inputReview}>₦{formattedPrice}</Text>
        </View>
          
        <View style={styles.row}>
          <Text style={styles.displayLabel}>Total Price:</Text>
          <Text style={styles.inputReview}>₦{formattedTotalPrice}</Text>
        </View>

        {bedrooms && <View style={styles.row}>  
          <Text style={styles.displayLabel}>Number of Rooms:</Text>
          <Text style={styles.inputReview}>{bedrooms}</Text>
        </View>}

        {bed && <View style={styles.row}>  
          <Text style={styles.displayLabel}>Number of Beds:</Text>
          <Text style={styles.inputReview}>{bed}</Text>
        </View>}
          
        {accommodationParts && <View style={styles.row}>
          <Text style={styles.displayLabel}>Accommodation Parts:</Text>
          <Text style={styles.inputReview}>{accommodationParts}</Text>
        </View>}

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>Description:</Text>
          <Text style={styles.inputReview}>{description}</Text>
        </View>

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>Amenities:</Text>
          <Text style={styles.inputReview}>{amenities}</Text>
        </View>

        <View style={styles.row}>  
          <Text style={styles.displayLabel}>Policies:</Text>
          <Text style={styles.inputReview}>{policies}</Text>
        </View>
        
      </ScrollView>
    </ScrollView>
  )
}

export default ReviewUpload;