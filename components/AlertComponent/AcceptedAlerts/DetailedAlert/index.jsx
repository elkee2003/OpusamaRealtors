import { View, Text, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';

const DetailedAlert = ({notification, onStatusChange}) => {

  const getStatusText = (status) =>{
    if (status === 'PENDING') return 'Pending';
    if (status === 'ACCEPTED') return 'Accepted';
    if (status === 'VIEWING') return 'Viewing';
    if (status === 'VIEWED') return 'Viewed';
    if(status === 'SOLD') return 'Sold';
    if(status === 'PAID') return 'Paid';
    if(status === 'RECEIVED') return 'Received';
    if (status === 'DENIED') return 'Denied';
    return 'Pending';
  }

  const handleCopyPhoneNumber = async () => {
    const phoneNumber = notification?.clientPhoneNumber;
    
    if (phoneNumber) {
      try {
        await Clipboard.setStringAsync(phoneNumber);
        Alert.alert('Phone Number Copied', 'You can paste it into the dialer to make a call.');
      } catch (error) {
        console.error("Error copying phone number:", error);
        Alert.alert('Error', 'Failed to copy the phone number.');
      }
    } else {
      Alert.alert('Error', 'Phone number is not available.');
    }
  };

  // I am meant to update the available field to false when notification.status is accepted
  // console.log('checking status:', notification?.post?.propertyType)

  // if(notification.status === 'ACCEPTED' && notification?.post?.propertyType === 'Hotel / Shortlet'){
  // }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Guest Details</Text>

        {/* Details */}
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* Guest units */}
          <View style={styles.guestUnit}>

            {/* Adults */}
            {notification?.adults && (
              <View>
                <Text style={styles.subHeader}>Adults:</Text>
                <Text style={styles.unitTxt}>{notification.adults}</Text>
              </View>
            )}

            {/* Children */}
            {notification?.kids && (
              <View>
                <Text style={styles.subHeader}>Children:</Text>
                <Text style={styles.unitTxt}>{notification.kids}</Text>
              </View>
            )}

            {/* Infants */}
            {notification?.infants && (
              <View>
                <Text style={styles.subHeader}>Infants:</Text>
                <Text style={styles.unitTxt}>{notification.infants}</Text>
              </View>
            )}

          </View>

          {/* FirstName */}
          {notification?.clientFirstName && (
            <>
              <Text style={styles.subHeader}>
                Name(s):
              </Text>
              <Text style={styles.details}>
                {notification?.clientFirstName}
              </Text>
            </>
          )}

          {/* LastName */}
          { notification?.clientLastName && (
            <>
              <Text style={styles.subHeader}>
              Last Name(s):
              </Text>
              <Text style={styles.details}>
                {notification?.clientLastName}
              </Text>
            </>
          )}

          {/* Phone Number */}
          {notification?.clientPhoneNumber && (
            <>
              <Text style={styles.subHeader}>
                Phone Number:
              </Text>
              <TouchableOpacity onPress={handleCopyPhoneNumber}>
                <Text style={styles.details}>
                  {notification?.clientPhoneNumber}
                </Text>
              </TouchableOpacity> 
            </>
          )}

          {/* Note */}
          {notification?.purpose && (
            <>
              <Text style={styles.subHeader}>
                Purpose:
              </Text> 
              <Text style={styles.details}>
                {notification?.purpose}
              </Text>
            </>
          )}

          {/* Duration */}
          {notification?.duration && (
            <>
              <Text style={styles.subHeader}>
              Duration:
              </Text> 
              <Text style={styles.details}>    
                {notification?.duration}
              </Text>
            </>
          )}

          {/* Check-in */}
          {notification?.checkInDate && (
            <>
              <Text style={styles.subHeader}>
              Check-in:
              </Text>
              <Text style={styles.details}> 
                {notification?.checkInDate}
              </Text>
            </>
          )}

          {/* Check out date */}
          {notification.checkOutDate && (
            <>
              <Text style={styles.subHeader}>
                Check-out:
              </Text> 
              <Text style={styles.details}>
                {notification?.checkOutDate}
              </Text>
            </>
          )}

          {/* Accommodation Type */}
          {notification.propertyType && (
            <>
              <Text style={styles.subHeader}>
              Accommodation Type:
              </Text> 
              <Text style={styles.details}>
                {notification?.propertyType}
              </Text>
            </>
          )}

          {/* Room Type */}
          {notification.accommodationType && (
            <>
              <Text style={styles.subHeader}>
              {notification.propertyType === 'Hotel / Shortlet' ? 'Room Type:' : 'Property Type'}
              </Text> 
              <Text style={styles.details}>
                {notification?.accommodationType}
              </Text>
            </>
          )}

          {/* Room name */}
          {notification.nameOfType && (
            <>
              <Text style={styles.subHeader}>
              Room Name:
              </Text> 
              <Text style={styles.details}>
                {notification?.nameOfType}
              </Text>
            </>
          )}

          {/* Realtor Price */}
          {notification.realtorPrice && (
            <>
              <Text style={styles.subHeader}>
              Price:
              </Text>
              <Text style={styles.details}> 
                ₦{Number(notification.realtorPrice)?.toLocaleString()}
              </Text>
            </>
          )}

          {/* By Account */}
          <Text style={styles.bookedBy}>
            by: {notification?.user?.firstName}
          </Text>
        </ScrollView>

        {/* Status */}
        <View style={styles.statusRow}>
          <Text style={styles.status}>
          {getStatusText(notification.status)}
          </Text>
          {(notification.status === 'ACCEPTED'  || notification.status === 'VIEWING' || notification.status === 'VIEWED' || notification.status === 'PAID' || notification.status === 'SOLD' || notification.status === 'RECEIVED') ? (
              <View style={styles.greenIcon}/>
          ):(
              <View style={styles.redIcon}/>
          )}
        </View>

        {/* Buttons - Only show if propertyType is not 'Hotel / Shortlet' */}

        { notification.propertyType !== 'Hotel / Shortlet' && (
          <>
            {/* Viewing */}
            {notification.status === 'ACCEPTED' && (
              <View style={styles.viewConInfoRow}>
                <TouchableOpacity 
                  style={styles.view}
                  onPress={() => {
                    onStatusChange('VIEWING');
                    router.back();
                  }}
                >
                  <Text style={styles.btnTxt}>Viewing</Text>
                </TouchableOpacity>

                {/* Info Icon */}
                <TouchableOpacity 
                  style={styles.infoIconCon}
                  onPress={() => Alert.alert('Booking Info', 'Click on "Viewing" once you are showing the client the property.')}
                >
                  <AntDesign name="infocirlceo" style={styles.infoIcon} />
                </TouchableOpacity>
              </View>
            )}

            {/* Viewed */}
            {notification.status === 'VIEWING' && (
              <View style={styles.viewConInfoRow}>
                <TouchableOpacity 
                  style={styles.view}
                  onPress={() => {
                    onStatusChange('VIEWED');
                    router.back();
                  }}
                >
                  <Text style={styles.btnTxt}>Viewed</Text>
                </TouchableOpacity>
                
                {/* Info Icon */}
                <TouchableOpacity 
                style={styles.infoIconCon}
                onPress={() => Alert.alert('Booking Info', 'Click on "Viewed" if client has viewed the property.')}
                >
                  <AntDesign name="infocirlceo" style={styles.infoIcon} />
                </TouchableOpacity>
              </View>
            )}

            {/* Sold */}
            {notification.status === 'VIEWED' && (
              <View style={styles.viewConInfoRow}>
                <TouchableOpacity 
                  style={styles.sold}
                  onPress={() => {
                    onStatusChange('SOLD');
                    router.back();
                  }}
                >
                  <Text style={styles.btnTxt}>Sold / Rented</Text>
                </TouchableOpacity>

                {/* Info Icon */}
                <TouchableOpacity 
                  style={styles.infoIconCon}
                  onPress={() => Alert.alert('Booking Info', 'Click on "Sold / Rented" if you have sold/rented the property.')}
                >
                  <AntDesign name="infocirlceo" style={styles.infoIcon} />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {/* Buttons - Only show if propertyType is 'Hotel / Shortlet' */}
        {notification.propertyType === 'Hotel / Shortlet' && (
          <>
            {notification.status === 'PAID' && (
              <View style={styles.viewConInfoRow}>
                <TouchableOpacity 
                  style={styles.view}
                  onPress={() => {
                    onStatusChange('RECEIVED');
                    router.back();
                  }}
                >
                  <Text style={styles.btnTxt}>Received</Text>
                </TouchableOpacity>

                {/* Info Icon */}
                <TouchableOpacity 
                  style={styles.infoIconCon}
                  onPress={() => Alert.alert('Booking Info', 'Click on "Received" once you have received payment for booking.')}
                >
                  <AntDesign name="infocirlceo" style={styles.infoIcon} />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
    </View>
  )
}

export default DetailedAlert;