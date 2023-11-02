import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import Map from '../../screens/Map';
import ProfilePage from '../../screens/ProfilePage';
import icons from '../../data/icons';
import colors from '../../data/colors';
import tabOptions from '../../navigation/tabOptions';
import NearMeStack from './NearMeStack';
import {baseURL, APIKEY} from '../../utils';

const Tab = createBottomTabNavigator();

/**
 * Renders the navigation tabs for the app.
 * @param {object} props - Component properties.
 * @param {object} props.navigation - The navigation object.
 *
 * @returns {JSX.Element} The navigation tabs component.
 */
function Tabs({navigation}) {
  const [nearbyLocation, setNearbyLocation] = useState({});
  const [conditionalLabel, setConditionalLabel] = useState('');
  const [photoState, setPhotoState] = useState({});
  const [nearbySamples, setNearbySamples] = useState([]);
  const [text, setText] = useState('');

  // Adds the music nearby label in nav if location has sample
  useEffect(() => {
    if (nearbyLocation?.distance?.nearby) {
      const fetchSamples = async () => {
        try {
          const samples = await getSamplesByLocation(nearbyLocation.id);
          if (samples.length > 0) {
            setNearbySamples(samples);
            setConditionalLabel("There's Music Nearby");
          } else {
            setNearbySamples([]);
            setConditionalLabel('');
          }
        } catch (error) {
          console.error('Error fetching nearby samples:', error);
        }
      };

      fetchSamples();
    } else {
      setNearbySamples([]);
      setConditionalLabel('');
    }
  }, [nearbyLocation]);

  /**
   * Fetches samples by location ID from the API.
   * @param {string} locationId - The ID of the location to fetch samples for.
   *
   * @returns {Promise<object[]>} A promise that resolves to an array of samples.
   */
  async function getSamplesByLocation(locationId) {
    const url = `${baseURL}sampletolocation/?api_key=${APIKEY}&location_id=${locationId}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Map"
        children={() => (
          <Map navigation={navigation} setNearbyLocation={setNearbyLocation} />
        )}
        options={() => tabOptions(icons.tabMapWhite, '', {}, 20)}
      />
      <Tab.Screen
        name="NearMeStack"
        children={() => (
          <NearMeStack
            setText={setText}
            text={text}
            photoState={photoState}
            navigation={navigation}
            nearbyLocation={nearbyLocation}
            nearbySamples={nearbySamples}
          />
        )}
        options={() =>
          tabOptions(
            icons.logoWhitepurple,
            conditionalLabel,
            {
              marginBottom: 10,
              fontSize: 15,
              width: 200,
              textAlign: 'center',
              color: colors.whiteColor,
            },
            80,
          )
        }
      />
      <Tab.Screen
        name="Profile"
        children={() => (
          <ProfilePage
            navigation={navigation}
            setText={setText}
            text={text}
            setPhotoState={setPhotoState}
            photoState={photoState}
          />
        )}
        options={() => tabOptions(icons.tabProfileWhite, '', {}, 20)}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
