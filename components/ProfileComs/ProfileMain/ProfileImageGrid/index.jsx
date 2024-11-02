import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { router} from 'expo-router'

const ProfileImageGrid = ({post}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>router.push(`/profile/${post.id}`)}>
          <View style={styles.imageContainer}>
          {/* Image */}
          <Image source={{uri: post.media[0]}} style={styles.image}/>
          </View>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileImageGrid;