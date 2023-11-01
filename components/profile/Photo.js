import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import styles from '../../data/styles'; // Import or define your styles here
const {width, height} = Dimensions.get('window');
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
