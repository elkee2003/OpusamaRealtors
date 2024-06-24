import { View, Text, TextInput, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import InputForms from '../Forms'

const Upload = () => {

    const [apartmentType, setApartmentType] = useState('')
    const [roomNumbers, setRoomNumbers] = useState('')
    const [buildingParts, setBuildingParts] = useState('')
    const [description, setDescription] = useState('')
    const [rent, setRent] = useState('')
    const [totalRent, setTotalRent] = useState('')
    const [media, setMedia] = useState([])
    const [location, setLocation]= useState('')

    const [errors, setErrors] = useState('')

    // Validation of Inputs
    const validateInput = ()=>{
      setErrors('')
      
      if(!apartmentType){
        setErrors('Apartment Type is Required')
        return false;
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
        setErrors('Describtion is required')
        return false;
      }
      return true;
    }

    // uploadFunction:
    // const onUpload = () =>{
    //   if (!validateInput()){
    //     return;
    //   }
    //   console.warn('Uploadng Apartment:', apartmentType)
    // }
    const onUpload = () => {
      if (validateInput()) {
          console.warn('Uploading Apartment:', apartmentType)
      }
  }

  return (
    <View style={styles.container} >
        <InputForms 
            apartmentType={apartmentType} setApartmentType={setApartmentType}
            roomNumbers={roomNumbers} setRoomNumbers={setRoomNumbers}
            buildingParts={buildingParts} setBuildingParts={setBuildingParts}
            description={description} setDescription={setDescription}
            rent={rent} setRent={setRent}
            totalRent={totalRent} setTotalRent={setTotalRent}
            media={media} setMedia={setMedia}
            location={location} setLocation={setLocation}
            errors={errors} setErrors={setErrors}
            onUpload={onUpload}
        />
    </View>
  )
}

export default Upload