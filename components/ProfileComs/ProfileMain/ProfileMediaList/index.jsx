import { View, ScrollView, ActivityIndicator, Alert, } from 'react-native';
import React, {useState, useEffect} from 'react';
import ProfileMediaGrid from '../ProfileMediaGrid';
import { useAuthContext } from '@/providers/AuthProvider';
import { DataStore } from 'aws-amplify/datastore';
import {Post} from '@/src/models';
import styles from './styles';

const ProfileMediaList = () => {

    const {dbUser} = useAuthContext()
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () =>{
      setLoading(true);
      try{
        const realtorPosts = await DataStore.query(Post, (p)=>p.realtorID.eq(dbUser.id));

        const sortedPosts = realtorPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPosts(sortedPosts);
      }catch(e){
        Alert.alert('Error fetching posts', e.message)
      }finally{
        setLoading(false);
      }
    }

    useEffect(()=>{
      fetchPosts();

    const subscription = DataStore.observe(Post).subscribe(({opType})=>{
      if(opType === 'INSERT' || opType === 'UPDATE' || opType === 'DELETE'){
        fetchPosts();
      }
    });

    return () => subscription.unsubscribe();
    },[]);


    // Group data into rows of three
    const rows = [];
    for (let i = 0; i < posts.length; i += 3) {
      rows.push(posts.slice(i, i + 3));
    }

    if(loading){
      return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#050525" />
        </View>
      )
    }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, colIndex) => (
            <ProfileMediaGrid key={item.id} post={item} />
          ))}
          {row.length < 3 && (
            // Add empty views to fill the row if it's not complete
            Array.from({ length: 3 - row.length }).map((_, index) => (
              <View key={index} style={styles.emptyContainer} />
            ))
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default ProfileMediaList;