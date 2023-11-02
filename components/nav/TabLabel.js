import React from 'react';
import {StyleSheet, Text} from 'react-native';

/**
 * Component for displaying labels in the bottom navigation tab.
 * @param {Object} props - Component properties.
 * @param {boolean} props.focused - Denotes if the tab is currently focused.
 * @param {string} props.labelValue - The value to be displayed as the tab's label.
 * @param {Object} props.labelStyle - Custom style to be applied to the label.
 *
 * @returns {JSX.Element} A text component displaying the label for the tab.
 */
function TabLabel({focused, labelValue, labelStyle}) {
  const localStyle = StyleSheet.create({
    TabLabel: {
      ...labelStyle,
      opacity: focused || labelValue !== '' ? 1 : 0.5,
    },
  });
  return <Text style={localStyle.TabLabel}>{labelValue}</Text>;
}

export default TabLabel;
