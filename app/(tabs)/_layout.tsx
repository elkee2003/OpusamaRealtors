import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const TabsLayout= () => {
  return (
    <Tabs screenOptions={{
        headerShown:false
      }}>
        <Tabs.Screen 
        name='home'
        options={{
            tabBarLabel:'Home',
            tabBarIcon:({color})=><FontAwesome6 name="house-crack" size={24} color={color} />
        }}
        />
        <Tabs.Screen 
        name='share'
        options={{
            tabBarLabel:'Upload',
            tabBarIcon:({color})=><AntDesign name="pluscircle" size={24} color={color} />
        }}
        />
        <Tabs.Screen 
        name='alert'
        options={{
            tabBarLabel:'Alert',
            tabBarIcon:({color})=><Ionicons name="notifications" size={24} color={color} />
        }}
        />
        <Tabs.Screen 
        name='profile'
        options={{
            tabBarLabel:'Profile',
            tabBarIcon:({color})=> <Ionicons name="person-sharp" size={28} color={color} />
          }}
        />
    </Tabs>
  )
}

export default TabsLayout