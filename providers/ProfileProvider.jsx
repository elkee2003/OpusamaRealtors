import { View, Text } from 'react-native'
import React, {useState, useContext, createContext} from 'react'

const ProfileContext = createContext({})

const ProfileContextProvider = ({children}) => {

    const [profilePic, setProfilePic] = useState(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState( "")
    const [phoneNumber, setPhoneNumber]= useState("")
    const [errorMessage, setErrorMessage] = useState('')

      const validateInput = () =>{
        setErrorMessage('')
        if(!firstName){
          setErrorMessage('First Name is Required')
          return false;
        }
        if(!address){
          setErrorMessage('Address is required')
          return false;
        }
        if(phoneNumber.length < 10){
          setErrorMessage('Kindly fill in Phone Number')
          return false;
        }
        return true;
      }

      const onValidateInput = () =>{
        if(validateInput()){
          return true;
        }else {
          return false;
        }
      }


  return (
    <ProfileContext.Provider value={{firstName,setFirstName, lastName, setLastName, address, setAddress, phoneNumber, setPhoneNumber, errorMessage, setErrorMessage, profilePic, setProfilePic, onValidateInput}}>
        {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider

export const useProfileContext = () => useContext(ProfileContext)