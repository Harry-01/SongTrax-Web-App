import React, {useState} from 'react';
import {Text, View, Image, Appearance} from 'react-native';
import icons from '../data/icons';
import {Rating} from 'react-native-elements';
import colors from '../data/theme';
import styles from '../data/styles';
import {APIKEY, baseURL} from '../utils';
const mode = Appearance.getColorScheme();

function CustomRating({sampleId, sampleDate}) {
  const [hasRated, setHasRated] = useState(false);

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

  async function ratingCompleted(rating) {
    if (hasRated === false) {
      const response = await postRating(rating);
      // console.log(response);
      setHasRated(true);
    }
  }

  return (
    <View>
      {mode === 'dark' ? (
        <Rating
          type="star"
          fraction={0}
          startingValue={0}
          readonly={hasRated}
          imageSize={40}
          tintColor={colors.dark.bgColor}
          onFinishRating={rating => ratingCompleted(rating)}
          style={styles.ratingComponent}
        />
      ) : (
        <Rating
          type="star"
          fraction={0}
          startingValue={0}
          readonly={hasRated}
          imageSize={40}
          onFinishRating={rating => ratingCompleted(rating)}
          style={styles.ratingComponent}
        />
      )}
    </View>
  );
}

export default CustomRating;
