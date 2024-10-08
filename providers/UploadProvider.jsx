import { View, Text } from 'react-native'
import React,{useState, createContext, useContext} from 'react'
import { router } from 'expo-router'

const UploadContext = createContext({})

const UploadContextProvider = ({children}) => {

    const [propertyType, setPropertyType]= useState('')
    const [type, setType] = useState('')
    const [availableDocs, setAvailableDocs] = useState('')
    const [customInput, setCustomInput] = useState('');
    const [accommodationParts, setAccommodationParts] = useState('')
    const [media, setMedia] = useState([])
    const [description, setDescription] = useState('')
    const [bedroom, setBedroom] = useState('')
    const [beds, setBeds] = useState('')
    const [price, setPrice] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState]= useState('')
    const [city, setCity] = useState('')
    const [location, setLocation]= useState('')
    const [amenities, setAmenities]= useState('')
    const [policies, setPolicies] = useState('')

    const [errors, setErrors] = useState('')

    // Validation of Inputs
    const validateInput = ()=>{
        setErrors('')

        // Common fields validation
        if (!propertyType) {
          setErrors('Property Type is Required');
          return false;
        }
        if (!type) {
          setErrors('Field under Property Type is Required');
          return false;
        }
        if (!price) {
          setErrors('Price is Required');
          return false;
        }
        if (!totalPrice) {
          setErrors('Total Price is Required');
          return false;
        }
        if (!country) {
          setErrors('Country is Required');
          return false;
        }
        if (!state) {
          setErrors('State is Required');
          return false;
        }
        if (!city) {
          setErrors('City is Required');
          return false;
        }
        if (!location) {
          setErrors('Location is Required');
          return false;
        }
        if (!description) {
          setErrors('Description is Required');
          return false;
        }
        if (!amenities) {
          setErrors('Amenities are Required');
          return false;
        }
        if (!policies) {
          setErrors('Policies are Required');
          return false;
        }

        // Specific validations for each property type
        if (propertyType === 'House') {
          if (!bedroom) {
            setErrors('Number of Bedrooms is Required');
            return false;
          }
        } else if (propertyType === 'Hotel / Shortlet') {
          if (!bedroom) {
            setErrors('Number of Bedrooms is Required');
            return false;
          }
          if (!beds) {
            setErrors('Number of Beds is Required');
            return false;
          }
        } else if (propertyType === 'House Sale') {
          if (!availableDocs) {
            setErrors('Available Documents are Required');
            return false;
          }
          if (!bedroom) {
            setErrors('Number of Bedrooms is Required');
            return false;
          }
        } else if (propertyType === 'Land Sale') {
          if (!availableDocs) {
            setErrors('Available Documents are Required');
            return false;
          }
        } else if (propertyType === 'Student Accommodation') {
          if (!accommodationParts) {
            setErrors('Accommodation Parts are Required');
            return false;
          }
        }

        // Price validations
        if (isNaN(parseFloat(price))) {
          setErrors('Price must be a number');
          return false;
        }

        if (isNaN(parseFloat(totalPrice))) {
          setErrors('Total Price must be a number');
          return false;
        }
        
        return true;
    };


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
            router.push('/share/review')
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
        propertyType, setPropertyType,
        type, setType,
        availableDocs, setAvailableDocs,
        customInput, setCustomInput,
        accommodationParts, setAccommodationParts,
        media, setMedia,
        description, setDescription,
        bedroom, setBedroom,
        beds, setBeds,
        price, setPrice,
        totalPrice, setTotalPrice,
        country, setCountry,
        state, setState,
        city, setCity,
        location, setLocation,
        errors, setErrors,
        amenities, setAmenities,
        policies, setPolicies,
        onUpload, onValidate, 
        onImageUploadValidation, removeMedia
    }}>
      {children}
    </UploadContext.Provider>
  )
}

export default UploadContextProvider

export const useUploadContext = () => useContext(UploadContext)