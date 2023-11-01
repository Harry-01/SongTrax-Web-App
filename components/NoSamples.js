import React from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import icons from '../data/icons';
import styles from '../data/styles';
import {mode} from '../utils';

/**
 * Component displayed when no samples are available near the user.
 *
 * @returns {JSX.Element} - A component rendering a smiley icon and a message for no available samples.
 */
function NoSamples({}) {
  spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }),
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const smileyIcon =
    mode === 'dark' ? icons.iconSmileyLightpurple : icons.iconSmileyDarkpurple;

  const localStyles = StyleSheet.create({
    noSampleImage: {
      width: 70,
      height: 70,
      marginVertical: 20,
      transform: [{rotate: spin}],
    },
  });

  return (
    <View style={styles.noSampleContainer}>
      <Text style={styles.heading}>No Samples Near you</Text>
      <Animated.Image
        style={localStyles.noSampleImage}
        resizeMode="contain"
        source={smileyIcon}
      />
    </View>
  );
}

export default NoSamples;
