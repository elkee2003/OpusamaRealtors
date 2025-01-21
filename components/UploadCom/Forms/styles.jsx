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
        borderColor:'#049618',
        alignItems:'center',
        backgroundColor:'#060647'
    },
    btnReviewTxt:{
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        color:'#eeeeee',
    },
    error:{
        marginLeft:5,
        marginBottom:14,
        color:'red',
        fontStyle:'italic'
    },

    // googleplaces style
    clearIconContainer:{
        position:'absolute',
        right:10,
        bottom:15,
        zIndex:3,
    },
    clearIcon:{
        fontSize:35,
        color:'grey'
    }, 
    gContainer:{
        position:'relative',
        height:'8%',
        zIndex:2,
        marginBottom:10,
    },
    gContainerFocused: {
        height: '40%',
        zIndex: 2,
    },
    gTextInput: {
        marginTop:30,
        height: 60,
        borderWidth:2,
        borderRadius:20,
        backgroundColor:'transparent',
    },

    gPoweredContainer:{
        display:'none'
    },

    // Style for Time frame
    timeDropdown: {
        height: 50,
        borderColor: '#02061b',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 8,
        marginBottom:10,
    },
    timeLabel: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color:'grey'
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    customInput:{
        borderWidth:1,
        borderColor:'#a9a9af',
        padding:5,
        fontSize:16,
        borderRadius:5
    },
})

export default styles
