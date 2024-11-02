import { View, Text, Alert, FlatList, ActivityIndicator } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import { DataStore } from 'aws-amplify/datastore';
import {Realtor, Post} from '../../../src/models';
import styles from './styles';

const PostList = () => {

    const {dbUser} = useAuthContext();

    const [myPostList, setMyPostList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMyPosts = async() =>{
        try{
            setLoading(true);
            
            const myPosts = await DataStore.query(Post, (p)=>p.realtorID.eq(dbUser.id));

            setMyPostList(myPosts);
        }catch(e){
            Alert.alert('Error fetching posts', e.message)
        }
    }

    useEffect(()=>{
        fetchMyPosts();

        const subscription = DataStore.observe(Post).subscribe(({opType})=>{
            if(opType === 'INSERT' || opType === 'UPDATE' || opType === 'DELETE'){
                fetchMyPosts();
            }
        });

        return () => subscription.unsubscribe();
    },[myPostList])

    if(loading){
        <ActivityIndicator size={'large'} style={styles.loading}/>
    }

  return (
    <View style={styles.container}>
      { myPostList && myPostList.length > 0 ? (
        <FlatList
            data={myPostList}
            keyExtractor={(item)=>item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=><PostSingle post={item}/>}
        />
      ) : (
        <Text style={styles.noListings}>No Post Available</Text>
      )}
    </View>
  )
}

export default PostList;