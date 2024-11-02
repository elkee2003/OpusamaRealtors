import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
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
})

export default styles