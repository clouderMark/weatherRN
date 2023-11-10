import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {TLocation} from '../types/types';

const useLocation = () => {
  const [location, setLocation] = useState<TLocation | null>(null);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      getCurrentLocation();
      Geolocation.requestAuthorization('whenInUse').then((x) => {
        if (x === 'granted') {
          getCurrentLocation();
        }
      });
    } else if (Platform.OS === 'android') {
      try {
        const granted = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: 'Device current location permission',
          message: 'Allow app to get your current location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        (async () => {
          if ((await granted) === 'granted') {
            getCurrentLocation();
          } else {
            console.log('Location permission denied');
          }
        })();
      } catch (err) {
        console.warn(err);
      }
    }
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;

        setLocation({
          latitude: +latitude.toFixed(0),
          longitude: +longitude.toFixed(0),
        });
      },
    );
  };

  return location;
};

export default useLocation;
