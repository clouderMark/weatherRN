import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {weatherApi} from './weatherApi';
import {getTime} from '../components/getTime';

interface IInitialState {
  isDarkMode: boolean;
  sunrice: Date;
  sunset: Date;
  today: Date;
}

const initialState: IInitialState = {
  isDarkMode: false,
  sunrice: new Date(),
  sunset: new Date(),
  today: new Date(),
};

export const colorSchemeSlice = createSlice({
  name: 'colorScheme',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      if (state.isDarkMode !== action.payload) {
        state.isDarkMode = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(weatherApi.endpoints.getWeather.matchFulfilled, (state, action) => {
      const {payload} = action;
      const sunrice = getTime(payload.city.sunrise, payload.city.timezone);
      const sunset = getTime(payload.city.sunset, payload.city.timezone);
      const today = new Date(Date.now() + payload.city.timezone * 1000);
      // const today = new Date('2023-11-20T12:16:38.090Z');

      // console.log({sunrice, sunset, today});

      if (!state.isDarkMode && (sunrice > today || today > sunset)) {
        state.isDarkMode = true;
      }

      state.sunrice = sunrice;
      state.sunset = sunset;
      state.today = today;
    });
  },
});

export const selectMode = (state: RootState) => state.colorScheme.isDarkMode;
export const selectSunAction = (state: RootState) => state.colorScheme;
export const {setDarkMode} = colorSchemeSlice.actions;
