import { View, ScrollView, Text, Image, SafeAreaView, TouchableOpacity, Alert, Switch} from 'react-native';
import {router} from 'expo-router';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import DefaultImage from '../../../assets/images/defaultImage.png';
import { FontAwesome6 } from '@expo/vector-icons';
import { DataStore } from 'aws-amplify/datastore';
import {useProfileContext} from '@/providers/ProfileProvider';
import { Post } from '@/src/models';
import { getUrl } from 'aws-amplify/storage';

const DetailedPost = ({post}) => {

  const {firstName} = useProfileContext()

  const [imageUris, setImageUris] = useState([]);
  const [isAvailable, setIsAvailable] = useState(post.available);

  // Function to handle post deletion
  const handleDeletePost = async () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Ensure the post exists before deleting
              const postToDelete = await DataStore.query(Post, post.id);
              if (postToDelete) {
                await DataStore.delete(postToDelete);
                Alert.alert("Success", "Post deleted successfully.");
                router.back(); // Navigate back after deletion
              } else {
                Alert.alert("Error", "Post not found.");
              }
            } catch (e) {
              Alert.alert("Error", `Failed to delete post: ${e.message}`);
            }
          },
        },
      ]
    );
  };

   // Function to handle the availability switch toggle
   const toggleAvailability = async () => {
    setIsAvailable((prev) => !prev);

    try {
      const updatedPost = Post.copyOf(post, (updated) => {
        updated.available = !post.available;
      });
      await DataStore.save(updatedPost);
    } catch (e) {
      Alert.alert("Error", `Failed to update availability: ${e.message}`);
    }
  };

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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={()=>router.push(`/screens/gallery/${post.id}`)}>
          <View style={styles.imageContainer}>
            {/* Image */}
            {imageUris[0] ? ( 
              <Image source={{uri: imageUris[0]}} style={styles.image}/>
            ) : (
              <Image source={DefaultImage} style={styles.image} />
            )}

          </View>
        </TouchableOpacity>

        {/* Availability Toggle */}
        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityText}>Available:</Text>
          <Switch
            value={isAvailable}
            onValueChange={toggleAvailability}
          />
        </View>

        {/* Username */}
        <View style={styles.contact}>
          <FontAwesome6 name="person" size={30} color="black" />
          <Text style={styles.name}>
            {firstName}
            <Text style={{color:'red'}}>firstName</Text>
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>

          <View style={styles.propertyDetails}>
            <Text style={styles.details}>
              {post.propertyType}
              <Text style={{color:'red'}}>propertype</Text>
            </Text>

            <Text style={styles.details}>
              {post.type}
              <Text style={{color:'red'}}>type</Text>
            </Text>
          </View>


          <Text style={styles.details}>
            {post.nameOfType}
            <Text style={{color:'red'}}>nameOfType</Text>
          </Text>


          <Text style={styles.details}>
            {post.availableDocs}
            <Text style={{color:'red'}}>availableDocs</Text>
          </Text>

        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.details}>
            {post.accommodationParts}
            <Text style={{color:'red'}}>accommodationParts</Text>
          </Text>

          <View style={styles.bedroomRow}>
            {/* Bed & Bedrooms */}
            <Text style={styles.details}>A {post.bedrooms} Bedroom
              <Text style={{color:'red'}}>bedrooms</Text>
            </Text>

            <Text style={styles.details}> 
              {post.bed} bed(s)
              <Text style={{color:'red'}}>Bed</Text>
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.header}>Location</Text>
          {/* Address */}
          <Text style={styles.details}>
            {post.address}
            <Text style={{color:'red'}}>address</Text>
          </Text>
          
          {/* Country, State, City */}
          <View>
            <Text style={styles.details}>
              {post.country}
              <Text style={{color:'red'}}>country</Text>
            </Text>

            <Text style={styles.details}>
              {post.state}
              <Text style={{color:'red'}}>state</Text>
            </Text>

            <Text style={styles.details}>
              {post.city}
              <Text style={{color:'red'}}>city</Text>
            </Text>
          </View>
        </View>

        {/* Type & Description */}
        <View style={styles.card}>
        <Text style={styles.header}>Description</Text>
          <Text style={styles.description} >
            {post.description}
            <Text style={{color:'red'}}>description</Text>
          </Text>
        </View>

        {/* Amenities and Policies */}
        <View style={styles.card}>
          
          <Text style={styles.header}>Luxuries</Text>
            <Text style={styles.details}>
              {post.amenities}
              <Text style={{color:'red'}}>amenities</Text>
            </Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.header}>Policies</Text>
            <Text style={styles.details}>
              {post.policies}
              <Text style={{color:'red'}}>policies</Text>
            </Text>
        </View>

        <View style={styles.card}>
          {/* Rent */}
          <View style={styles.priceRow}>
            <Text style={styles.sub}>Price: </Text>
            <Text style={styles.price}> 
              ₦{post.price.toLocaleString()} / year
              <Text style={{color:'red'}}>price</Text>
            </Text>
          </View>

          {/* Total Price */}
          <View style={styles.priceRowTotal}>
            <Text style={styles.sub}>Total:</Text>
            <Text style={styles.totalPrice}>
              {''}₦{post.totalPrice.toLocaleString()}
              <Text style={{color:'red'}}>totalprice</Text>
            </Text>
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity onPress={handleDeletePost} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete Post</Text>
        </TouchableOpacity>
      </ScrollView>
      
    
  )
}

export default DetailedPost;