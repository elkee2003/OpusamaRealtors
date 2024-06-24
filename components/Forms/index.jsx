import { View, Text, ScrollView, TextInput, Pressable,Image, FlatList} from 'react-native'
import React,{useState, useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { useUploadContext } from '../../providers/UploadProvider';
import { useRouter } from 'expo-router';
import styles from './styles'

const InputForms = () => {

  const router = useRouter()

    const {apartmentType, setApartmentType,
      roomNumbers, setRoomNumbers,
      buildingParts, setBuildingParts,
      description, setDescription,
      rent, setRent,
      totalRent, setTotalRent,
      media, setMedia,
      coverPhoto, setCoverPhoto,
      location, setLocation,
      errors, onValidate
      } = useUploadContext()

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
        setMedia(selectedMedia);
      } else {
        alert('You did not select any media.');
      }
    };

    // Navigate function to SelectMedia
    // if (media.length >= 3){
    //   router.push('/share/pickmedia')
    //   alert('YEssssss')
    // }

    // Navigate fuction to Review
    // const handleReview = () =>{
    //   if (onValidate()){
    //     router.push('/share/review')
    //     console.warn('hello')
    //   }
    // }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >

      {/* Upload House
      <View style={styles.mediaUploadContainer}>
      {media && media.map((item, index) => (
        item.type && item.type.includes('image') ? (
          <Image key={index} style={styles.media} source={{ uri: item.uri }} />
        ) : item.type && item.type.includes('video') ? (
          <Video
            key={index}
            source={{ uri: item.uri }}
            style={styles.media}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        ) : null
      ))}
      </View> */}

      <Pressable onPress={pickMediaAsync}>
          <Text style={styles.imgUploadTxt}>Upload Image</Text>
      </Pressable>
      

      <Text style={styles.label}>Apartment Type:</Text>
      <TextInput
      style={styles.input}
      value={apartmentType}
      onChangeText={setApartmentType}
      placeholder='Apartment Type'
      />

      <Text style={styles.label}>Rent:</Text>
      <TextInput
      style={styles.input}
      value={rent}
      onChangeText={setRent}
      placeholder='Rent Amount'
      keyboardType='numeric'
      />

      <Text style={styles.label}>Total Rent:</Text>
      <TextInput
      style={styles.input}
      value={totalRent}
      onChangeText={setTotalRent}
      keyboardType='numeric'
      placeholder='Amount of Additional Things (Optional)'
      />

      <Text style={styles.label}>Number of Rooms:</Text>
      <TextInput
      style={styles.input}
      value={roomNumbers}
      onChangeText={setRoomNumbers}
      placeholder='Number Of Rooms'
      keyboardType='numeric'
      />

      <Text style={styles.label}>Building Parts:</Text> 
      <TextInput
      style={styles.input}
      value={buildingParts}
      onChangeText={setBuildingParts}
      placeholder='eg: 2 parlours, 3 kitchens'
      />
      <Text style={styles.label}>Description of Apartment:</Text>
      <TextInput
      style={styles.input}
      value={description}
      onChangeText={setDescription}
      placeholder='Kindly describe the Apartment'
      multiline
    />

    <Text style={styles.error}>{errors}</Text>

    {/* Button */}
    <Pressable onPress={()=>console.warn('rest')} style={styles.btnReview}>
        <Text style={styles.uploadTxt}>Review</Text>
    </Pressable>
     {/* Upload House */}
     <View style={styles.mediaUploadContainer}>
      {media && media.map((item, index) => (
        item.type && item.type.includes('image') ? (
          <Image key={index} style={styles.media} source={{ uri: item.uri }} />
        ) : item.type && item.type.includes('video') ? (
          <Video
            key={index}
            source={{ uri: item.uri }}
            style={styles.media}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        ) : null
      ))}
    </View>
    {/* <FlatList
    data={media}
    keyExtractor={(item,index)=>index.toString()}
    numColumns={2}
    renderItem={({item, index})=>(
      <View>
        {item.type && item.type.includes('image') ? (
          <Image key={index} source={{uri:item.uri}} style={styles.media}/>
        ): item.type && item.type.includes('video') ? (
          <Video
          key={index}
          source={{uri:item.uri}}
          style={styles.media}
          useNativeControls
          resizeMode='contain'
          isLooping
          />
        ): null}
      </View>
    )}
    /> */}
    </ScrollView>
  )
}

export default InputForms