import { View, Text, TextInput } from 'react-native';
import React from 'react';
import styles from './styles';
import { useUploadContext } from '@/providers/UploadProvider';

const WriteDescription = () => {
    const {
        propertyType, setPropertyType,
        description, setDescription,
        amenities, setAmenities,
        policies, setPolicies,
    } = useUploadContext()
  return (
    <View>

        {/* House */}
        {propertyType === 'House' && ( 
            <>
                <Text style={styles.label}>House Description:</Text>
                <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder='Kindly describe House'
                multiline
                />
                <Text style={styles.label}>Amenities:</Text>
                <TextInput
                style={styles.input}
                value={amenities}
                onChangeText={setAmenities}
                placeholder='24/7 Security, Parking, Swimming, Pool, Gym, Building is around banks'
                multiline
                />
                <Text style={styles.label}>Policies:</Text>
                <TextInput
                style={styles.input}
                value={policies}
                onChangeText={setPolicies}
                placeholder='Lawn must be mowed every 2 weeks, Paint building every year,'
                multiline
                />
            </>
        )}

        {/* Hotel/Shorlet */}
        {propertyType === 'Hotel / Shorlet' && ( 
            <>
                <Text style={styles.label}>Hotel / Shortlet Description:</Text>
                <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder='Kindly describe Hotel / Shorlet'
                multiline
                />
                <Text style={styles.label}>Amenities:</Text>
                <TextInput
                style={styles.input}
                value={amenities}
                onChangeText={setAmenities}
                placeholder='24/7 Security, Parking, Swimming, Pool, Gym, Breakfast'
                multiline
                />
                <Text style={styles.label}>Policies:</Text>
                <TextInput
                style={styles.input}
                value={policies}
                onChangeText={setPolicies}
                placeholder='No guns allowed, Caution fees applicable, Paint building every year, Not more than 5 Guests'
                multiline
                />
            </>
        )}

        {/* Student Accommodation */}
        {propertyType === 'Student Accommodation' && ( 
            <>
                <Text style={styles.label}>Student Accommodation Description:</Text>
                <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder='Kindly describe Student Accommodation'
                multiline
                />
                <Text style={styles.label}>Amenities:</Text>
                <TextInput
                style={styles.input}
                value={amenities}
                onChangeText={setAmenities}
                placeholder='24/7 Security, Parking, Swimming, Pool, Gym, Breakfast, library'
                multiline
                />
                <Text style={styles.label}>Policies:</Text>
                <TextInput
                style={styles.input}
                value={policies}
                onChangeText={setPolicies}
                placeholder='Gate closes at 8:00pm, Not more than 2 Guests'
                multiline
                />
            </>
        )}

        {/* Land Sale */}
        {propertyType === 'Land Sale' && ( 
            <>
                <Text style={styles.label}>Land Description:</Text>
                <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder='Unit measurement, method of measurement, situation etc.'
                multiline
                />
                <Text style={styles.label}>Amenities:</Text>
                <TextInput
                style={styles.input}
                value={amenities}
                onChangeText={setAmenities}
                placeholder='Advantage of purchase'
                multiline
                />
                <Text style={styles.label}>Policies:</Text>
                <TextInput
                style={styles.input}
                value={policies}
                onChangeText={setPolicies}
                placeholder='What potential buyer needs for purchase'
                multiline
                />
            </>
        )}

        {/* House Sale */}
        {propertyType === 'House Sale' && ( 
            <>
                <Text style={styles.label}>House Description:</Text>
                <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder='Describe house, situation etc.'
                multiline
                />
                <Text style={styles.label}>Amenities:</Text>
                <TextInput
                style={styles.input}
                value={amenities}
                onChangeText={setAmenities}
                placeholder='Advantage of Purchase'
                multiline
                />
                <Text style={styles.label}>Policies:</Text>
                <TextInput
                style={styles.input}
                value={policies}
                onChangeText={setPolicies}
                placeholder='What potential buyer needs'
                multiline
                />
            </>
        )}
        {/* Office Space */}
        {propertyType === 'Office Space' && ( 
            <>
                <Text style={styles.label}>Office Space Description:</Text>
                <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder='Describe office space.'
                multiline
                />
                <Text style={styles.label}>Amenities:</Text>
                <TextInput
                style={styles.input}
                value={amenities}
                onChangeText={setAmenities}
                placeholder='Advantage of Space'
                multiline
                />
                <Text style={styles.label}>Policies:</Text>
                <TextInput
                style={styles.input}
                value={policies}
                onChangeText={setPolicies}
                placeholder='What potential clients need to get Office Space'
                multiline
                />
            </>
        )}
        {/* Shop Space */}
        {propertyType === 'Shop' && ( 
            <>
                <Text style={styles.label}>Shop Description:</Text>
                <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder='Describe shop etc.'
                multiline
                />
                <Text style={styles.label}>Amenities:</Text>
                <TextInput
                style={styles.input}
                value={amenities}
                onChangeText={setAmenities}
                placeholder='Advantage of getting shop'
                multiline
                />
                <Text style={styles.label}>Policies:</Text>
                <TextInput
                style={styles.input}
                value={policies}
                onChangeText={setPolicies}
                placeholder='What potential client needs to get shop'
                multiline
                />
            </>
        )}
    </View>
  )
}

export default WriteDescription