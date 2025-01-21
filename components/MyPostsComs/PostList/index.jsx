import { View, Text, Alert, FlatList, ActivityIndicator, RefreshControl, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import PostSingle from '../PostSingle';
import Logo from '../../../assets/data/images/Opusama3.png'
import { useAuthContext } from '@/providers/AuthProvider';
import { DataStore } from 'aws-amplify/datastore';
import {Post} from '../../../src/models';
import styles from './styles';

const PostList = () => {

    const {dbUser} = useAuthContext();

    const [myPostList, setMyPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchMyPosts = async() =>{
        setLoading(true);

        try{
            const myPosts = await DataStore.query(Post, (p)=>p.realtorID.eq(dbUser.id));

            // Sort posts by createdAt in descending order (most recent first)
            const sortedPosts = myPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setMyPostList(sortedPosts);
        }catch(e){
            Alert.alert('Error fetching posts', e.message)
        }finally {
          setLoading(false);
          setRefreshing(false);
        }
    };

    useEffect(()=>{
        fetchMyPosts();

        const subscription = DataStore.observe(Post).subscribe(({opType})=>{
            if(opType === 'INSERT' || opType === 'UPDATE' || opType === 'DELETE'){
                fetchMyPosts();
            }
        });

        return () => subscription.unsubscribe();
    },[])

    if(loading){
        <ActivityIndicator size={'large'} style={styles.loading}/>
    }

    const handleRefresh = () => {
      setRefreshing(true); // Start the refreshing spinner
      fetchMyPosts();
    };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo}/>
      { myPostList && myPostList.length > 0 ? (
        <FlatList
            data={myPostList}
            keyExtractor={(item)=>item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=><PostSingle post={item}/>}
            refreshControl={
              <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={['#11032b']} // Spinner color
              />
            }
        />
      ) : (
        <Text style={styles.noListings}>You have not made any post yet</Text>
      )}
    </View>
  )
}

export default PostList;