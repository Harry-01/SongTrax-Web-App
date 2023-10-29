import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image, Appearance} from 'react-native';
import {baseURL, APIKEY} from '../utils';
import colors from '../data/theme';
import styles from '../data/styles';
import {Rating} from 'react-native-elements';
const mode = Appearance.getColorScheme();

function SampleCard({
  sample,
  locationName,
  navigation,
  photoState,
  text,
  setText,
}) {
  const [sampleData, setSampleData] = useState({});
  const [avgRating, setAvgRating] = useState(0);
  let onPress = () => {
    navigation.removeListener;
    navigation.navigate('PlayMusic', {
      sampleData: sampleData,
      locationName: locationName,
      photoState: photoState,
      text: text,
      setText: setText,
    });
  };

  useEffect(() => {
    getSampleById(sample.sample_id);
    calculateAverageRating(sample.sample_id);
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
    // setRating(json);
    // console.log(json);
    return json;
  }

  async function calculateAverageRating(sampleId) {
    const ratingData = await getRatingById(sampleId);
    const ratings = ratingData.map(item => item.rating);
    const ratingSum = ratings.reduce((a, b) => a + b, 0);
    const ratingAvg = ratingSum / ratings.length || 0;
    setAvgRating(ratingAvg);
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
      <View
        style={{borderBottomWidth: 1, borderBottomColor: colors.borderColor}}>
        <Text
          style={{
            marginBottom: 5,
            color: colors[mode].fontColor,
          }}>
          {sampleData.name}
        </Text>
        <Text style={{color: colors[mode].fontColor}}>
          {formatDateTime(sampleData.datetime)}
        </Text>
        {mode === 'dark' ? (
          <Rating
            type="star"
            startingValue={avgRating}
            readonly
            tintColor={colors.dark.bgColor}
            imageSize={30}
            //   onFinishRating={ratingCompleted}
            style={{
              paddingVertical: 10,
            }}
          />
        ) : (
          <Rating
            type="star"
            startingValue={avgRating}
            readonly
            imageSize={30}
            //   onFinishRating={ratingCompleted}
            style={{
              paddingVertical: 10,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default SampleCard;
