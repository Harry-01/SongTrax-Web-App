import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  LogBox,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import CustomRating from '../components/CustomRating';
import NearbyAndPlayHeader from '../components/NearbyAndPlayHeader';
import CurrentUsers from '../components/play-music/CurrentUsers';
import styles from '../data/styles';
import colors from '../data/theme';
import {mode} from '../utils';

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
  const [loaded, setLoaded] = useState(false);
  const [actioned, setActioned] = useState(false);
  const webViewRef = useRef();

  /**
   * Watches for the WebView load completion and updates the state accordingly.
   */
  const webViewLoaded = () => {
    setLoaded(true);
  };

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  /**
   * Handles the action button press to play or stop the music playback.
   */
  const handleActionPress = () => {
    if (!actioned) {
      const playSong = `preparePreview(${sampleData.recording_data}, '${sampleData.type}'); playPreview();`;
      webViewRef.current.injectJavaScript(playSong);
    } else {
      webViewRef.current.injectJavaScript('stopSong()');
    }

    setActioned(!actioned);
  };

  /**
   * Resets the action state after a delay to prevent continuous play/stop actions.
   */
  useEffect(() => {
    const resetActioned = setTimeout(() => {
      setActioned(false);
    }, 4000);

    return () => clearTimeout(resetActioned);
  }, [actioned]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.nearbyAndPlayContainer}>
      <SafeAreaView style={styles.screenPadding}>
        <NearbyAndPlayHeader locationName={locationName} />
        <Text style={styles.playMusicSongName}>{sampleData.name}</Text>
        <WebView
          ref={ref => (webViewRef.current = ref)}
          originWhitelist={['*']}
          source={{
            uri: 'https://comp2140.uqcloud.net/static/samples/index.html',
          }}
          pullToRefreshEnabled={true}
          onLoad={webViewLoaded}
          style={styles.webView}
        />
        {loaded && (
          <View style={styles.playButton}>
            <Button
              onPress={handleActionPress}
              title={!actioned ? 'Play Music' : 'Stop Playback'}
              color={colors[mode].bgColor}
            />
          </View>
        )}
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
