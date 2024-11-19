import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {useAuthContext} from '@/providers/AuthProvider';
import { router } from 'expo-router';
import { deleteUser } from 'aws-amplify/auth';
import { DataStore } from 'aws-amplify/datastore';
import {Realtor} from '@/src/models';
import { list, remove } from 'aws-amplify/storage';

const DeleteAccount = () => {

    const {dbUser, sub} = useAuthContext();
    const [loading, setLoading] = useState(false);

    const deleteUserFiles = async (sub) => {
        try {
            const folderPaths = [`public/profilePhoto/${sub}/`, `public/media/${sub}/`];
    
            for (const folderPath of folderPaths) {
                let nextToken;
                do {
                    const result = await list({
                        path: folderPath, // Folder path to list items
                        options: { listAll: true, nextToken }, // Pagination support
                    });
    
                    // Ensure result.items exists and iterate over it
                    if (result?.items?.length) {
                        await Promise.all(
                            result.items.map(async (file) => {
                                try {
                                    // Use file.path instead of file.key
                                    if (file.path) {
                                        await remove({ path: file.path }); // Correctly pass the path
                                        console.log(`Deleted: ${file.path}`);
                                    } else {
                                        console.error("File path is undefined for:", file);
                                    }
                                } catch (error) {
                                    console.error(`Failed to delete file ${file.path || 'unknown'}:`, error);
                                }
                            })
                        );
                    }
    
                    // Update nextToken for pagination
                    nextToken = result.nextToken;
                } while (nextToken);
            }
    
            Alert.alert('Success', 'All user files have been deleted successfully.');
        } catch (error) {
            console.error('Error deleting user files:', error);
            Alert.alert('Error', 'Failed to delete user files. Please try again.');
        }
    };

    

    // Function to handle account deletion
    const handleDeleteAccount = async () => {
        setLoading(true);
        try {
        // 1. Delete associated user data from DataStore
        if (dbUser) {
            await DataStore.delete(Realtor, (realtor) => realtor.id.eq(dbUser.id));
        }

        // 2. Delete user's S3 files
        await deleteUserFiles(sub);

        // 3. Delete the user from Cognito
        await deleteUser();

        Alert.alert('Success', 'Account has been successfully deleted');

        // 3. Redirect to login or home screen
        router.push('/login');
        } catch (error) {
            console.log('Error deleting account:', error);
            Alert.alert('Error', 'Failed to delete the account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const confirmDeleteAccount = () => {
        Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account? This action cannot be undone.',
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: handleDeleteAccount },
        ]
        );
    };
  return (
    <View style={styles.container}>

        <Text style={styles.title}>
            Delete Account
        </Text>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <Text style={styles.txt}>
                We understand that making the decision to delete your account can be difficult. If you no longer wish to use our services, you can permanently delete your account. Please note that once this action is taken, it cannot be undone.
            </Text>

            {/* Key Information */}
            <Text style={styles.subHeader}>Key Information</Text>
            <View style={styles.txtNum}>
                <Text style={styles.subHeaderTxt}>
                    1. Irreversible Action:
                </Text>
                <Text style={styles.txt}>
                    Deleting your account will permanently erase all your personal data, activity history, and associated details from our system.
                </Text>
            </View> 

            <View style={styles.txtNum}>
                <Text style={styles.subHeaderTxt}>
                    2. Fresh Account Option:
                </Text>
                <Text style={styles.txt}>
                    If you wish to return in the future, you will need to create a new account, as recovery of a deleted account is not possible.
                </Text>
            </View> 

            <View style={styles.txtNum}>
                <Text style={styles.subHeaderTxt}>
                    3. Associated Data
                </Text>
                <Text style={styles.txt}>
                    Any data linked to your account, such as saved preferences or past interactions, will also be deleted during this process.
                </Text>
            </View> 

            {/* Important Steps */}
            <Text style={styles.subHeader}>Important Steps</Text>

            <View style={styles.txtBulletRow}>
                <Text style={styles.pointer}>•</Text>
                <Text style={styles.txt}>
                    To delete your account, tap the "Delete Account" button below.
                </Text>
            </View>

            <View style={styles.txtBulletRow}>
                <Text style={styles.pointer}>•</Text>
                <Text style={styles.txt}>
                    You will be asked to confirm your decision to prevent accidental deletions.
                </Text>
            </View>

            <View style={styles.txtBulletRow}>
                <Text style={styles.pointer}>•</Text>
                <Text style={styles.txt}>
                    If confirmed, your account and all related data will be permanently removed.
                </Text>
            </View>

            {/* Additional Reminder */}
            <View style={styles.lastSection}>
                <Text style={styles.subHeader}>Additional Reminder</Text>
                <Text style={styles.txt}>
                    If you are experiencing an issue with your account or require assistance, consider reaching out to our support team before proceeding with deletion.
                </Text>
            </View>
        </ScrollView>

        {/* Delete Button */}
        <TouchableOpacity 
            style={styles.deltBtn}
            onPress={confirmDeleteAccount}
            disabled={loading}
        >
            <Text style={styles.deltTxt}>{loading ? 'Deleting...' : 'Delete Account'}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default DeleteAccount