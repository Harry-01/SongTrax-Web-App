import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import styles from '../../data/styles';

/**
 * Icon component for the tabs in the bottom navigation.
 * @param {Object} props - Component properties.
 * @param {boolean} props.focused - Denotes if the tab is currently focused.
 * @param {string} props.icon - Source for the icon to display.
 * @param {string} props.labelValue - Value for the tab label.
 * 
 * @returns {JSX.Element} Icon for the tab.
 */
function TabIcon({focused, icon, labelValue}) {
  const localStyle = StyleSheet.create({
    TabIcon: {
      width: labelValue === '' ? 150 : 100,
      height: 30,
      opacity: focused ? 1 : 0.5,
    },
  });
  return (
    <View style={styles.tabIconView}>
      <Image source={icon} resizeMode="contain" style={localStyle.TabIcon} />
    </View>
  );
}

export default TabIcon;
