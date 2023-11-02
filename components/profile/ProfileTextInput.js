import React from 'react';
import {TextInput} from 'react-native';
import styles from '../../data/styles'; // Import or define your styles here
import colors from '../../data/colors';
import {mode} from '../../utils';

/**
 * Represents a text input component for the profile that allows users to enter or edit text.
 *
 * @param {object} props - The component's properties.
 * @param {boolean} props.hasPhoto - Indicates if a photo exists.
 * @param {function} props.setText - Function to set the text input.
 * @param {string} props.value - The value in the text input.
 * @returns {JSX.Element} - A text input component for the profile.
 */
const ProfileTextInput = ({hasPhoto, setText, value}) => {
  const inputStyle = hasPhoto ? styles.input : styles.inputEmpty;

  /**
   * Handles the change in text input value.
   * @param {string} text - The updated text value.
   */
  const handleTextChange = text => {
    setText(text);
  };

  return (
    <TextInput
      style={inputStyle}
      onChangeText={handleTextChange}
      value={value}
      placeholderTextColor={colors[mode].fgColor}
      placeholder="Enter Your Name"
    />
  );
};

export default ProfileTextInput;
