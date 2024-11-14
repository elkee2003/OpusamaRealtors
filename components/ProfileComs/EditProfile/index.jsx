import { View, Text, TextInput,Pressable, Alert, ScrollView, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { signOut } from 'aws-amplify/auth';
import {useProfileContext} from '@/providers/ProfileProvider';


const EditProfile = () => {

    const {firstName,setFirstName, lastName, setLastName, myDescription, setMyDescription, profilePic, setProfilePic, address, setAddress, phoneNumber, setPhoneNumber, bankname, setBankname, accountName, setAccountName, accountNumber, setAccountNumber, errorMessage, onValidateInput,} = useProfileContext();

    const [remainingWords, setRemainingWords] = useState(150);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setProfilePic(result.assets[0].uri);
      }
    };
    
    // Navigation Function
    const goToNxtPage = () => {
      if (onValidateInput()) {
          router.push('/profile/review'); // Navigate to the profile screen upon successful validation
      }
    };

    // Helper function to count words
    const countWords = (text) => text.trim().length;

    // Handle text change for myDescription with word limit
    const handleDescriptionChange = (text) => {
      const words = countWords(text);
      if (words <= 150) {
        setMyDescription(text);
        setRemainingWords(150 - words);
      }
    };

    // Signout function
    async function handleSignOut() {
      try {
        const res = await signOut();
        console.log(res)
      } catch (error) {
        console.log('error signing out: ', error);
      }
    };

    // Signout function from amplify
    const onSignout = ()=>{
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out? Click on YES, then refresh the App',
        [
          {
            text: "Cancel",
            style: "cancel",
            
          },
          {
            text: "Yes",
            onPress: () => handleSignOut(),
          },
        ],
        { cancelable: true }
      )
    };

    return (
    <View style={styles.container}>

      <Text style={styles.title}>Edit Profile</Text>

      {/* Upload Profile Picture */}
      <View style={styles.profilePicContainer}>
        {
          profilePic && <Image source={{ uri: profilePic }} style={styles.img} />
        }
        <View style={styles.plusIconContainer}>
        <TouchableOpacity onPress={pickImage}>
          <AntDesign style={styles.plusIcon} name="pluscircle"  />
        </TouchableOpacity>
        </View>
      </View>

      {/* Sign out button */}
      <TouchableOpacity style={styles.signoutBtn} onPress={onSignout}>
        <Text style={styles.signoutTxt}>Sign Out</Text>
      </TouchableOpacity>
        
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput 
          value={firstName}
          onChangeText={setFirstName}
          placeholder='Name / Company name'
          style={styles.input}
        />
        <TextInput 
          value={lastName}
          onChangeText={setLastName}
          placeholder='Surname (Optional)'
          style={styles.input}
        />

        <TextInput 
          value={myDescription}
          onChangeText={handleDescriptionChange}
          placeholder='A description of yourself(Optional)'
          style={styles.inputdescription}
          multiline
        />
        <Text style={styles.wordCount}> {remainingWords}</Text>

        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder='Phone Number'
          style={styles.input}
          keyboardType='numeric'
        />

        <TextInput 
          value={address}
          onChangeText={setAddress}
          placeholder='Address'
          style={styles.input}
        />

        <TextInput 
          value={bankname}
          onChangeText={setBankname}
          placeholder='Bank name'
          style={styles.input}
        />

        <TextInput 
          value={accountName}
          onChangeText={setAccountName}
          placeholder='Account name'
          style={styles.input}
        />
        
        <TextInput 
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholder='Account number'
          style={styles.input}
          keyboardType='numeric'
        />

        {/* Error Message */}
        <Text style={styles.error}>{errorMessage}</Text>
      </ScrollView>

      <TouchableOpacity onPress={goToNxtPage} style={styles.nxtBtn}>
        <MaterialIcons name="navigate-next" style={styles.nxtBtnIcon} />
      </TouchableOpacity>
      
    </View>
  )
}

export default EditProfile;