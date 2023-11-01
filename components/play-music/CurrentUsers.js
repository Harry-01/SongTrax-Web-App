import React from 'react';
import {Text, View} from 'react-native';
import styles from '../../data/styles';
import MainUser from './MainUser';
import StaticUser from './StaticUser';

/**
 * Renders the list of current users at a location.
 * @param {object} props - The component props.
 * @param {object} props.photoState - State containing the photo details of the user.
 * @param {function} props.setText - Function to set the text.
 * @param {string} props.text - The text to be set.
 * 
 * @returns {JSX.Element} A JSX element representing the current users component.
 */
function CurrentUsers({photoState, setText, text}) {
  return (
    <View style={styles.currentUserContainer}>
      <Text style={styles.songName}>Currently At This Location:</Text>
      <MainUser setText={setText} text={text} photoState={photoState} />
      <StaticUser />
    </View>
  );
}

export default CurrentUsers;
