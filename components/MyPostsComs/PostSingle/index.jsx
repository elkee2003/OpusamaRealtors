import { View, Text, Image, SafeAreaView, Pressable } from 'react-native';
import { router } from 'expo-router';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import DefaultImage from '../../../assets/images/defaultImage.png';
import { FontAwesome6 } from '@expo/vector-icons';
import { getUrl } from 'aws-amplify/storage';

const PostSingle = ({post}) => {

  const [imageUris, setImageUris] = useState([]);

   // Fetch signed URLs for each image in post.media
   const fetchImageUrls = async () => {
    try {
      const urls = await Promise.all(
        post.media.map(async (path) => {
          const result = await getUrl({
            path,
            options: {
              validateObjectExistence: true, 
              expiresIn: null, // No expiration limit
            },
          });
  
          // Use `result.url` 
          return result.url.toString(); 

        })
      );
  
      const validUrls = urls.filter(url => url !== null);
      setImageUris(validUrls);
    } catch (error) {
      console.error('Error fetching image URLs:', error);
    }
  };

  useEffect(()=>{
    if (post.media?.length > 0) {
      fetchImageUrls();
    }
  }, [post.media])

  return (
      <View style={styles.container}>
          <Pressable onPress={()=>router.push(`/home/${post.id}`)}>
            <View style={styles.imageContainer}>
              {/* Image */}
              {imageUris[0] ? ( 
                <Image source={{uri: imageUris[0]}} style={styles.image}/>
              ) : (
                <Image source={DefaultImage} style={styles.image} />
              )}
            </View>
          </Pressable>

        <View style={styles.sub}>
          {/* Property Type */}
          {
            post.propertyType && (
              <Text style={styles.bedroom}>
                {post.propertyType}
              </Text>
            )
          }

          {/* Bed & Bedrooms */}
          {post.bedrooms && (
            <Text style={styles.bedroom}>
              {post.bedrooms} {post.propertyType === 'House' ? 'Bedroom Apartment' : 'Bedroom'} 
            </Text>
          )}

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
            { post.propertyType === 'Hotel / Shortlet' 
              ? `₦ ${post.price?.toLocaleString()} / night` 
              : (post.propertyType === 'House Sale' || post.propertyType === 'Land Sale')
                ? `₦ ${post.price?.toLocaleString()}`
                : `₦ ${post.price?.toLocaleString()} / year`
            }
          </Text>
        </View>

        {/* Total Price */}
        <View style={styles.priceRowTotal}>
          <Text style={styles.sub}>Total:</Text>
          <Text style={styles.totalPrice}>
             {''}₦{post.totalPrice.toLocaleString()}
          </Text>
        </View>
      </View>
      
    
  )
}

export default PostSingle;