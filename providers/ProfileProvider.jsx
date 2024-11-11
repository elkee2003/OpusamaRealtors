import { View, Text } from 'react-native'
import React, {useState, useContext, createContext, useEffect} from 'react'
import {useAuthContext} from './AuthProvider';

const ProfileContext = createContext({})

const ProfileContextProvider = ({children}) => {

    const {dbUser} = useAuthContext()

    const [profilePic, setProfilePic] = useState(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [myDescription, setMyDescription] = useState("")
    const [address, setAddress] = useState( "")
    const [phoneNumber, setPhoneNumber]= useState("")
    const [bankname, setBankname]= useState("")
    const [accountName, setAccountName]= useState("")
    const [accountNumber, setAccountNumber]= useState("")
    const [errorMessage, setErrorMessage] = useState('')

      const validateInput = () =>{
        setErrorMessage('')
        if(!profilePic){
          setErrorMessage('Profile Photo is required')
          return false;
        }
        if(!firstName){
          setErrorMessage('First Name is Required')
          return false;
        }
        if(phoneNumber.length < 10){
          setErrorMessage('Kindly fill in Phone Number')
          return false;
        }
        if(!address){
          setErrorMessage('Address is required')
          return false;
        }
        if(!bankname){
          setErrorMessage('Bank name is required')
          return false;
        }
        if(!accountName){
          setErrorMessage('Account name is required')
          return false;
        }
        if(!accountNumber){
          setErrorMessage('Account number is required')
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

      useEffect(() => {
        if (dbUser) {
            setProfilePic(dbUser?.profilePic);
            setFirstName(dbUser.firstName || "");
            setLastName(dbUser.lastName || "");
            setMyDescription(dbUser.myDescription || "");
            setAddress(dbUser.address || "");
            setPhoneNumber(dbUser.phoneNumber || "");
            setBankname(dbUser.bankname || "");
            setAccountName(dbUser.accountName || "");
            setAccountNumber(dbUser.accountNumber || "");
        }
      }, [dbUser]); // This effect runs whenever dbUser changes


  return (
    <ProfileContext.Provider value={{firstName,setFirstName, lastName, setLastName, address, setAddress, phoneNumber, setPhoneNumber, bankname, setBankname, accountName, setAccountName, accountNumber, setAccountNumber, errorMessage, setErrorMessage, profilePic, setProfilePic, myDescription, setMyDescription, onValidateInput}}>
        {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider

export const useProfileContext = () => useContext(ProfileContext)