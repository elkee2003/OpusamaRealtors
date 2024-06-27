import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { Link } from 'expo-router'

const ProfileImageGrid = ({post}) => {
  return (
    <View style={styles.container}>
        <Link href={`/profile/${post.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.imageContainer}>
                {/* Image */}
                <Image source={{uri: post.image[0]}} style={styles.image}/>
                </View>
            </TouchableOpacity>
        </Link>
    </View>
  )
}

export default ProfileImageGrid