import { View, Text, FlatList } from 'react-native'
import React, {useState} from 'react'
import ShortAlert from '../ShortAlert'
import styles from './styles'
import alert from '../../../assets/data/alert'

const ShortAlertList = () => {

    const [alerts, setAlerts] = useState(alert)

    // Function to add a new alert to the top
  const addNewAlert = () => {
        const newAlert = {
        id: (alerts.length + 1).toString(),
        guestFirstName: 'New Guest',
        guestLastName: 'Guest Last Name',
        accommodationType: 'New Accommodation',
        guestNumber: '08012345678',
        guestPurpose: 'Business trip',
        }

        // Add new alert to the top of the array
        setAlerts([newAlert, ...alerts])
    }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Alert</Text>
        {/* {
        alerts && alerts.length > 0 ? */}
            <FlatList
                showsVerticalScrollIndicator={false} 
                data={alerts}
                renderItem={({item})=> <ShortAlert alert={item}/>}
            />
        {/* :
            <Text style={styles.noListings}>You have no Alerts</Text>
        } */}
    </View>
  )
}

export default ShortAlertList