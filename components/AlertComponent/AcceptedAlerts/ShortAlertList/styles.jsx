import { StyleSheet,} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
        marginHorizontal:10,
    },
    header:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center'
    },

    searchInput:{
        padding:5,
        height:50,
        borderRadius:15,
        fontSize:16,
        backgroundColor:'white'
    },
    
    noListings:{
        textAlign:'center',
        fontWeight:'bold',
        color:'#afadad',
        fontSize:30,
        top:'40%',
        marginHorizontal:10,
    },
})

export default styles
