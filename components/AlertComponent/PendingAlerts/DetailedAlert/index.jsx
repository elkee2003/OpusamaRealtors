import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import styles from './styles'
import { router } from 'expo-router'

const DetailedAlert = ({notification, onStatusChange}) => {
  const getStatusText = (status) => {
    if (status === 'PENDING') return 'Pending';
    if (status === 'ACCEPTED') return 'Accepted';
    if (status === 'VIEWING') return 'Viewing';
    if (status === 'VIEWED') return 'Viewed';
    if(status === 'SOLD') return 'Sold';
    if(status === 'PAID') return 'Paid';
    if(status === 'DELAYED_PAYMENT') return 'Delayed Payment';
    if(status === 'RECEIVED') return 'Received';
    if (status === 'OCCUPIED') return 'Occupied';
    if (status === 'REMOVED_REALTOR') return 'Removed';
    if(status === 'REMOVED_REALTOR_PAYMENT_DELAYED') return 'Delayed Payment (Removed)';
    if (status === 'DENIED') return 'Denied';
    return 'Pending';
  };

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

          {/* Status */}
          <View style={styles.statusRow}>
              <Text style={styles.status}>
              {getStatusText(notification.status)}
              </Text>
              {(notification.status === 'ACCEPTED') ? (
                  <View style={styles.greenIcon}/>
              ):(
                  <View style={styles.redIcon}/>
              )}
          </View>

          {/* By Account */}
          <Text style={styles.bookedBy}>
            by: {notification?.user?.firstName}
          </Text>
        </ScrollView>
        
        {/* Buttons */}

        <View style={styles.acceptTryAnotherRow}>
          {/* Accept */}
          {notification.status !== 'DELAYED_PAYMENT' && (
            <TouchableOpacity 
              style={styles.accept}
              onPress={() => {
                onStatusChange('ACCEPTED');
                router.back();
              }}
            >
              <Text style={styles.btnTxt}>Accept</Text>
            </TouchableOpacity>
          )}

          {notification.status !== 'DELAYED_PAYMENT' && (
            <TouchableOpacity 
              style={styles.occupied}
              onPress={() => {
                Alert.alert(
                  'Confirm',
                  'By clicking this you want client to try another listing because this is unavailable',
                  [
                    {
                      text:'Cancel',
                      style:'cancel',
                    },
                    {
                      text:'Try Another',
                      onPress: () => {
                        onStatusChange('OCCUPIED');
                        router.back();
                      },
                      style:'destructive'
                    }
                  ]
                );
                
              }}
            >
              <Text style={styles.btnTxt}>Try another</Text>
            </TouchableOpacity>
          )}

        </View>

        {/* Deny Container */}
        {notification.status !== 'DELAYED_PAYMENT' && (
          <View style={styles.denyCon}>
            {/* Deny */}
            <TouchableOpacity 
              style={styles.deny}
              onPress={() => {
                Alert.alert(
                  'Confirm Deny',
                  'Are you sure you want to deny this request?',
                  [
                    {
                      text:'Cancel',
                      style:'cancel',
                    },
                    {
                      text:'Deny',
                      onPress: () => {
                        onStatusChange('DENIED');
                        router.back()
                      },
                      style:'destructive'
                    }
                  ]
                );
              }}
            >
              <Text style={styles.btnTxt}>Deny</Text>
            </TouchableOpacity>
          </View>
        )}

        {notification.status === 'DELAYED_PAYMENT' && (
          <View style={styles.denyCon}>
            <TouchableOpacity 
              style={styles.deny}
              onPress={() => {
                onStatusChange('REMOVED_REALTOR_PAYMENT_DELAYED');
                router.back();
              }}
            >
              <Text style={styles.btnTxt}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  )
}

export default DetailedAlert;