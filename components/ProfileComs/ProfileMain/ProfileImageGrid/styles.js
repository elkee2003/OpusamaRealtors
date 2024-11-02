import { StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')
const numColumns = 3;
const imageSize = width / numColumns - 5

const styles = StyleSheet.create({
    imageContainer:{
        width:imageSize,
        aspectRatio:3/4,
    },
    image:{
        flex:1,
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
})

export default styles
