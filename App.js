import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import Tabs from './components/Tabs';

import {colors} from './data/theme';
import styles from './data/styles';
import NearMePage from './screens/NearMePage';
import PlayMusicPage from './screens/PlayMusicPage';
// import initialRecipes from "./data/recipes";

const Stack = createStackNavigator();

function App() {
  const [nearbySamples, setNearbySamples] = useState([]);

  return (
    <SafeAreaView style={styles.nearbyAndPlayContainer}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Tabs'}>
          <Stack.Screen
            name="PlayMusic"
            children={props => <PlayMusicPage {...props} />}
          />
          <Stack.Screen name="Tabs" children={props => <Tabs {...props} />} />

          <Stack.Screen
            name="NearMe"
            children={props => <NearMePage {...props} />}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
