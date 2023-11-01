import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import NearMePage from '../../screens/NearMePage';
import PlayMusicPage from '../../screens/PlayMusicPage';

const Stack = createStackNavigator();

/**
 * Wrapper for the 'NearMe' stack in the navigation.
 * @param {Object} props - Component properties.
 * @param {string} props.text - Text to be passed to the NearMePage component.
 * @param {function} props.setText - Function to set the text in the NearMePage component.
 * @param {Object} props.photoState - State containing photo data.
 * @param {Object} props.navigation - Navigation object.
 * @param {Object} props.nearbyLocation - Location data for the 'NearMe' stack.
 * @param {Array} props.nearbySamples - Array of nearby samples data.
 * 
 * @returns {JSX.Element} JSX for the 'NearMe' stack navigation.
 */
function NearMeStack({
  text,
  setText,
  photoState,
  navigation,
  nearbyLocation,
  nearbySamples,
}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="NearMe"
        children={() => (
          <NearMePage
            navigation={navigation}
            nearbyLocation={nearbyLocation}
            text={text}
            setText={setText}
            photoState={photoState}
            nearbySamples={nearbySamples}
          />
        )}
      />
      <Stack.Screen
        name="PlayMusic"
        children={props => <PlayMusicPage {...props} />}
      />
      {/* Add more screens for the 'NearMe' tab as needed */}
    </Stack.Navigator>
  );
}

export default NearMeStack;
