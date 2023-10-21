import React, {useRef, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import {Rating} from 'react-native-elements';
import {WebView} from 'react-native-webview';
import {iconPinLightPurple} from '../data/icons';
import styles from '../data/styles';
import colors from '../data/theme';
import {iconSmileyLightpurple} from '../data/icons';

const {width, height} = Dimensions.get('window');

function PlayMusicPage({route}) {
  const {sampleData, rating, locationName, text, setText, photoState} =
    route.params;
  const [previewing, setPreviewing] = useState(false);
  const [webViewState, setWebViewState] = useState({
    loaded: false,
    actioned: false,
  });
  const [currentInput, setCurrentInput] = useState(text);
  const webViewRef = useRef();

  function webViewLoaded() {
    setWebViewState({
      ...webViewState,
      loaded: true,
    });
  }

  function handleReloadPress() {
    webViewRef.current.reload();
  }

  function handleActionPress() {
    if (!webViewState.actioned) {
      setPreviewing(true);
      const songData = JSON.parse(sampleData.recording_data);
      console.log(typeof songData);
      console.log(webViewState);
      webViewRef.current.injectJavaScript(
        `preparePreview(${songData}, ${sampleData.type})`,
      );
      webViewRef.current.injectJavaScript('playPreview()');
    } else {
      webViewRef.current.injectJavaScript('stopSong()');
    }
    setWebViewState({
      ...webViewState,
      actioned: !webViewState.actioned,
    });
  }

  function playBackSample() {
    console.log(sampleData);
  }

  const handleInput = newText => {
    setText(newText);
    setCurrentInput(newText);
  };

  const localStyles = {
    userRow: {
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'left',
      gap: 10,
      alignItems: 'center',
    },
    profileImage: {
      borderRadius: 100, // A large value to create a circle
      borderColor: colors.purpleColorLighter,
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
        <View style={styles.location}>
          <Image
            style={styles.locationIcon}
            source={{
              uri: iconPinLightPurple,
              width: 50,
              height: 50,
            }}
          />
          <Text style={styles.locationHeading}>{locationName}</Text>
        </View>
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
            {/* <Button onPress={handleReloadPress} title="Reload WebView" /> */}
            <Button
              onPress={handleActionPress}
              title={!webViewState.actioned ? 'Play Music' : 'Stop Playback'}
            />
          </View>
        )}
        <Rating
          type="star"
          fraction={0}
          startingValue={rating}
          readonly={false}
          imageSize={40}
          //   onFinishRating={ratingCompleted}
          style={styles.ratingComponent}
        />
      </View>
      <View>
        <Text style={styles.songName}>Currently At This Location:</Text>
        <View style={localStyles.userRow}>
          <Image
            style={localStyles.profileImage}
            resizeMode="cover"
            source={{
              uri: photoState.uri,
              width: 70,
              height: 70,
            }}
          />
          <TextInput
            placeholder={text}
            onChangeText={handleInput}
            value={currentInput}
          />
        </View>
        <View style={localStyles.userRow}>
          <Image
            style={localStyles.profileImage}
            resizeMode="cover"
            source={{
              uri: iconSmileyLightpurple,
              width: 70,
              height: 70,
            }}
          />
          <Text>Add other...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PlayMusicPage;
