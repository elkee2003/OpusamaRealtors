import { View, Text } from 'react-native'
import React,{useState, createContext, useContext} from 'react'

const UploadContext = createContext({})

const UploadContextProvider = ({children}) => {

    const [apartmentType, setApartmentType] = useState('')
    const [roomNumbers, setRoomNumbers] = useState('')
    const [buildingParts, setBuildingParts] = useState('')
    const [description, setDescription] = useState('')
    const [rent, setRent] = useState('')
    const [totalRent, setTotalRent] = useState('')
    const [media, setMedia] = useState([])
    const [coverPhoto, setCoverPhoto] = useState('')
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


    // Function to remove media by index
    const removeMedia = (index) => {
      setMedia((prevMedia) => prevMedia.filter((_, idx) => idx !== index));
    };

    // Function for imageUpload Validation
    const imageUploadValidattion = ()=>{
      if (media.length <= 2) {
        setErrors('Kindly Upload At least 3 images');
        return false;
      }
      return true;
    }

    const onUpload = () => {
        console.warn('Uploading...')
    }

    const onValidate = ()=>{
        if (validateInput()) {
            console.warn('Uploading Apartment:', apartmentType)
            return true;
        }else{
          return false;
        }
    }

    const onImageUploadValidation= ()=>{
      if (imageUploadValidattion()){
        console.warn('image validated')
        return true;
      }else{
        return false;
      }
    }

  return (
    <UploadContext.Provider value={{
        apartmentType, setApartmentType,
        roomNumbers, setRoomNumbers,
        buildingParts, setBuildingParts,
        description, setDescription,
        rent, setRent,
        totalRent, setTotalRent,
        media, setMedia,
        coverPhoto, setCoverPhoto,
        location, setLocation,
        errors, setErrors,
        onUpload, onValidate, 
        onImageUploadValidation, removeMedia
    }}>
      {children}
    </UploadContext.Provider>
  )
}

export default UploadContextProvider

export const useUploadContext = () => useContext(UploadContext)