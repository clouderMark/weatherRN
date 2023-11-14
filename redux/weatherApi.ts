import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, TPosition, Weather} from '../types/types';

const WEATHER_API = 'https://api.openweathermap.org/data/2.5';
// eslint-disable-next-line prefer-destructuring
const API_KEY = process.env.API_KEY;

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${WEATHER_API}`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    getWeather: builder.mutation<Weather, TPosition>({
      query: (position) => ({
        url: `weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetWeatherMutation} = weatherApi;
