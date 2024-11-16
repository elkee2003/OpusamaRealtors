import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, {useState} from 'react';
import * as Crypto from 'expo-crypto';
import * as ImageManipulator from 'expo-image-manipulator';
import {useProfileContext} from '@/providers/ProfileProvider';
import { useAuthContext } from '@/providers/AuthProvider';
import styles from './styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { DataStore } from 'aws-amplify/datastore';
import { uploadData } from 'aws-amplify/storage';
import {Realtor} from '@/src/models';

const ReviewDetails = () => {

    const {firstName, lastName, profilePic, address, phoneNumber, bankname, accountName, accountNumber, myDescription} = useProfileContext()

    const {dbUser, setDbUser, sub} = useAuthContext();

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);


    async function uploadImage() {
        try {

            const manipulatedImage = await ImageManipulator.manipulateAsync(
                profilePic,
                [{ resize: { width: 250 } }],  // Adjust width as needed
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compress quality between 0 and 1
            );
            const response = await fetch(manipulatedImage.uri);
            const blob = await response.blob();

            const fileKey = `public/profilePhoto/${Crypto.randomUUID()}.jpg`; // New path format

            const result = await uploadData({
                path: fileKey,
                data: blob,
                options:{
                    contentType:'image/jpeg', // contentType is optional
                    onProgress:({ transferredBytes, totalBytes }) => {
                        if(totalBytes){
                            const progress = Math.round((transferredBytes / totalBytes) * 100);
                            setUploadProgress(progress); // Update upload progress
                            console.log(`Upload progress: ${progress}%`);
                        }
                    }
                }
            }).result

            return result.path;  // Updated to return `path`
            } catch (err) {
            console.log('Error uploading file:', err);
            }
    }

    // Function to create and update realtor
    const createRealtor = async () =>{
        if (uploading) return;
        setUploading(true);
        try{
            const uploadedImagePath = await uploadImage();  // Upload image first

            const user = await DataStore.save(new Realtor({
                profilePic: uploadedImagePath,
                firstName, lastName, myDescription, address, phoneNumber, bankname, accountName, accountNumber,
                sub
            }))
            setDbUser(user)
        }catch(e){
            Alert.alert('Error', e.message)
        }finally {
            setUploading(false);
        }
    };

    const updateRealtor = async () =>{
        if (uploading) return;
        setUploading(true);
        try{
            const uploadedImagePath = await uploadImage();  // Upload image first

            const user = await DataStore.save(Realtor.copyOf(dbUser, (updated)=>{
                updated.firstName = firstName;
                updated.lastName = lastName;
                updated.myDescription = myDescription;
                updated.profilePic = uploadedImagePath;
                updated.address = address;
                updated.phoneNumber = phoneNumber;
                updated.bankname = bankname;
                updated.accountName = accountName,
                updated.accountNumber = accountNumber;
            }))
            setDbUser(user)
        }catch(e){
            Alert.alert('Error', e.message)
        }finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if(dbUser){
            await updateRealtor()
            router.push('/profile');

            setTimeout(() => {
                router.push('/home');
            }, 1000);
        }else {
            await createRealtor ()
            router.push('/profile');

            // setTimeout(() => {
            //     router.push('/home');
            // }, 1000);
        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Review Profile</Text>

        {/* Back Button */}
        <TouchableOpacity onPress={()=>router.back()} style={styles.bckBtnCon}>
                <Ionicons name={'arrow-back'} style={styles.bckBtnIcon}/>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
            {
                profilePic && ( 
                    <View style={styles.profilePicContainer}>
                        <Image source={{ uri: profilePic }} style={styles.img} />
                    </View>
                )
            }

            <Text style={styles.subHeader}>First Name:</Text>
            <Text style={styles.inputReview}>{firstName?.trim()}</Text>

            <Text style={styles.subHeader}>Last Name:</Text>
            <Text style={styles.inputReview}>{lastName?.trim()}</Text>

            <Text style={styles.subHeader}>My Description:</Text>
            <Text style={styles.inputReviewDesc}>{myDescription?.trim()}</Text>

            <Text style={styles.subHeader}>Address:</Text>
            <Text style={styles.inputReview}>{address?.trim()}</Text>

            <Text style={styles.subHeader}>Phone Number:</Text>
            <Text style={styles.inputReview}>{phoneNumber}</Text>

            <Text style={styles.subHeader}>Bank Name:</Text>
            <Text style={styles.inputReview}>{bankname?.trim()}</Text>

            <Text style={styles.subHeader}>Account Name:</Text>
            <Text style={styles.inputReview}>{accountName?.trim()}</Text>

            <Text style={styles.subHeader}>Account Number:</Text>
            <Text style={styles.inputReviewLast}>{accountNumber}</Text>
        </ScrollView>
        {/* Button */}
        <TouchableOpacity style={styles.saveBtn} disabled={uploading} onPress={handleSave}>
            <Text style={styles.saveBtnTxt}>{uploading ? `Saving... ${uploadProgress}%` : 'Save'}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ReviewDetails;