import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import DefaultImage from '../../../../assets/images/defaultImage.png';
import styles from './styles';
import { router} from 'expo-router';
import { getUrl } from 'aws-amplify/storage';

const ProfileMediaGrid = ({post}) => {

  const [imageUris, setImageUris] = useState([])

  const imageUrl = post.media && post.media[0] ? post.media[0] : null;

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
      <TouchableOpacity onPress={()=>router.push(`/profile/${post.id}`)}>
          <View style={styles.imageContainer}>
          {/* Image */}
            {imageUris[0] ? (
              <Image source={{ uri: imageUris[0] }} style={styles.image} />
            ) : (
              <Image source={DefaultImage} style={styles.image} />
            )}
          </View>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileMediaGrid;