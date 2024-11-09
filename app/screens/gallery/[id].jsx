import { View, FlatList, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import PostGallery from '../../../components/PostDetailsCom/PostGallery'
import { useLocalSearchParams } from 'expo-router'
import { DataStore } from 'aws-amplify/datastore';
import {Post} from '@/src/models';


const Gallery = () => {

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const {id}= useLocalSearchParams()

  const fetchPost = async (id) => {
    setLoading(true)
    try{
      if(id){
        const fetchedPost = await DataStore.query(Post, id);

        setPost(fetchedPost);
      }
    }catch(e){
      Alert.alert('Error fetching post', e.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchPost(id);
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // const media = post.media ? post.media.map((uri) => ({ url: uri })) : [];

  return (
    <View style={{flex:1,}} >
        <FlatList
        data={post.media}
        renderItem={({item})=><PostGallery media={item}/>}
        horizontal
        pagingEnabled
        />
        {/* <PostGallery media={media} /> */}
    </View>
  )
}

export default Gallery;