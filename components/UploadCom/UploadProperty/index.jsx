import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, {useState} from 'react';
import * as Crypto from 'expo-crypto';
import * as ImageManipulator from 'expo-image-manipulator';
import ReviewUpload from '../ReviewUpload';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { router } from 'expo-router';
import { useAuthContext } from '@/providers/AuthProvider';
import { useUploadContext } from '@/providers/UploadProvider';
import { DataStore } from 'aws-amplify/datastore';
import { uploadData} from 'aws-amplify/storage';
import { Post} from '../../../src/models';

const UploadProperty = () => {

    const {dbUser, sub} = useAuthContext();

    const {
        propertyType, setPropertyType, type, setType, nameOfType, setNameOfType, availableDocs, setAvailableDocs, 
        // customInput, setCustomInput,
        accommodationParts, setAccommodationParts, media, setMedia, description, setDescription, bedrooms, setBedrooms, bed, setBed, cautionFee, setCautionFee, timeFrame, setTimeFrame, inspectionFee, setInspectionFee, price, setPrice, totalPrice, setTotalPrice, country, setCountry, state, setState, city, setCity, address, setAddress, lat, setLat, lng, setLng, amenities, setAmenities, policies, setPolicies, uploadPost, setUploadPost, onValidateUpload
    } = useUploadContext();

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Reset form fields function:
    const resetFormFields = () => {
        setPropertyType('');
        setType('');
        setNameOfType('');
        setAvailableDocs('');
        setAccommodationParts('');
        setMedia([]);
        setDescription('');
        setAddress('');
        setLat(null);
        setLng(null);
        setBedrooms('');
        setBed('');
        setCautionFee(''),
        setTimeFrame('')
        setPrice('');
        setInspectionFee('')
        setTotalPrice('');
        setCountry('');
        setState('');
        setCity('');
        setPolicies('');
        setAmenities('');
    };

    const uploadImages = async () => {
        try {
            const uploadPromises = media.map(async (item) => {
                // Resize and compress image
                const manipulatedImage = await ImageManipulator.manipulateAsync(
                    item.uri,
                    [{ resize: { width: 600 } }],  // Adjust width as needed
                    { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG } // Compress quality between 0 and 1
                );
    
                const response = await fetch(manipulatedImage.uri);
                const blob = await response.blob();
    
                const fileKey = `public/media/${sub}/${Crypto.randomUUID()}.jpg`;
    
                const result = await uploadData({
                    path: fileKey,
                    data: blob,
                    options: {
                        contentType: 'image/jpeg',
                        onProgress: ({ transferredBytes, totalBytes }) => {
                            if (totalBytes) {
                                const progress = Math.round((transferredBytes / totalBytes) * 100);
                                setUploadProgress(progress); // Update upload progress
                                console.log(`Upload progress: ${progress}%`);
                            }
                        }
                    }
                }).result;
    
                return result.path;
            });
    
            // Wait for all upload promises to complete
            const mediaUrls = await Promise.all(uploadPromises);
            return mediaUrls;
        } catch (e) {
            console.log('Error uploading files:', e);
            Alert.alert('Upload Error', 'Failed to upload media. Please try again.');
            return [];
        }
    };

    // Handle the upload process for all media and save post in DataStore
    const handleUpload = async () =>{
        if (uploading) return;
        setUploading(true);

        if (!onValidateUpload()) {
            setUploading(false); // Reset the uploading state if validation fails
            return;
        }

        try{

            const mediaUrls = await uploadImages();

            if (mediaUrls.length === 0) {
                Alert.alert('Error', 'Failed to upload media. Please try again.');
                setUploading(false);
                return;
            }

            const post = await DataStore.save(new Post({
                propertyType,
                type,
                nameOfType,
                availableDocs,
                accommodationParts,
                media: mediaUrls,
                description,
                available:true,
                address,
                lat: parseFloat(lat), 
                lng: parseFloat(lng),
                // lat: 2.2,
                // lng:3.4,
                timeFrame,
                inspectionFee: parseFloat(inspectionFee),
                cautionFee: parseFloat(cautionFee),
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

            // Reset fields after upload
            resetFormFields();

            // Navigate to /share first
            router.push('/share');

            // Delay the navigation to /home if needed
            setTimeout(() => {
                router.push('/home');
            }, 500);
        }catch(e){
            Alert.alert('Upload Error', `Error uploading post: ${e.message}`)
            console.log(e.message)
        }finally {
            setUploading(false);
        }
    };

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
        <TouchableOpacity style={styles.btnUpload} onPress={handleUpload} disabled={uploading}>
            <Text style={styles.uploadTxt}>{uploading ? `Uploading... ${uploadProgress}%` : 'Upload!'}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default UploadProperty;