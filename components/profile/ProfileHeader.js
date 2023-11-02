import React from 'react';
import {Text, View} from 'react-native';
import styles from '../../data/styles';

/**
 * Shows the heading and subheading in the profile.
 * @returns {JSX.Element} - The Header for the profile page.
 */
function ProfileHeader({}) {
  return (
    <View>
      <Text style={styles.heading}>Edit Profile</Text>
      <Text style={styles.subHeading}>Mirror, Mirror On The Wall...</Text>
    </View>
  );
}

export default ProfileHeader;
