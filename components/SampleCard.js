import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image, Appearance} from 'react-native';
import {baseURL, APIKEY} from '../utils';
import colors from '../data/theme';
import styles from '../data/styles';
import {Rating} from 'react-native-elements';
//Appearance.getColorScheme();

function SampleCard({
  sample,
  locationName,
  navigation,
  photoState,
  text,
  setText,
}) {
  const [sampleData, setSampleData] = useState({});
  const [rating, setRating] = useState({});
  const mode = 'dark';
  const theme = mode === 'dark' ? colors.light : colors.dark;
  let onPress = () =>
    navigation.navigate('PlayMusic', {
      sampleData: sampleData,
      rating: rating,
      locationName: locationName,
      photoState: photoState,
      text: text,
      setText: setText,
    });

  useEffect(() => {
    getSampleById(sample.sample_id);
    getRatingById(sample.sample_id);
  }, [sample]);

  async function getSampleById(sampleId) {
    const url = `${baseURL}sample/${sampleId}/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    setSampleData(json);
  }
  async function getRatingById(sampleId) {
    const url = `${baseURL}samplerating/?api_key=${APIKEY}&sample_id=${sampleId}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    setRating(json);
  }

  function formatDateTime(isoDateTime) {
    const date = new Date(isoDateTime);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so we add 1
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{borderBottomWidth: 1, borderBottomColor: theme.bgColor}}>
        <Text style={{marginBottom: 5, color: theme.bgColor}}>
          {sampleData.name}
        </Text>
        <Text style={{color: theme.bgColor}}>
          {formatDateTime(sampleData.datetime)}
        </Text>
        <Rating
          type="star"
          startingValue={4}
          readonly
          imageSize={30}
          //   onFinishRating={ratingCompleted}
          style={{
            paddingVertical: 10,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

export default SampleCard;
