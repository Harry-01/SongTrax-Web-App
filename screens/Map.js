import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';

import {APIKEY, baseURL} from '../utils';
// Import React Native Maps
import MapView, {Circle} from 'react-native-maps';

// Import React Native Geolocation
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';
import styles from '../data/styles';
import {mode} from '../utils';

/**
 * Component for displaying the map screen.
 *
 * @param {object} props - The component's properties.
 * @param {function} props.setNearbyLocation - Function to set the nearby location.
 *
 * @returns {JSX.Element} - Component for displaying the map and markers.
 */
export default function Map({setNearbyLocation}) {
  // Setup state for map data
  const initialMapState = {
    locationPermission: false,
    locations: [],
    userLocation: {
      latitude: -27.499526188402154,
      longitude: 152.9728129460468,
      // Starts at "Indooroopilly Shopping Centre"
    },
  };
  const [mapState, setMapState] = useState(initialMapState);
  const [dataFetched, setDataFetched] = useState(false);

  /**
   * Fetches the list of locations from the server.
   * @returns {Array} - List of locations fetched from the server.
   */
  async function getLocations() {
    const url = `${baseURL}location/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  /**
   * Updates the locations retrieved from the server with parsed coordinates.
   * @returns {Array} - List of updated locations.
   */
  async function updateLocations() {
    const locations = await getLocations();
    const newLocations = locations
      .filter(
        location =>
          location.latitude !== null &&
          location.longitude !== null &&
          location.sharing,
      )
      .map(locationData => {
        locationData.coordinates = {
          latitude: parseFloat(locationData.latitude),
          longitude: parseFloat(locationData.longitude),
        };
        return locationData;
      });
    return newLocations;
  }

  // Run location permissions check after render due to side effects
  // Only Android needs extra code to check for permissions (in addition to android/app/src/main/AndroidManifest.xml)
  // iOS relies on ios/mapApp/Info.plist
  useEffect(() => {
    async function requestAndroidLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app will put your location on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setMapState({
            ...mapState,
            locationPermission: true,
          });
        }
      } catch (error) {
        console.warn(error);
      }
    }

    if (Platform.OS === 'android') {
      requestAndroidLocationPermission();
    } else {
      setMapState({
        ...mapState,
        locationPermission: true,
      });
    }
  }, []);

  /**
   * Calculates the distance between the user location and available locations.
   * @param {object} userLocation - User's geographical latlong location.
   * @param {Array} locations - List of available locations.
   * @returns {object} - The nearest location based on distance.
   */
  function calculateDistance(userLocation, locations) {
    if (locations && locations.length > 0) {
      const nearestLocations = locations
        .map(location => {
          const metres = getDistance(userLocation, location.coordinates);
          location['distance'] = {
            metres: metres,
            nearby: metres <= 100,
          };
          return location;
        })
        .sort(
          (previousLocation, thisLocation) =>
            previousLocation.distance.metres - thisLocation.distance.metres,
        );
      return nearestLocations[0]; // Consider the nearest location
    }
    return null; // Return null or handle an empty case as required
  }

  /**
   * Fetches and updates the location data.
   */
  async function fetchData() {
    const locations = await updateLocations();
    setMapState(prevMapState => ({
      ...prevMapState,
      locations: locations,
    }));
    setDataFetched(true);
  }

  useEffect(() => {
    fetchData();
  }, []); //this might cause bugs

  /**
   * Watches the user's position and updates state based on location changes.
   */
  useEffect(() => {
    /**
     * Function to handle changes in the user's location.
     *
     * @param {Object} position - The user's current position object.
     * @param {Object} position.coords - The coordinates of the user's location.
     * @param {number} position.coords.latitude - The latitude of the user's location.
     * @param {number} position.coords.longitude - The longitude of the user's location.
     */
    const handleLocationChange = position => {
      const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const nearbyLocation = calculateDistance(
        userLocation,
        mapState.locations,
      );
      setNearbyLocation(nearbyLocation);

      setMapState(prevMapState => ({
        ...prevMapState,
        userLocation,
      }));
    };

    /**
     * Function to handle errors related to location tracking.
     *
     * @param {Object} error - The error object received from location tracking.
     */
    const handleError = error => {
      console.log(error);
    };

    if (mapState.locationPermission) {
      Geolocation.watchPosition(handleLocationChange, handleError);
    }

    /**
     * Clean-up function to clear location tracking.
     * Executes when the component unmounts or when dependencies change.
     */
    return () => {
      Geolocation.clearWatch();
    };
  }, [mapState.locationPermission, mapState.locations, dataFetched]);

  return (
    <>
      <MapView
        camera={{
          center: mapState.userLocation,
          pitch: 0, // Angle of 3D map
          heading: 0, // Compass direction
          altitude: 6000, // Zoom level for iOS
          zoom: 15, // Zoom level For Android
        }}
        showsUserLocation={mapState.locationPermission}
        style={styles.container}>
        {mapState.locations.map(location => (
          <Circle
            key={location.id}
            center={location.coordinates}
            radius={100}
            strokeWidth={3}
            strokeColor="#A42DE8"
            fillColor={
              mode == 'dark' ? 'rgba(128,0,128,0.5)' : 'rgba(210,169,210,0.5)'
            }
          />
        ))}
      </MapView>
    </>
  );
}
