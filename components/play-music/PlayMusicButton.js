import React, {useEffect, useRef, useState} from 'react';
import {Button, View} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from '../../data/styles';
import colors from '../../data/colors';
import {mode} from '../../utils';

/**
 * Renders the button and webview to play music
 * @param {object} props - The component props.
 * @param {object} props.sampleData - the recording data of the sample
 *
 * @returns {JSX.Element} A JSX element representing the play button user section.
 */
function PlayMusicButton({sampleData}) {
  const [loaded, setLoaded] = useState(false);
  const [actioned, setActioned] = useState(false);
  const webViewRef = useRef();

  /**
   * Watches for the WebView load completion and updates the state accordingly.
   */
  const webViewLoaded = () => {
    setLoaded(true);
  };

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
    <View>
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
            title={!actioned ? 'Play Music' : 'Stop Music'}
            color={colors[mode].bgColor}
          />
        </View>
      )}
    </View>
  );
}

export default PlayMusicButton;
