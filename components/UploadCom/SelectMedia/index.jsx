import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useUploadContext } from '@/providers/UploadProvider';
import { router} from 'expo-router';
import styles from './styles';

const SelectMedia = () => {

  const {onImageUploadValidation, errors, setMedia, media} = useUploadContext();

  // Pick Multiple Media Function (Images and Videos)
  const pickMediaAsync = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {

      const selectedImages = result.assets.map((asset) => ({ uri: asset.uri }));

      // Check the length immediately after setting state
      if (selectedImages.length >= 3) {
        setMedia(selectedImages);
        router.push('/share/displayedmedia');     
      } else {
        Alert.alert('Error', 'Select at least 3 media files');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={selectedMedia}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mediaFullDisplayContainer}
      /> */}
      <TouchableOpacity onPress={pickMediaAsync}>
        <MaterialIcons style={styles.icon} name="add-a-photo" />
        <Text style={styles.txt}>Upload Images of Property</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectMedia;