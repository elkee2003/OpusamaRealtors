import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const UploadLayout = () => {
  return (
    <Stack screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name='index'/>
        <Stack.Screen name='review'/>
        <Stack.Screen name='pickmedia'/>
    </Stack>
  )
}

export default UploadLayout