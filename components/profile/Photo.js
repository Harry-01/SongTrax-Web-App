import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import styles from '../../data/styles'; // Import or define your styles here
const {width, height} = Dimensions.get('window');

/**
 * Represents a photo component that displays an image if a photo is available.
 *
 * @param {object} props - The component's properties.
 * @param {boolean} props.hasPhoto - Indicates whether a photo exists.
 * @param {object} props.photoState - The state of the photo.
 * @returns {JSX.Element} - An image component to display the photo if available.
 */
const Photo = ({hasPhoto, photoState}) => {
  return hasPhoto ? (
    <View style={styles.photoFullView}>
      <Image
        style={styles.photoFullImage}
        resizeMode="cover"
        source={{
          uri: photoState.uri,
          width: width, // Define your width variable
          height: height / 2, // Define your height variable
        }}
      />
    </View>
  ) : (
    <View style={styles.photoEmptyView} />
  );
};

export default Photo;
