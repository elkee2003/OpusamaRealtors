import { View, ScrollView, ActivityIndicator, Alert, } from 'react-native';
import React, {useState, useEffect} from 'react';
import ProfileImageGrid from '../ProfileImageGrid';
import { useAuthContext } from '@/providers/AuthProvider';
import { DataStore } from 'aws-amplify/datastore';
import {Realtor, Post} from '@/src/models';
import styles from './styles';

const ProfilePictureList = () => {

    const {dbUser} = useAuthContext()
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () =>{
      setLoading(true);
      try{
        const realtorPosts = await DataStore.query(Post, (p)=>p.realtorID.eq(dbUser.id));

        const sortedPosts = realtorPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // const postsWithRealtor = await Promise.all(
        //   sortedPosts.map(async(post)=>{
        //     if(post.realtorID){
        //       const realtor = await DataStore.query(Realtor, (r)=>r.id.eq(post.realtorID));
        //       return {...post, realtor:realtor[0] || null};
        //     }
        //     return {...post, realtor:null};
        //   })
        // )
        // setPosts(postsWithRealtor);
      }catch(e){
        Alert.alert('Error fetching posts', e.message)
      }
    }


    // Group data into rows of three
    const rows = [];
    for (let i = 0; i < posts.length; i += 3) {
      rows.push(feed.slice(i, i + 3));
    }

  return (
    <View contentContainerStyle={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, colIndex) => (
            <ProfileImageGrid key={item.id} post={item} />
          ))}
          {row.length < 3 && (
            // Add empty views to fill the row if it's not complete
            Array.from({ length: 3 - row.length }).map((_, index) => (
              <View key={index} style={styles.emptyContainer} />
            ))
          )}
        </View>
      ))}
    </View>
  );
};

export default ProfilePictureList;




// import { View, Text, FlatList,ScrollView } from 'react-native'
// import React from 'react'
// import feed from '../../assets/data/feed'
// import ProfileImageGrid from '../ProfileImageGrid'
// import styles from './styles'

// const PostList = () => {
//   return (
//     <View style={styles.container}>
//       {/* <FlatList 
//           data={feed}
//           renderItem={({item})=> <ProfileImageGrid post={item}/>}
//           contentContainerStyle={{gap:1}}
//           columnWrapperStyle={{gap:1}}
//           numColumns={3} // Add this line
//       /> */}
//       {feed.map((item, index)=>(
//         <ScrollView style={styles.imageGrid} key={item.id}>
//           <ProfileImageGrid post={item}/>
//         </ScrollView>
//       ))}
//     </View>
//   )
// }

// export default PostList