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
        objectFit:'cover'
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
    readMoreLess:{
        color:'#009b0f',
    },
    propertyType:{
        fontSize:18,
        fontWeight:'bold',
        lineHeight:25,
        justifyContent:'center',
    },
    subheader:{
        fontSize:19,
        fontWeight:'bold',
        color:'#707070',
        lineHeight:25,
        marginTop:5,
        justifyContent:'center',
    },
    details:{
        fontSize:17,
        lineHeight:25,
        justifyContent:'center',
    },
    card:{
        backgroundColor:'#fcfcfc',
        padding:10,
        borderRadius:20,
        marginBottom:7,
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
        marginTop:5,
        flexDirection:'row',
    },
    totalPrice:{
        fontWeight:'bold',
        fontSize:19,
        textDecorationLine:'underline'
    },

    // For inspection fee
    subInspectionFee:{
        fontStyle:'italic',
        fontSize:18,
        fontWeight:'bold',
        marginRight:7,
        color:'grey',
    },
    inspectionFee:{
        fontWeight:'bold',
        fontSize:19,
        color:'grey',
    },

    rateContainer:{
        flex:1,
        gap:10,
    },

    rateTxt:{
        fontSize:25.888,
        fontWeight:'bold',
        color:'#707070',
    },

    starContainer:{
        flex:1,
        flexDirection:'row',
        width:"70%",
        justifyContent:'space-between',
        alignSelf:'center',
    },
    
    usersStarContainer:{
        flex:1,
        flexDirection:'row',
        gap:10,
    },

    lastReviewsContainer: {
        padding: 7,
        borderRadius:20,
        backgroundColor: '#e4dfdf',
    },

    // lastRatingReviewTxt:{
    //     marginTop: 15,
    //     fontSize:25.888,
    //     fontWeight:'bold',
    //     color:'#2c2c2c',
    // },

    reviewsContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },

    seeAllReviews:{
        fontSize:16,
        color:'#07630e',
        textDecorationLine:'underline',
        marginBottom:50,
    },

    reviewItem: {
        borderBottomWidth:1,
        borderColor:'#dbd9d9',
        marginBottom: 15,
    },

    reviewerName: {
        fontWeight: 'bold',
        fontSize:17,
    },

    reviewText: {
        color: '#0e0d0d',
        fontSize:15,
        marginBottom:10,
    },

    noReviews:{
        marginTop:60,
        fontSize:30,
        fontWeight:'bold',
        color:'#b6b3b3',
        textAlign:'center',
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
