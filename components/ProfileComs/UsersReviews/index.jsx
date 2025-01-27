import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useAuthContext } from '@/providers/AuthProvider';
import { DataStore } from 'aws-amplify/datastore'
import { RealtorReview, User } from '@/src/models';
import styles from './styles';

const UserReviews = ({realtor}) => {

    const {dbUser} = useAuthContext();

    const [usersReviews, setUsersReviews] = useState([]);
    const [users, setUsers] = useState([]);

    // Fetch all reviews
    const fetchReviews = async () => {
        try {
        const fetchedReviews = await DataStore.query(RealtorReview, (c) =>
            c.realtorID.eq(realtor.id)
        );

        // Sort reviews by createdAt in ascending order (oldest first)
        const sortedReviews = fetchedReviews.sort((a, b) => 
            new Date(a.createdAt) - new Date(b.createdAt)
        );

        const enrichedReviews = sortedReviews.map((review) => {
            const user = users.find((u) => u.id === review.userID);
            return {
                ...review,
                userName: user ? user.firstName : "Unknown User",
            };
        });

        setUsersReviews(enrichedReviews);
        } catch (e) {
        console.error("Error fetching reviews", e);
        }
    };

    // Fetch users
    const fetchUsers = async () => {
        try {
        const fetchedUsers = await DataStore.query(User);
        setUsers(fetchedUsers);
        } catch (e) {
        Alert.alert("Error fetching users", e.message);
        }
    };

    // Fetch users when component mounts
    useEffect(() => {
        fetchUsers();
    }, []);
    
    // useEffect for Reviews
    useEffect(() => {
        if (users.length > 0) {
        fetchReviews();
        }
    }, [users, realtor]);

    // useEffect for realtime update
    useEffect(()=>{
        if(!realtor) return;
    
        const subscription = DataStore.observe(RealtorReview).subscribe(({ opType, element }) => {
            if (element.realtorID === realtor.id) { // Ensure it's for the current post
            if (opType === 'INSERT' || opType === 'UPDATE' || opType === 'DELETE') {
                fetchReviews();
                fetchUsers();
            }
            }
        });
    
        return () => subscription.unsubscribe();
    },[realtor.id]);

  return (
    <View 
    style={styles.container}
    >
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}
        >
        {/* User Reviews */}
        { usersReviews.length > 0 ? (
                <View style={styles.reviewsContainer}>
                    <Text style={styles.rateTxt}>Ratings and Reviews:</Text>
                    {usersReviews.map((item) => (
                    <View key={item.id} style={styles.reviewItem}>
                        <Text style={styles.reviewerName}>{item.userName}</Text>
                        <View style={styles.usersStarContainer}>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <FontAwesome
                            key={index}
                            name={index <= item.rating ? "star" : "star-o"}
                            size={18}
                            color="#07021f"
                            />
                        ))}
                        </View>
                        <Text style={styles.reviewText}>{item.review}</Text>
                    </View>
                    ))}
                </View>
            ) : 
            <Text style={styles.noReviews}>
                No Reviews Yet
            </Text>
            }
        </ScrollView>
    </View>
  )
}

export default UserReviews;