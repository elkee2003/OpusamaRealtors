import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const numColumns = 3;
const margin = 2;
const totalSpacing = (numColumns + 1) * margin;
const imageSize = (width - totalSpacing) / numColumns;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: margin,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: margin,
  },
  imageContainer: {
    width: imageSize,
    aspectRatio: 3 / 4,
    margin: margin / 2, // Half margin to ensure even spacing
  },
  emptyContainer: {
    width: imageSize,
    aspectRatio: 3 / 4,
    margin: margin / 10, // Ensure the empty view takes up space
    backgroundColor: 'transparent', // Make it invisible
  },
  image: {
    flex: 1,
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
});

export default styles;
