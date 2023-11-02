import React from 'react';
import {KeyboardAvoidingView, LogBox, SafeAreaView, Text} from 'react-native';
import CustomRating from '../components/play-music/CustomRating';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';
import CurrentUsers from '../components/play-music/CurrentUsers';
import PlayMusicButton from '../components/play-music/PlayMusicButton';
import styles from '../data/styles';

/**
 * Represents a page for playing music and providing user ratings for a sample.
 *
 * @param {object} route - Route parameters for the page.
 * @param {object} route.params - Parameters passed to the page.
 * @param {object} route.params.sampleData - Details of the sample to play music for.
 * @param {string} route.params.locationName - Name of the location.
 * @param {string} route.params.text - Text input for user interactions.
 * @param {function} route.params.setText - Function to set the text input.
 * @param {object} route.params.photoState - The state of the photo.
 * @param {boolean} route.params.hasRated - Indicates if the user has submitted a rating.
 * @param {function} route.params.setHasRated - Function to set the 'hasRated' state.
 *
 * @returns {JSX.Element} - A page for playing music and providing ratings for a sample.
 */
function PlayMusicPage({route}) {
  const {
    sampleData,
    locationName,
    text,
    setText,
    photoState,
    hasRated,
    setHasRated,
  } = route.params;
  
  /**
   * According to React Native Docs
   * "If you don't use state persistence or deep link to the screen which accepts functions in params,
   * then the warning doesn't affect you and you can safely ignore it."
   *
   * I get this warning when I pass a callback to params but doesn't effect functionality.
   */
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.nearbyAndPlayContainer}>
      <SafeAreaView style={styles.screenPadding}>
        <NearbyAndPlayHeader locationName={locationName} />
        <Text style={styles.playMusicSongName}>{sampleData.name}</Text>
        <PlayMusicButton sampleData={sampleData} />
        <CustomRating
          sampleId={sampleData.id}
          sampleDate={sampleData.datetime}
          hasRated={hasRated}
          setHasRated={setHasRated}
        />
      </SafeAreaView>
      <CurrentUsers photoState={photoState} setText={setText} text={text} />
    </KeyboardAvoidingView>
  );
}

export default PlayMusicPage;
