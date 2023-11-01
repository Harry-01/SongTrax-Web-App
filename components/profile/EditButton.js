import React from 'react';
import {View, Button, Appearance} from 'react-native';
import styles from '../../data/styles'; // Import or define your styles here
import colors from '../../data/theme';
import {launchImageLibrary} from 'react-native-image-picker';
const mode = Appearance.getColorScheme();

const EditButton = ({hasPhoto, setPhotoState}) => {
  const buttonStyle = hasPhoto ? styles.changePhoto : styles.addPhoto;
  const title = hasPhoto ? 'Change Photo' : 'Add Photo';
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
