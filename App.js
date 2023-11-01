import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';

import Tabs from './components/nav/Tabs';

import styles from './data/styles';

const Stack = createStackNavigator();

/**
 * The main application component that configures the navigation stack.
 *
 * @returns {JSX.Element} - The main application component containing the navigation stack.
 */
function App() {
  return (
    <SafeAreaView style={styles.nearbyAndPlayContainer}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Tabs'}>
          <Stack.Screen name="Tabs" children={props => <Tabs {...props} />} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
