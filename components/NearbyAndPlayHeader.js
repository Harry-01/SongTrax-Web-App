import React from 'react';
import {Text, View, Image} from 'react-native';
import icons from '../data/icons';
import styles from '../data/styles';
import {mode} from '../utils';

/**
 * Header component displaying the location name and an icon based on the app's mode.
 *
 * @param {object} props - The component's properties.
 * @param {string} props.locationName - The name of the location to be displayed.
 * 
 * @returns {JSX.Element} - A header with an icon and the provided location name.
 */
function Header({locationName}) {
  const pinIcon =
    mode === 'dark' ? icons.iconPinLightPurple : icons.iconPinDarkpurple;
  return (
    <View style={styles.location}>
      <Image style={styles.headerImage} resizeMode="contain" source={pinIcon} />

      <Text style={styles.locationHeading}>{locationName}</Text>
    </View>
  );
}

export default Header;
