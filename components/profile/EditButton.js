import React from 'react';
import {View, Button, Appearance} from 'react-native';
import styles from '../../data/styles'; // Import or define your styles here
import colors from '../../data/colors';
import {launchImageLibrary} from 'react-native-image-picker';
import {mode} from '../../utils';

/**
 * Represents a button component to edit or add a photo.
 *
 * @param {object} props - The component's properties.
 * @param {boolean} props.hasPhoto - Indicates whether a photo exists.
 * @param {function} props.setPhotoState - Function to set the photo state.
 * @returns {JSX.Element} - A button to handle changing or adding photos.
 */
const EditButton = ({hasPhoto, setPhotoState}) => {
  const buttonStyle = hasPhoto ? styles.changePhoto : styles.addPhoto;
  const title = hasPhoto ? 'Change Photo' : 'Add Photo';

  /**
   * Handles the press event for changing the photo.
   */
  async function handleChangePress() {
    const result = await launchImageLibrary();
    if (typeof result.assets[0] == 'object') {
      setPhotoState(result.assets[0]);
    }
  }

  return (
    <View style={buttonStyle}>
      <Button
        onPress={handleChangePress}
        color={colors[mode].bgColor}
        title={title}
      />
    </View>
  );
};

export default EditButton;
