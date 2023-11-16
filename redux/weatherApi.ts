import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, IWeather, TPosition, Welcome} from '../types/types';

const WEATHER_API = 'https://api.openweathermap.org';
// eslint-disable-next-line prefer-destructuring
const API_KEY = process.env.API_KEY;
const limit = 5;

interface IProps {
  position: TPosition,
  lang: string,
}

interface ILocationName {
  name: string
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${WEATHER_API}`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    getWeather: builder.mutation<IWeather, IProps>({
      query: (props) => ({
        url: `data/2.5/forecast?lat=${props.position.latitude}&lon=${props.position.longitude}&appid=${API_KEY}&lang=${props.lang}&units=${props.lang === 'ru' ? 'metric' : 'imperial'}`, // eslint-disable-line
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

export const {useGetWeatherMutation} = weatherApi;
