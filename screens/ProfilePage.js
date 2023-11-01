import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import EditButton from '../components/profile/EditButton';
import Photo from '../components/profile/Photo';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTextInput from '../components/profile/ProfileTextInput';
import styles from '../data/styles';

/**
 * Represents a page for the user's profile with editable information and photo.
 *
 * @param {object} props - The component's properties.
 * @param {function} props.setText - Function to set the user's profile text.
 * @param {string} props.text - The user's profile text.
 * @param {function} props.setPhotoState - Function to set the user's profile photo state.
 * @param {object} props.photoState - The state of the user's profile photo.
 * 
 * @returns {JSX.Element} - A page for the user's profile with editable information and photo.
 */
function ProfilePage({setText, text, setPhotoState, photoState}) {
  const hasPhoto = typeof photoState.uri != 'undefined';
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.profileContainer}>
      <SafeAreaView>
        <ScrollView>
          <ProfileHeader />
          <View>
            <Photo hasPhoto={hasPhoto} photoState={photoState} />
            <EditButton hasPhoto={hasPhoto} setPhotoState={setPhotoState} />
          </View>
          <ProfileTextInput
            hasPhoto={hasPhoto}
            setText={setText}
            value={text}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
    //
  );
}

export default ProfilePage;
