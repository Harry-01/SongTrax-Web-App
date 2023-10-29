import React, {useRef, useState} from 'react';
import {
  Appearance,
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

import {WebView} from 'react-native-webview';
import CustomRating from '../components/CustomRating';
import Header from '../components/Header';
import icon from '../data/icons';
import styles from '../data/styles';
import colors from '../data/theme';
const mode = Appearance.getColorScheme();

const {width, height} = Dimensions.get('window');

function PlayMusicPage({route}) {
  const {sampleData, locationName, text, setText, photoState} = route.params;
  const [previewing, setPreviewing] = useState(false);
  const [webViewState, setWebViewState] = useState({
    loaded: false,
    actioned: false,
  });
  const initialTextState = {
    
  }
  const [currentInput, setCurrentInput] = useState(text);
  const webViewRef = useRef();

  function webViewLoaded() {
    setWebViewState({
      ...webViewState,
      loaded: true,
    });
  }

  function handleActionPress() {
    if (!webViewState.actioned) {
      const playSong = `preparePreview(${sampleData.recording_data}, '${sampleData.type}'); playPreview();`;
      webViewRef.current.injectJavaScript(playSong);
      // webViewRef.current.injectJavaScript('playSong()');
    } else {
      webViewRef.current.injectJavaScript('stopSong()');
    }
    setWebViewState({
      ...webViewState,
      actioned: !webViewState.actioned,
    });

    setTimeout(() => {
      setWebViewState({
        ...webViewState,
        actioned: false,
      });
    }, 4000);
  }

  const handleInput = newText => {
    setText(newText);
    setCurrentInput(newText);
  };

  const localStyles = {
    userRow: {
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'left',
      gap: 10,
      alignItems: 'center',
    },
    profileImage: {
      borderRadius: 100, // A large value to create a circle
      borderColor: colors[mode].fgColor,
      borderWidth: 3, // You can adjust the border width as needed
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      marginHorizontal: 10,
    },
  };

  return (
    <SafeAreaView style={styles.nearbyAndPlayContainer}>
      <View style={{padding: 10}}>
        <Header locationName={locationName} />
        <Text style={[styles.songName, {paddingBottom: 20}]}>
          {sampleData.name}
        </Text>
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
        {webViewState.loaded && (
          <View style={styles.playButton}>
            <Button
              onPress={handleActionPress}
              title={!webViewState.actioned ? 'Play Music' : 'Stop Playback'}
              color={colors[mode].bgColor}
            />
          </View>
        )}
        <CustomRating
          sampleId={sampleData.id}
          sampleDate={sampleData.datetime}
        />
      </View>
      <View>
        <Text style={styles.songName}>Currently At This Location:</Text>
        <View style={localStyles.userRow}>
          <Image
            style={[localStyles.profileImage, {width: 70, height: 70}]}
            resizeMode="cover"
            source={
              photoState.uri
                ? {
                    uri: photoState.uri,
                  }
                : mode === 'dark'
                ? icon.iconSmileyLightpurple
                : icon.iconSmileyDarkpurple
            }
          />
          <TextInput
            placeholder={text}
            style={{color: colors[mode].fgColor}}
            onChangeText={handleInput}
            value={currentInput}
          />
        </View>
        <View style={[localStyles.userRow]}>
          <Image
            style={[localStyles.profileImage, {width: 70, height: 70}]}
            resizeMode="cover"
            source={
              mode === 'dark'
                ? icon.iconSmileyLightpurple
                : icon.iconSmileyDarkpurple
            }
          />
          <Text style={{color: colors[mode].fgColor}}>And others...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PlayMusicPage;
