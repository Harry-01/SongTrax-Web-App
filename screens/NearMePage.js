import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, FlatList, Text, Image} from 'react-native';

import icons from '../data/icons';

import colors from '../data/theme';
import styles from '../data/styles';
import {iconPinLightPurple} from '../data/icons';
import SampleCard from '../components/SampleCard';
import {baseURL, APIKEY} from '../utils';
import Header from '../components/Header';

function NearMePage({navigation, nearbyLocation, text, setText, photoState}) {
  const [nearbySamples, setNearbySamples] = useState([]);

  useEffect(() => {
    if (nearbyLocation !== undefined && nearbyLocation.id !== undefined) {
      getSamplesByLocation(nearbyLocation.id);
    }
  }, [nearbyLocation]);

  async function getSamplesByLocation(locationId) {
    const url = `${baseURL}sampletolocation/?api_key=${APIKEY}&location_id=${locationId}`;
    const response = await fetch(url);
    const json = await response.json();
    setNearbySamples(json);
  }

  const locationName =
    nearbyLocation && nearbyLocation.name
      ? nearbyLocation.name
      : 'No Location Name';
  console.log(nearbyLocation);
  return (
    <SafeAreaView style={styles.nearbyAndPlayContainer}>
      <Header locationName={locationName} />
      {Object.keys(nearbyLocation).length > 0 ? (
        <FlatList
          data={nearbySamples}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <SampleCard
                sample={item}
                navigation={navigation}
                locationName={locationName}
                text={text ? text : 'Enter your name'}
                setText={setText}
                photoState={photoState}
              />
            );
          }}
          style={{
            padding: 10,
          }}></FlatList>
      ) : (
        <View>
          <Text>Hello</Text>
        </View>
      )}
    </SafeAreaView>
  );
  // );
}

export default NearMePage;
