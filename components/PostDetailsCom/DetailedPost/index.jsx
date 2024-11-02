import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import {router} from 'expo-router'
import React from 'react'
import styles from './styles'
import { FontAwesome6 } from '@expo/vector-icons';

const DetailedPost = ({post}) => {

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>router.push(`/screens/fullview/${post.id}`)}>
          <View style={styles.imageContainer}>
            {/* Image */}
            <Image source={{uri: post.media[0]}} style={styles.image}/>
          </View>
        </TouchableOpacity>

        <View style={styles.sub}>
          {/* Bed & Bedrooms */}
          <Text style={styles.bedroom}>A {post.bed} Bedroom Apartment</Text>

          {/* Location */}
          <Text style={styles.location}>{post.location}</Text>
        </View>

        {/* Username */}
        <View style={styles.contact}>
          <FontAwesome6 name="person" size={24} color="black" />
          <Text style={styles.name}>{post.username}</Text>
        </View>

        {/* Type & Description */}
        <Text style={styles.description} >{post.description}</Text>

        {/* Rent */}
        <View style={styles.priceRow}>
          <Text style={styles.sub}>Rent: </Text>
          <Text style={styles.price}> 
            ₦{post.rent} / year
          </Text>
        </View>

        {/* Total Price */}
        <View style={styles.priceRowTotal}>
          <Text style={styles.sub}>Total:</Text>
          <Text style={styles.totalPrice}>
             {''}₦{post.totalRent}
          </Text>
        </View>
      </View>
      
    
  )
}

export default DetailedPost;