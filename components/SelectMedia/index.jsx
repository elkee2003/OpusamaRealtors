import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, {useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useUploadContext } from '../../providers/UploadProvider';
import { router} from 'expo-router';
import styles from './styles'

const SelectMedia = () => {

  const {onImageUploadValidation, errors, setMedia, media} = useUploadContext()
  const [selectedMedia, setSelectedMedia] = useState(media);

  // Pick Multiple Media Function (Images and Videos)
  const pickMediaAsync = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        const newMedia = result.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type,
        }));
        const updatedMedia = [...selectedMedia, ...newMedia];
        setSelectedMedia(updatedMedia);
        setMedia(updatedMedia); // Update the context state

        // Check the length immediately after setting state
        if (updatedMedia.length >= 3) {
          // router.push('/share/displayedmedia'); 
          console.log('hello')       
        } else {
          // Alert if less than 3 media files are selected
          alert('Select at least 3 media files');
        }
      }
    };

    // Render Media Items
    const renderItem = ({ item }) => (
      <View style={styles.mediaContainer}>
        <Image source={{ uri: item.uri }} style={styles.media} />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedMedia}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mediaFullDisplayContainer}
      />
      <TouchableOpacity onPress={pickMediaAsync}>
        <MaterialIcons style={styles.icon} name="add-a-photo" />
        <Text style={styles.txt}>Upload Images of Property</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectMedia