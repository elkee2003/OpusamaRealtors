import { View, ScrollView, Text, Image, SafeAreaView, TouchableOpacity, Alert, Switch} from 'react-native';
import {router} from 'expo-router';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import DefaultImage from '../../../assets/images/defaultImage.png';
import { FontAwesome6 } from '@expo/vector-icons';
import { DataStore } from 'aws-amplify/datastore';
import {useProfileContext} from '@/providers/ProfileProvider';
import { Post } from '@/src/models';
import { getUrl, remove } from 'aws-amplify/storage';

const DetailedPost = ({post}) => {

  const {firstName} = useProfileContext()

  const [imageUris, setImageUris] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(post.available);
  const [readMore, setReadMore] = useState(false);
  const [readMoreLux, setReadMoreLux] = useState(false);
  const [readMorePol, setReadMorePol] = useState(false);

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
            setLoading(true);
            try {
              // Delete media files from S3
              if (post.media && post.media.length > 0) {
                await Promise.all(
                  post.media.map(async (path) => {
                    try {
                      await remove({ path });
                    } catch (error) {
                      console.error(`Failed to delete ${path} from S3: `, error);
                    }
                  })
                );
              }
              
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
            }finally{
              setLoading(false);
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
        {firstName && (
          <View style={styles.contact}>
            <FontAwesome6 name="person" size={30} color="black" />
            <Text style={styles.name}>
              {firstName}
            </Text>
          </View>
        )}

        {/* Card */}
        <View style={styles.card}>

          {post.propertyType && (
            <Text style={styles.propertyType}>
              {post.propertyType}
            </Text>
          )}

          {post.type && (
            <Text style={styles.details}>
              {post.type}
            </Text>
          )}


          {post.nameOfType && (
            <Text style={styles.details}>
              {post.nameOfType}
            </Text>
          )}


          {post.availableDocs && (
            <>
              <Text style={styles.subheader}>Available Documents:</Text>
              <Text style={styles.details}>
                {post.availableDocs}
              </Text>
            </>
          )}

        </View>

        {/* Card */}
        <View style={styles.card}>

          {/* Accommodation Parts */}
          {post.accommodationParts && (
            <>
              <Text style={styles.subheader}>Accommodation Parts</Text>
              <Text style={styles.details}>
                {post.accommodationParts}
              </Text>
            </>
          )}

          {/* Bed & Bedrooms */}
          {post.bedrooms && (
              <Text style={styles.details}>A {post.bedrooms} Bedroom
            </Text>
          )}

          {post.bed && (
            <Text style={styles.details}> 
              {post.bed} bed(s)
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.header}>Location</Text>

          {/* Address */}
          {post.address && (
            <Text style={styles.details}>
              {post.address}
            </Text>
          )}
          
          {/* City, State, Country, */}
          <View>
            {post.city && (
              <Text style={styles.details}>
                {post.city}
              </Text>
            )}
            
            {post.state && (
              <Text style={styles.details}>
                {post.state}
              </Text>
            )}

            {post.country && (
              <Text style={styles.details}>
                {post.country}
              </Text>
            )}
          </View>
        </View>

        {/* Type & Description */}
        {post.description && (
          <View style={styles.card}>
            <Text style={styles.header}>Description</Text>
            <Text style={styles.description} >
              {readMore || post.description.length <= 150 ? post.description : `${post.description.substring(0, 150)}...`}

              {/* Button to toggle */}
              { post.description.length > 150 &&(readMore ?
                <Text onPress={()=>setReadMore(false)} style={[{...styles.readMoreLess, color:"#c2021b"}]}>
                  {' '}show less
                </Text>
                :
                <Text style={styles.readMoreLess} onPress={()=>setReadMore(true)}>
                  {' '}read more
                </Text>)
              }
            </Text>
          </View>
        )}

        {/* Amenities and Policies */}
        {post.amenities && (
          <View style={styles.card}>
          
            <Text style={styles.header}>Luxuries</Text>
              <Text style={styles.details}>
                {readMoreLux ||post.amenities.length <= 150 ? post.amenities : `${post.amenities.substring(0, 100)}...`}

                {/* Button to toggle */}
                {  post.amenities.length > 100 &&(readMoreLux ?
                  <Text onPress={()=>setReadMoreLux(false)} style={[{...styles.readMoreLess, color:"#c2021b"}]}>
                    {' '}show less
                  </Text>
                  :
                  <Text style={styles.readMoreLess} onPress={()=>setReadMoreLux(true)}>
                    {' '}read more
                  </Text>)
                }
              </Text>
          </View>
        )}

        {post.policies && (
          <View style={styles.card}>
            <Text style={styles.header}>Policies</Text>
            <Text style={styles.details}>
              {readMorePol || post.policies.length <= 100 ? post.policies : `${post.policies.substring(0,100)}...`}

              {/* Button to toggle */}
              { post.policies.length > 100 &&(readMorePol ?
                <Text onPress={()=>setReadMorePol(false)} style={[{...styles.readMoreLess, color:"#c2021b"}]}>
                  {' '}show less
                </Text>
                :
                <Text style={styles.readMoreLess} onPress={()=>setReadMorePol(true)}>
                  {' '}read more
                </Text>)
              }
            </Text>
          </View>
        )}

        <View style={styles.card}>
          {/* Caution Fee */}
          <View style={styles.priceRow}>
            <Text style={styles.sub}>Caution fee: </Text>
            <Text style={styles.price}> 
              ₦{post.cautionFee?.toLocaleString()}
            </Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.sub}>Price: </Text>
            <Text style={styles.price}> 
              { post.propertyType === 'Hotel / Shortlet' 
                ? `₦${post.price?.toLocaleString()} / night` 
                : (post.propertyType === 'House Sale' || post.propertyType === 'Land Sale')
                  ? `₦${post.price?.toLocaleString()}`
                  : `₦${post.price?.toLocaleString()} / year`
              }
            </Text>
          </View>

          {/* Total Price */}
          <View style={styles.priceRowTotal}>
            <Text style={styles.sub}>Total:</Text>
            <Text style={styles.totalPrice}>
              {''}₦{post?.price?.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeletePost}
          disabled={loading}
        >
          <Text style={styles.deleteButtonText}>Delete Post</Text>
        </TouchableOpacity>
      </ScrollView>
      
    
  )
}

export default DetailedPost;