import { StyleSheet, Dimensions } from 'react-native'

const {width} = Dimensions.get('window')
numInputs = 2
margin = 5;
totalSpacing = (numInputs + 5) * margin;
inputSize = (width - totalSpacing ) / numInputs

const styles = StyleSheet.create({
    container: {
        marginTop:15
    },
    dropdown: {
        height: 50,
        borderColor: '#02061b',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 8,
        marginBottom:10,
    },
    label: {
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
    labelTxt:{
        color:'#02061b',
        fontSize:15,
        fontStyle:'italic',
        marginLeft:5,
        marginTop:10,
        marginBottom:4,
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
        padding:8,
        borderWidth:2,
        borderColor:'#02061b', 
        borderRadius:20, 
        fontSize:15,
        width:inputSize
    },
})

export default styles
