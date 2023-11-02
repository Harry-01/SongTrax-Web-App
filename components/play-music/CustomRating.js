import React, {useState} from 'react';
import {Rating} from 'react-native-elements';
import styles from '../../data/styles';
import colors from '../../data/colors';
import {APIKEY, baseURL, mode} from '../../utils';

/**
 * Represents a star rating component with functionality to submit user ratings.
 *
 * @param {object} props - The component's properties.
 * @param {number} props.sampleId - The ID of the sample.
 * @param {string} props.sampleDate - The date of the sample.
 * @param {boolean} props.hasRated - Indicates if the user has submitted a
 *                                   rating.
 * @param {function} props.setHasRated - Function to set the 'hasRated' state.
 *
 * @returns {JSX.Element} - A Rating component for user ratings.
 */
function CustomRating({sampleId, sampleDate, hasRated, setHasRated}) {
  // state that holds the hasRated locally to disable rating once rated
  const [hasRatedLocal, setHasRatedLocal] = useState(false);

  /**
   * Posts a user rating to the API.
   *
   * @param {number} newRating - The user's new rating to be posted.
   *
   * @returns {Promise<object>} - A promise containing the API response.
   */
  async function postRating(newRating) {
    const url = `${baseURL}samplerating/?api_key=${APIKEY}`;

    const data = {
      sample_id: sampleId,
      rating: newRating,
      datetime: sampleDate,
      api_key: APIKEY,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json;
  }

  /**
   * Handles the completion of a user rating.
   *
   * @param {number} rating - The user's rating.
   */
  async function ratingCompleted(rating) {
    if (!hasRated) {
      await postRating(rating);
      setHasRated(true);
      setHasRatedLocal(true);
    }
  }

  const tintColor = mode === 'dark' ? colors.dark.bgColor : null;

  return (
    <Rating
      type="star"
      fraction={0}
      startingValue={0}
      readonly={hasRatedLocal}
      imageSize={40}
      tintColor={tintColor}
      onFinishRating={rating => ratingCompleted(rating)}
      style={styles.ratingComponent}
    />
  );
}

export default CustomRating;
