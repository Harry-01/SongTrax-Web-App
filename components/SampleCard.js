import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Rating} from 'react-native-elements';
import colors from '../data/theme';
import styles from '../data/styles';
import {APIKEY, baseURL, mode} from '../utils';

/**
 * Represents a component for displaying details of a sample card.
 *
 * @param {object} props - The component's properties.
 * @param {object} props.sample - Details of the sample card.
 * @param {string} props.locationName - Name of the location.
 * @param {object} props.navigation - The navigation object.
 * @param {object} props.photoState - The state of the photo.
 * @param {string} props.text - Text input.
 * @param {function} props.setText - Function to set the text input.
 *
 * @returns {JSX.Element} - A component displaying the sample card details.
 */
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
  const [hasRated, setHasRated] = useState(false);

  /**
   * Handles navigation to the 'PlayMusic' screen and passes necessary data.
   */
  let onPress = () => {
    navigation.removeListener;
    navigation.navigate('PlayMusic', {
      sampleData: sampleData,
      locationName: locationName,
      photoState: photoState,
      text: text,
      setText: setText,
      hasRated: hasRated,
      setHasRated: setHasRated,
    });
  };

  useEffect(() => {
    getSampleById(sample.sample_id);
    calculateAverageRating(sample.sample_id);
  }, [sample, avgRating]);

  useEffect(() => {
    calculateAverageRating(sample.sample_id);
    setHasRated(false);
  }, [hasRated]);

  /**
   * Retrieves sample details by ID from the server.
   * @param {number} sampleId - The ID of the sample.
   */
  async function getSampleById(sampleId) {
    const url = `${baseURL}sample/${sampleId}/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    setSampleData(json);
  }

  /**
   * Retrieves rating details for a particular sample from the server.
   * @param {number} sampleId - The ID of the sample.
   *
   * @returns {object} - Rating data for the sample.
   */
  async function getRatingById(sampleId) {
    const url = `${baseURL}samplerating/?api_key=${APIKEY}&sample_id=${sampleId}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  /**
   * Calculates the average rating for a specific sample.
   * @param {number} sampleId - The ID of the sample.
   */
  async function calculateAverageRating(sampleId) {
    const ratingData = await getRatingById(sampleId);
    const ratings = ratingData.map(item => item.rating);
    const ratingSum = ratings.reduce((a, b) => a + b, 0);
    const ratingAvg = ratingSum / ratings.length || 0;
    setAvgRating(ratingAvg);
  }

  /**
   * Formats the given ISO date string to a specific date format.
   * @param {string} isoDateTime - ISO date and time string.
   *
   * @returns {string} - Formatted date string.
   */
  function formatDateTime(isoDateTime) {
    const date = new Date(isoDateTime);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so we add 1
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const tintColor = mode === 'dark' ? colors.dark.bgColor : null;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.sampleCardContainer}>
        <Text style={styles.sampleCardText}>{sampleData.name}</Text>
        <Text style={styles.sampleCardDatetime}>
          {formatDateTime(sampleData.datetime)}
        </Text>
        <Rating
          type="star"
          startingValue={avgRating}
          readonly
          imageSize={30}
          tintColor={tintColor}
          style={styles.sampleCardRating}
        />
      </View>
    </TouchableOpacity>
  );
}

export default SampleCard;
