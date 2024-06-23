import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import styles from './styles'
import { Link } from 'expo-router'

const ProfileImageGrid = ({post}) => {
  return (
    <View style={styles.container}>
        <Link href={`/profile/${post.id}`} asChild>
            <Pressable onPress={()=>console.warn('Check Post')}>
                <View style={styles.imageContainer}>
                {/* Image */}
                <Image source={{uri: post.image[0]}} style={styles.image}/>
                </View>
            </Pressable>
        </Link>
    </View>
  )
}

export default ProfileImageGrid