import { View, ScrollView } from 'react-native';
import React from 'react';
import feed from '../../assets/data/feed';
import ProfileImageGrid from '../ProfileImageGrid';
import styles from './styles';

const PostList = () => {
  // Group data into rows of three
  const rows = [];
  for (let i = 0; i < feed.length; i += 3) {
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

export default PostList;




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