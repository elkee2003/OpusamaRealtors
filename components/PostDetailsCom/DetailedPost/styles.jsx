import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:40,
        marginHorizontal:10,
    },
    imageContainer:{
        aspectRatio: 3/2, // Aspect ratio for the image
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden', // Ensure image stays within bounds of container
        backgroundColor:'#15141A'
    },
    image:{
        flex: 1,
        width: '100%',
        objectFit:'contain'
    },
    availabilityContainer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'space-between',
      },
    availabilityText: {
        fontSize: 18,
        color: '#413b3b',
    },
    contact:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
        marginBottom:5
    },
    name:{
        fontSize:18,
        color:'#141414',
    },
    header:{
        fontSize:25.888,
        fontWeight:'bold',
        marginBottom:10,
        color:'#707070'
    },
    // header:{
    //     fontSize:25.888,
    //     fontWeight:'bold',
    //     marginBottom:10,
    //     color:'#707070'
    // },
    details:{
        fontSize:17,
        lineHeight:25,
    },
    card:{
        backgroundColor:'#fcfcfc',
        padding:10,
        borderRadius:20,
        marginBottom:7,
    },
    propertyDetails:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    bedroomRow:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    description:{
        fontSize:19,
        lineHeight:23,
        color:'#1e2630',
    },
    price:{
        fontSize:19,
        fontWeight:'400',
    },
    sub:{
        fontStyle:'italic',
        fontSize:19,
        fontWeight:'bold',
        marginRight:7
    },
    priceRow:{
        flexDirection:'row',
    },
    priceRowTotal:{
        marginTop:10,
        flexDirection:'row',
    },
    totalPrice:{
        fontWeight:'bold',
        fontSize:19,
        textDecorationLine:'underline'
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal:80,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:20,
    },
})

export default styles;
