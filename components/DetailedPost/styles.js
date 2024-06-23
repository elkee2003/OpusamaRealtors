import { StyleSheet,} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:20,
        marginTop:35,
    },

    imageContainer:{
        width:'100%',
        aspectRatio:3/2, 
        overflow:'hidden',
        borderRadius:20,
    },
    img:{
        flex:1,
        width:'100%',
        resizeMode:'contain',
        backgroundColor:'#010614'
    },
    txt:{
        fontSize:20,

    }
})

export default styles
