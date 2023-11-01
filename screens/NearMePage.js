import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';
import NoSamples from '../components/NoSamples';
import SampleCard from '../components/SampleCard';
import styles from '../data/styles';

/**
 * Represents a page displaying nearby samples or a message if no samples are available.
 *
 * @param {object} props - The component's properties.
 * @param {object} props.navigation - Navigation object for controlling navigation.
 * @param {object} props.nearbyLocation - Details of the nearby location.
 * @param {string} props.text - Text input state.
 * @param {function} props.setText - Function to set the text input state.
 * @param {object} props.photoState - The state of the photo.
 * @param {array} props.nearbySamples - List of nearby samples.
 *
 * @returns {JSX.Element} - A page displaying nearby samples or a message if no samples are available.
 */
function NearMePage({
  navigation,
  nearbyLocation,
  text,
  setText,
  photoState,
  nearbySamples,
}) {
  const locationName =
    nearbyLocation?.distance?.nearby === true
      ? nearbyLocation.name
      : 'No Nearby Location';

  return (
    <SafeAreaView style={styles.nearbyAndPlayContainer}>
      <NearbyAndPlayHeader locationName={locationName} />
      {nearbySamples?.length > 0 ? (
        <FlatList
          data={nearbySamples}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <SampleCard
                sample={item}
                navigation={navigation}
                locationName={locationName}
                text={text}
                setText={setText}
                photoState={photoState}
              />
            );
          }}
          style={styles.screenPadding}
        />
      ) : (
        <NoSamples />
      )}
    </SafeAreaView>
  );
  // );
}

export default NearMePage;
