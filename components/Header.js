import React from 'react';
import {Text, View, Image} from 'react-native';
import icons from '../data/icons';
import styles from '../data/styles';

function Header({locationName}) {
  return (
    <View style={styles.location}>
      <Image
        style={{width: 70, height: 70, marginVertical: 20}}
        resizeMode="contain"
        source={icons.iconPinDarkpurple}
      />

      <Text style={styles.locationHeading}>{locationName}</Text>
    </View>
  );
}

export default Header;
