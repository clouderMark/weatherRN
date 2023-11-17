import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import type {RootState} from './store';
import {TPosition} from '../types/types';

export type TInitialState = {
  position: TPosition;
};

const initialState: TInitialState = {
  position: {
    latitude: 0,
    longitude: 0,
  },
};

export const getCurrentPosition = createAsyncThunk(
  'currentPosition/get',
  async () =>
    new Promise<TPosition>((resolve) => {
      new Promise<void>((resolve) => {
        if (Platform.OS === 'ios') {
          Geolocation.requestAuthorization('whenInUse').then((x) => {
            if (x === 'granted') {
              resolve();
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
                resolve();
              } else {
                console.log('Location permission denied');
              }
            })();
          } catch (err) {
            console.warn(err);
          }
        }
      }).then(() => {
        Geolocation.getCurrentPosition((position) => {
          const {latitude, longitude} = position.coords;

          resolve({
            latitude: +latitude.toFixed(0),
            longitude: +longitude.toFixed(0),
          });
        });
      });
    }),
);

export const positionSlice = createSlice({
  name: 'position',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentPosition.fulfilled, (state, action) => {
      state.position = action.payload;
    });
  },
});

export const selectPosition = (state: RootState) => state.position;
