import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Map from '../screens/Map';
import ProfilePage from '../screens/ProfilePage';
import NearMePage from '../screens/NearMePage';
import PlayMusicPage from '../screens/PlayMusicPage';

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

const Stack = createStackNavigator();

function tabOptions(icon, labelValue, labelStyle, newWidth) {
  return {
    tabBarIcon: ({focused}) => <TabIcon focused={focused} icon={icon} />,
    // tabBarActiveTintColor: colors.white,
    tabBarInactiveTintColor: colors.darkPurple,
    tabBarActiveBackgroundColor: colors.blackColorTranslucentLess,
    tabBarStyle: {
      height: 70,
      paddingHorizontal: 20,
    },
    tabBarLabelStyle: labelStyle,
    tabBarLabel: labelValue,
    tabBarItemStyle: {
      paddingTop: 10,
      paddingHorizontal: newWidth,
    },
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
  const [nearbyLocation, setNearbyLocation] = useState({});
  const [conditionalLabel, setConditionalLabel] = useState('');
  const [photoState, setPhotoState] = useState({});
  const [text, setText] = useState('');
  // console.log(nearbyLocation);

  useEffect(() => {
    if (
      nearbyLocation &&
      nearbyLocation.distance &&
      nearbyLocation.distance.nearby !== undefined
    ) {
      // console.log(nearbyLocation.distance.nearby);
      const isNearbyLocationEmpty = nearbyLocation.distance.nearby === true;
      const displayNearbylabel = isNearbyLocationEmpty
        ? "There's Music Nearby"
        : '';
      setConditionalLabel(displayNearbylabel);
    }
  }, [nearbyLocation]);

  const NearMeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
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
        />
        <Stack.Screen
          name="PlayMusic"
          children={props => <PlayMusicPage {...props} />}
        />
        {/* Add more screens for the 'NearMe' tab as needed */}
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Map"
        children={() => (
          <Map navigation={navigation} setNearbyLocation={setNearbyLocation} />
        )}
        options={() => tabOptions(icons.tabMapWhite, '', {}, 20)}
      />
      <Tab.Screen
        name="NearMeStack"
        children={NearMeStack}
        options={() =>
          tabOptions(
            icons.logoWhitepurple,
            conditionalLabel,
            {
              marginBottom: 10,
              fontSize: 15,
              width: 200,
              color: colors.whiteColor,
            },
            50,
          )
        }
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
        options={() => tabOptions(icons.tabProfileWhite, '', {}, 20)}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
