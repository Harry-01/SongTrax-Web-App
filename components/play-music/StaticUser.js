import React from 'react';
import {Image, Text, View} from 'react-native';
import icons from '../../data/icons';
import styles from '../../data/styles';
import colors from '../../data/theme';
import {mode} from '../../utils';

/**
 * Renders the static user section displaying an icon and text.
 * @returns {JSX.Element} A JSX element representing the static user section.
 */
function StaticUser({}) {
  return (
    <View style={styles.userRow}>
      <Image
        style={styles.userProfile}
        resizeMode="cover"
        source={
          mode === 'dark'
            ? icons.iconSmileyLightpurple
            : icons.iconSmileyDarkpurple
        }
      />
      <Text style={styles.usersText}>And others...</Text>
    </View>
  );
}

export default StaticUser;
