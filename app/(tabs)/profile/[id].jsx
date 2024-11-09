import { View, Text, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import DetailedPost from '../../../components/PostDetailsCom/DetailedPost';
import { DataStore } from 'aws-amplify/datastore';
import {Post} from '@/src/models';

const DetaildePostScreen = () => {

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const {id}= useLocalSearchParams();

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

    // I would have used the commented out function but it makes my page re-render
    // const subscription = DataStore.observe(Post, id).subscribe(({opType, element})=>{
    //   if(opType === 'UPDATE'){
    //     fetchPost(element.id);
    //   }
    // });

    const subscription = DataStore.observe(Post, id).subscribe(({opType, element})=>{
      if(opType === 'UPDATE'){
        setPost(element);
      }
    });

    return () => subscription.unsubscribe();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <DetailedPost post={post}/>
    </View>
  )
}

export default DetaildePostScreen;