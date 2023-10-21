import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, FlatList, Text, Image} from 'react-native';

import colors from '../data/theme';
import styles from '../data/styles';
import {iconPinLightPurple} from '../data/icons';
import SampleCard from '../components/SampleCard';
import {baseURL, APIKEY} from '../utils';

function NearMePage({navigation, nearbyLocation, text, setText, photoState}) {
  const [nearbySamples, setNearbySamples] = useState([]);

  useEffect(() => {
    getSamplesByLocation(nearbyLocation.id);
  }, [nearbyLocation]);

  async function getSamplesByLocation(locationId) {
    const url = `${baseURL}sampletolocation/?api_key=${APIKEY}&location_id=${locationId}`;
    const response = await fetch(url);
    const json = await response.json();
    setNearbySamples(json);
  }

  return (
    <SafeAreaView style={styles.nearbyAndPlayContainer}>
      <View style={styles.location}>
        <Image
          style={styles.locationIcon}
          source={{
            uri: iconPinLightPurple,
          }}
        />
        <Text style={styles.locationHeading}>{nearbyLocation.name}</Text>
      </View>
      <FlatList
        data={nearbySamples}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <SampleCard
              sample={item}
              navigation={navigation}
              locationName={nearbyLocation.name}
              text={text}
              setText={setText}
              photoState={photoState}
              // onPress={() =>
              //   navigation.navigate('PlayMusic', {
              //     sampleId: item.id,
              //     locationName: nearbyLocation.name,
              //   })
              // }
            />
          );
        }}
        style={{
          padding: 10,
        }}></FlatList>
    </SafeAreaView>
  );
  // );
}

export default NearMePage;
