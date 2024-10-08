import { StyleSheet, Dimensions} from 'react-native'

const {width} = Dimensions.get('window')
numInputs = 2
margin = 5;
totalSpacing = (numInputs + 5) * margin;
inputSize = (width - totalSpacing ) / numInputs

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:35,
        marginHorizontal:10,
    },
    contentContainer: {
        justifyContent: 'center',
        gap:4,
    },
    header:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:10,
    },
    label:{
        color:'#02061b',
        fontSize:15,
        fontStyle:'italic',
        marginLeft:5,
        marginTop:10,
    },
    input:{
        padding:8,
        borderWidth:2,
        borderColor:'#02061b', 
        borderRadius:20, 
        fontSize:16,
    },
    generalRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    genInput:{
        padding:10,
        borderWidth:2,
        borderColor:'#02061b', 
        borderRadius:20, 
        fontSize:15,
        width:inputSize
    },
    btnReview:{
        padding:10,
        marginBottom:20,
        marginHorizontal:50,
        borderRadius:20,
        borderWidth:2,
        borderColor:'#020213',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    btnReviewTxt:{
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        color:'#020213',
    },
    error:{
        marginLeft:5,
        marginBottom:14,
        color:'red',
        fontStyle:'italic'
    },
})

export default styles
