import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../data/theme';
import TabIcon from '../components/nav/TabIcon';
import TabLabel from '../components/nav/TabLabel';
import styles from '../data/styles';

/**
 * Generates configuration options for a specific tab in the tab navigator.
 *
 * @param {string} icon - The icon for the tab.
 * @param {string} labelValue - The value for the tab label.
 * @param {object} labelStyle - The style for the label.
 * @param {number} newWidth - The new width for the tab.
 *
 * @returns {object} - Tab configuration options.
 */
function tabOptions(icon, labelValue, labelStyle, newWidth) {
  return {
    tabBarIcon: ({focused}) => (
      <TabIcon focused={focused} icon={icon} labelValue={labelValue} />
    ),
    // tabBarActiveTintColor: colors.white,
    tabBarInactiveTintColor: colors.darkPurple,
    tabBarActiveBackgroundColor: colors.blackColorTranslucentLess,
    tabBarStyle: {
      height: 70,
      paddingHorizontal: 20,
    },
    // tabBarLabelStyle: labelStyle,
    tabBarLabel:
      labelValue === ''
        ? ''
        : ({focused}) => (
            <TabLabel
              focused={focused}
              labelValue={labelValue}
              labelStyle={labelStyle}
            />
          ), //labelValue,
    tabBarItemStyle: {
      width: newWidth,
      paddingTop: 10,
      paddingHorizontal: newWidth,
    },
    tabBarBackground: () => (
      <LinearGradient
        colors={[colors.purpleColorLighter, colors.blueColorDarker]}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      />
    ),
  };
}

export default tabOptions;
