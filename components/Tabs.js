import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Map from '../screens/Map';
import ProfilePage from '../screens/ProfilePage';
import NearMePage from '../screens/NearMePage';

import colors from '../data/theme';
import icons from '../data/icons';

function TabIcon({focused, icon}) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 50,
      }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 100,
          height: 30,
          tintColor: focused ? colors.darkPurple : colors.lightLime,
        }}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function tabOptions(icon, labelValue) {
  return {
    tabBarIcon: ({focused}) => <TabIcon focused={focused} icon={icon} />,
    // tabBarActiveTintColor: colors.white,
    tabBarInactiveTintColor: colors.darkPurple,
    tabBarActiveBackgroundColor: colors.blackColorTranslucentLess,
    tabBarStyle: {
      height: 70,
      //   padding: styles.nearbyAndPlayContainer,
      //   backgroundColor: colors.darkGreen,
    },
    tabBarLabel: labelValue,
    tabBarBackground: () => (
      <LinearGradient
        colors={[colors.purpleColorLighter, colors.blueColorDarker]}
        style={{flex: 1}}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      />
    ),
  };
}

function Tabs({navigation}) {
  const [nearbyLocation, setNearbyLocation] = useState();
  const [photoState, setPhotoState] = useState({});
  const [text, setText] = useState('');

  const displayNearbylabel =
    nearbyLocation !== null ? "There's Music Nearby" : '';
  //   useEffect(() => {
  //     console.log("from tabs")
  //     console.log(nearbySamples);
  //   }, [nearbySamples]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Map"
        children={() => (
          <Map navigation={navigation} setNearbyLocation={setNearbyLocation} />
        )}
        options={() => tabOptions(icons.tabMapWhite, '')}
      />
      <Tab.Screen
        name="NearMe"
        children={() => (
          <NearMePage
            navigation={navigation}
            nearbyLocation={nearbyLocation}
            text={text}
            setText={setText}
            photoState={photoState}
          />
        )}
        options={() => tabOptions(icons.logoWhitepurple, displayNearbylabel)}
      />
      <Tab.Screen
        name="Profile"
        children={() => (
          <ProfilePage
            navigation={navigation}
            setText={setText}
            text={text}
            setPhotoState={setPhotoState}
            photoState={photoState}
          />
        )}
        options={() => tabOptions(icons.tabProfileWhite, '')}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
