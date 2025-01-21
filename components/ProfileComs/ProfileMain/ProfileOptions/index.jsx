import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import styles from './style';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { signOut } from 'aws-amplify/auth';

const ProfileOptionsPage = () => {

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
          'Are you sure you want to sign out?',
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

        {/* Title */}
        <Text style={styles.header}>Settings & Privacy</Text>

        {/* Buttons */}
        <ScrollView 
            showsVerticalScrollIndicator={false}
        >
            <TouchableOpacity 
                style={styles.btnRow}
                onPress={()=>router.push('/profile/editprofile')}
            >
                <Foundation name="page-edit" style={styles.icon} />
                <Text style={styles.txt}>
                    Edit Profile
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.btnRow}
                onPress={()=>router.push('/screens/profileoptions/profilebuttons/support')}
            >
                <MaterialIcons name="support-agent" style={styles.icon} />
                <Text style={styles.txt}>
                    Support
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.btnRow}
                onPress={()=>router.push('/screens/termsandconditions')}
            >
                <Foundation name="page" style={styles.icon} />
                <Text style={styles.txt}>
                    Terms and Conditions
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.btnRow}
                onPress={()=>router.push('/screens/privacypolicy')}
            >
                <MaterialIcons name="policy" style={styles.icon} />
                <Text style={styles.txt}>
                    Privacy Policy
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.btnRow}
                onPress={onSignout}
            >
                <AntDesign name="logout" style={styles.icon} />
                <Text style={styles.txt}>
                    Sign Out
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.btnRow}
                onPress={()=>router.push('/screens/profileoptions/profilebuttons/deleteaccount')}
            >
                <AntDesign name="delete" style={styles.icon} />
                <Text style={styles.txt}>
                    Delete Account
                </Text>
            </TouchableOpacity>
        </ScrollView>
    </View>
  )
}

export default ProfileOptionsPage