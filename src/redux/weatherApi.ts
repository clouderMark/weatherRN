import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {createSlice} from '@reduxjs/toolkit';
import {ICustomError, IWeather, TPosition, Welcome} from '../types/types';
import type {RootState} from './store';

const WEATHER_API = 'https://api.openweathermap.org';
// eslint-disable-next-line prefer-destructuring
const API_KEY = process.env.API_KEY;
const limit = 5;

interface IProps {
  position: TPosition;
  lang: string;
}

interface ILocationName {
  name: string;
}

type IInitialState = Omit<IWeather, 'id' | 'isOpen'> & {
  minTemp: number,
  maxTemp: number,
  description: string,
  temp: number,
};

export const initialState: IInitialState = {
  cod: '',
  message: 0,
  cnt: 0,
  list: [],
  city: {
    id: 0,
    name: '',
    coord: {
      lat: 0,
      lon: 0,
    },
    country: '',
    population: 0,
    timezone: 0,
    sunrise: 0,
    sunset: 0,
  },
  minTemp: 0,
  maxTemp: 0,
  description: '',
  temp: 0,
};

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${WEATHER_API}`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    getWeather: builder.mutation<IWeather, IProps>({
      query: (props) => ({
        url: `data/2.5/forecast?lat=${props.position.latitude}&lon=${props.position.longitude}&appid=${API_KEY}&lang=${
          props.lang
        }&units=${props.lang === 'ru' ? 'metric' : 'imperial'}`, // eslint-disable-line
        method: 'GET',
      }),
    }),
    getCoordinatesByLocationName: builder.mutation<Welcome, ILocationName>({
      query: (props) => ({
        url: `/geo/1.0/direct?q=${props.name}&limit=${limit}&appid=${API_KEY}`, // eslint-disable-line
        method: 'GET',
      }),
    }),
  }),
});

interface IDefaultValue {min: number, max: number}
const defaultValue = {min: 0, max: 0};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(weatherApi.endpoints.getWeather.matchFulfilled, (state, action) => {
      const {payload} = action;

      state.cod = payload.cod;
      state.message = payload.message;
      state.cnt = payload.cnt;
      state.city = payload.city;
      state.list = payload.list;

      const minMaxTemp: IDefaultValue = payload.list.reduce((values, el) => {
        const min = el.main.temp_min;
        const max = el.main.temp_max;

        if (values.min === 0) {
          values.min = min;
        } else if (values.min > min) {
          values.min = min;
        } else if (values.max < max) {
          values.max = max;
        }

        return values;
      }, defaultValue);

      state.minTemp = Math.round(minMaxTemp.min);
      state.maxTemp = Math.round(minMaxTemp.max);

      const dataWeather = payload.list[0].weather[0].description;

      state.description = dataWeather[0].toUpperCase() + dataWeather.slice(1);
      state.temp = Math.round(payload.list[0].main.temp);
    });
  },
});

export const selectWetherData = (state: RootState) => state.weather;

export const {useGetWeatherMutation} = weatherApi;
