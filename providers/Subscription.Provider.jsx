import { View, Text } from 'react-native'
import React, {useContext,createContext, useState} from 'react'

const SubscriptionContext = createContext({})

const SubscriptionContextProvider = ({children}) => {

    const [subsciption, setSubscription] = useState([])
    
  return (
    <SubscriptionContext.Provider>
        {children}
    </SubscriptionContext.Provider>
  )
}

export default SubscriptionContextProvider;

export const useSubscriptionContext = ()=> useContext(SubscriptionContext)