import React from 'react';
import {TextInput} from 'react-native';
import styles from '../../data/styles'; // Import or define your styles here

const ProfileTextInput = ({hasPhoto, setText, value}) => {
  const inputStyle = hasPhoto ? styles.input : styles.inputEmpty;
  const handleTextChange = text => {
    setText(text);
  };
  return (
    <TextInput
      style={inputStyle}
      onChangeText={handleTextChange}
      value={value}
    />
  );
};

export default ProfileTextInput;
