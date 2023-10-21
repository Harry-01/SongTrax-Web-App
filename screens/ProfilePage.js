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
} from 'react-native';
import colors from '../data/theme';
import {launchImageLibrary} from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');
import styles from '../data/styles';

function ProfilePage({setText, text, setPhotoState, photoState}) {
  const handleTextChange = text => {
    setText(text);
    console.log(photoState);
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
  return (
    // <KeyboardAvoidingView>
    <SafeAreaView style={[styles.profileContainer]}>
      <View style={{padding: 10}}>
        <View>
          <Text style={styles.heading}>Edit Profile</Text>
          <Text style={styles.subHeading}>Mirror, Mirror On The Wall...</Text>
        </View>
        <View>
          <Photo />
          <View style={buttonStyle}>
            <Button
              onPress={handleChangePress}
              title={hasPhoto ? 'Change Photo' : 'Add Photo'}
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={handleTextChange}
          value={text}
        />
      </View>
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
}

export default ProfilePage;
