import { View, Text, Image } from 'react-native'
import React from 'react'
import feeds from '../../assets/data/feed'
import styles from './styles'

const Post = () => {

  const feed = feeds[0]
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{feed.username}</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.img} source={{uri:feed.image[0]}}/>
      </View>
      
      <Text style={styles.txt}>{feed.description}</Text>
      <Text style={styles.txt}>{feed.bedroom}</Text>
      <Text style={styles.txt}>{feed.newPrice}</Text>
      <Text style={styles.txt}>{feed.totalPrice}</Text>
      <Text style={styles.txt}>{feed.location}</Text>
    </View>
  )
}

export default Post;