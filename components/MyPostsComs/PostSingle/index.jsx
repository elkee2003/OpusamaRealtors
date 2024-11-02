import { View, Text, Image, SafeAreaView, Pressable } from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import styles from './styles';
import { FontAwesome6 } from '@expo/vector-icons';

const PostSingle = ({post}) => {

  return (
      <View style={styles.container}>
          <Pressable onPress={()=>router.push(`/profile/${post.id}`)}>
            <View style={styles.imageContainer}>
              {/* Image */}
              <Image source={{uri: post.media[0]}} style={styles.image}/>
            </View>
          </Pressable>

        <View style={styles.sub}>
          {/* Bed & Bedrooms */}
          <Text style={styles.bedroom}>{post.bed} Bedroom Apartment</Text>

          {/* Location */}
          <Text style={styles.location}>{post.address}</Text>
        </View>

        {/* Username */}
        <View style={styles.contact}>
          <FontAwesome6 name="person" size={24} color="black" />
          <Text style={styles.name}>{post.firstName}</Text>
        </View>

        {/* Type & Description */}
        <Text style={styles.description} numberOfLines={2} >{post.description}</Text>

        {/* Rent */}
        <View style={styles.priceRow}>
          <Text style={styles.sub}>Price: </Text>
          <Text style={styles.price}> 
            ₦{post.price} / year
          </Text>
        </View>

        {/* Total Price */}
        <View style={styles.priceRowTotal}>
          <Text style={styles.sub}>Total:</Text>
          <Text style={styles.totalPrice}>
             {''}₦{post.totalPrice}
          </Text>
        </View>
      </View>
      
    
  )
}

export default PostSingle;