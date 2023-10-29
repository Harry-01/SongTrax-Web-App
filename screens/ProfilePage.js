import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Appearance,
} from 'react-native';
import colors from '../data/theme';
import {launchImageLibrary} from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');
import styles from '../data/styles';
const mode = Appearance.getColorScheme();

function ProfilePage({setText, text, setPhotoState, photoState}) {
  const handleTextChange = text => {
    setText(text);
    // console.log(photoState);
  };

  async function handleChangePress() {
    const result = await launchImageLibrary();
    //console.log(result);
    if (typeof result.assets[0] == 'object') {
      setPhotoState(result.assets[0]);
    }
  }

  const hasPhoto = typeof photoState.uri != 'undefined';

  const buttonStyle = hasPhoto ? styles.changePhoto : styles.addPhoto;
  const inputStyle = hasPhoto ? styles.input : styles.inputEmpty;
  function Photo(props) {
    if (hasPhoto) {
      return (
        <View style={styles.photoFullView}>
          <Image
            style={styles.photoFullImage}
            resizeMode="cover"
            source={{
              uri: photoState.uri,
              width: width,
              height: height / 2,
            }}
          />
        </View>
      );
    } else {
      return <View style={styles.photoEmptyView} />;
    }
  }
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.profileContainer}>
      <ScrollView>
        <View>
          <Text style={styles.heading}>Edit Profile</Text>
          <Text style={styles.subHeading}>Mirror, Mirror On The Wall...</Text>
        </View>
        <View>
          <Photo />
          <View style={buttonStyle}>
            <Button
              onPress={handleChangePress}
              color={colors[mode].bgColor}
              title={hasPhoto ? 'Change Photo' : 'Add Photo'}
            />
          </View>
        </View>

        <TextInput
          style={inputStyle}
          onChangeText={handleTextChange}
          value={text}
        />
      </ScrollView>
    </KeyboardAvoidingView>
    //
  );
}

export default ProfilePage;
