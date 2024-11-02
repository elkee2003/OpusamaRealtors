import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import ReviewUpload from '../ReviewUpload';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { router } from 'expo-router';
import { useAuthContext } from '@/providers/AuthProvider';
import { useUploadContext } from '@/providers/UploadProvider';
import { DataStore } from 'aws-amplify/datastore';
import { Post} from '../../../src/models';

const UploadProperty = () => {

    const {dbUser} = useAuthContext();

    const {
        propertyType, setPropertyType, type, setType, nameOfType, setNameOfType, availableDocs, setAvailableDocs, 
        // customInput, setCustomInput,
        accommodationParts, setAccommodationParts, media, setMedia, description, setDescription, bedrooms, setBedrooms, bed, setBed, price, setPrice, totalPrice, setTotalPrice, country, setCountry, state, setState, city, setCity, address, setAddress, lat, setLat, lng, setLng, amenities, setAmenities, policies, setPolicies, uploadPost, setUploadPost
    } = useUploadContext();

    const handleUpload = async () =>{
        try{

            const mediaUris = media.map((item) => item.uri);

            const post = await DataStore.save(new Post({
                propertyType,
                type,
                nameOfType,
                availableDocs,
                accommodationParts,
                media: mediaUris,
                description,
                available:true,
                address,
                lat: parseFloat(lat), 
                lng: parseFloat(lng),
                // lat: 2.2,
                // lng:3.4,
                price: parseFloat(price),
                totalPrice:parseFloat(totalPrice),
                bed,
                bedrooms, amenities,
                policies, country,
                state, city,
                realtorID: dbUser.id
            }))
            setUploadPost(post);
            Alert.alert('Successful', 'Post was uploaded successfully')

            setPropertyType('')
            setType('')
            setNameOfType('')
            setAvailableDocs('')
            setAccommodationParts('')
            setMedia([])
            setDescription('')
            setAddress('')
            setLat(null)
            setLng(null)
            setBedrooms('')
            setBed('')
            setPrice('')
            setTotalPrice('')
            setCountry('')
            setState('')
            setCity('')
            setPolicies('')
            setAmenities('')

            router.push('/home')
        }catch(e){
            Alert.alert('Error Uploading', e.message)
        }
    }

  return (
    <View style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>
            Review
        </Text>

        {/* Back Icon */}
        <TouchableOpacity style={styles.backIconContainer} onPress={()=>{router.back()}}>
            <Ionicons name="arrow-back" style={styles.icon} />
        </TouchableOpacity>

        {/* Review Details */}
        <ReviewUpload/>

        {/* Button */}
        <TouchableOpacity onPress={handleUpload}  style={styles.btnUpload}>
            <Text style={styles.uploadTxt}>Upload!</Text>
        </TouchableOpacity>
    </View>
  )
}

export default UploadProperty;