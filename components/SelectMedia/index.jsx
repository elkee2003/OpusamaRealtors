import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useUploadContext } from '../../providers/UploadProvider';
import { router} from 'expo-router';
import styles from './styles'

const SelectMedia = () => {

  const {onImageUploadValidation, errors, setMedia, media} = useUploadContext()

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
        const selectedMedia = result.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type,
        }));
        const updatedMedia = [...media, ...selectedMedia];
        setMedia(updatedMedia);

        // Check the length immediately after setting state
        if (updatedMedia.length >= 3) {
          router.push('/share/displayedmedia');        
        } else {
          // Alert if less than 3 media files are selected
          alert('Select at least 3 media files');
        }
      }
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickMediaAsync}>
        <MaterialIcons style={styles.icon} name="add-a-photo" />
        <Text style={styles.txt}>Upload Images of Property</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectMedia