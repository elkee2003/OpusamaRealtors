import { View, Text, ScrollView, TextInput, Pressable,Image} from 'react-native'
import React,{useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'

const InputForms = () => {
    const [apartmentType, setApartmentType] = useState('')
    const [roomNumbers, setRoomNumbers] = useState('')
    const [buildingParts, setBuildingParts] = useState('')
    const [description, setDescription] = useState('')
    const [rent, setRent] = useState('')
    const [totalRent, setTotalRent] = useState('')
    const [image, setImage] = useState('')
    const [location, setLocation]= useState('')

    const [errors, setErrors] = useState('')

    // Pick Image Function
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        } else {
          alert('You did not select any image.');
        }
    };

    // Validation of Inputs
    const validateInput = ()=>{
        setErrors('')
        if (!apartmentType){
          setErrors('Apartment Type is required')
          false;
        }
        if(!rent){
          setErrors('Rent Amount is Required')
          return false;
        }
        if(isNaN(parseFloat(rent))){
          setErrors('Rent is not a number')
          return false;
        }
        if(isNaN(parseFloat(totalRent))){
          setErrors('Total Rent is not a number')
          return false;
        }
        if(!roomNumbers){
          setErrors('Number of Rooms is required')
          return false;
        }
        if(!description){
          setErrors('Kindly Describe the apartment')
          false;
        }
        return true;
    }

    // uploadFunction:
    const onUpload = () =>{
        if (!validateInput){
          return;
        }
        console.warn('Uploadng Apartment:', apartmentType)
    }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        {/* Upload House */}
        <View style={styles.imageUploadContainer}>
            <Image style={styles.image} source={{uri:image || null}}/>
        </View>
        <Pressable onPress={pickImageAsync}>
            <Text style={styles.imgUploadTxt}>Upload Image</Text>
        </Pressable>
        

        <Text style={styles.label}>Apartment Type:</Text>
        <TextInput
        style={styles.input}
        value={apartmentType}
        onChangeText={setApartmentType}
        placeholder='Apartment Type eg: Bungalow'
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
    <Pressable onPress={validateInput} style={styles.btnUpload}>
        <Text style={styles.uploadTxt}>Upload!</Text>
    </Pressable>
    </ScrollView>
  )
}

export default InputForms