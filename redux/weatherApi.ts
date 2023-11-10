import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, TLocation, Weather} from '../types/types';

const WEATHER_API = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '291ac51ddab2b5ccb5165b5619b5c1eb';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${WEATHER_API}`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    getWeather: builder.mutation<Weather, TLocation>({
      query: (location) => ({
        url: `weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetWeatherMutation} = weatherApi;
