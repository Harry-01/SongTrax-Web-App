import React, {useState} from 'react';
import {Image, TextInput, View} from 'react-native';
import icons from '../../data/icons';
import styles from '../../data/styles';
import colors from '../../data/colors';
import {mode} from '../../utils';

/**
 * Renders the main user section, allowing users to input their name.
 * @param {object} props - The component props.
 * @param {function} props.setText - Function to set the text.
 * @param {string} props.text - The text to be set.
 * @param {object} props.photoState - State containing the photo details of the user.
 *
 * @returns {JSX.Element} A JSX element representing the main user section.
 */
function MainUser({setText, text, photoState}) {
  const [currentInput, setCurrentInput] = useState(text);
  const textPlaceHolder = text === '' ? 'Enter Your Name' : text;

  /**
   * Handles the input change in the text input.
   * @param {string} newText - The new text input value.
   */
  const handleInput = newText => {
    setText(newText);
    setCurrentInput(newText);
  };

  const smileyIcon =
    mode === 'dark' ? icons.iconSmileyLightpurple : icons.iconSmileyDarkpurple;

  return (
    <View style={styles.userRow}>
      <Image
        style={styles.userProfile}
        resizeMode="cover"
        source={
          photoState.uri
            ? {
                uri: photoState.uri,
              }
            : smileyIcon
        }
      />
      <TextInput
        placeholder={textPlaceHolder}
        placeholderTextColor={colors[mode].fgColor}
        style={styles.usersText}
        onChangeText={handleInput}
        value={currentInput}
      />
    </View>
  );
}

export default MainUser;
