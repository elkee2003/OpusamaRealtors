import { View, Text } from 'react-native'
import React, {useState, useEffect, useContext, createContext} from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { DataStore, Predicates } from 'aws-amplify/datastore'
import { Realtor } from '@/src/models'

const AuthContext = createContext({})

const AuthProvider = ({children}) => {

    // Amplify states
    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    const [sub, setSub] = useState(null);

    // Functions for useEffect
    const currentAuthenticatedUser = async () =>{
        try {
          const user = await getCurrentUser();
          setAuthUser(user)
          const subId = authUser?.userId;
          setSub(subId);
        } catch (err) {
          console.log(err);
        }
    }

    const dbCurrentUser = async () =>{
        try{
          const dbusercurrent = await DataStore.query(Realtor, (realtor)=>realtor.sub.eq(sub))
          // DataStore.delete(User, Predicates.ALL)
          // DataStore.clear()
          
          setDbUser(dbusercurrent[0])
        }catch(error){
          console.error('Error getting dbuser: ', error)
        }
    }

    // Set up a subscription to listen to changes on the current user's Courier instance
    useEffect(() => {
      if (!dbUser) return;
  
      const subscription = DataStore.observe(Realtor, dbUser.id).subscribe(
        ({ element, opType }) => {
          if (opType === 'UPDATE') {
            setDbUser(element);
          }
        }
      );
  
      return () => subscription.unsubscribe();
    }, [dbUser]);

    useEffect(()=>{
        currentAuthenticatedUser()
    },[sub])

    useEffect(()=>{
        if(!sub){
          return;
        }

        dbCurrentUser()
    }, [sub])

  return (
    <AuthContext.Provider value={{
        authUser, dbUser, setDbUser, sub
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useAuthContext = () => useContext(AuthContext);
