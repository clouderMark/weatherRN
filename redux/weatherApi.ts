import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, TPosition, Weather} from '../types/types';

const WEATHER_API = 'https://api.openweathermap.org/data/2.5';
// eslint-disable-next-line prefer-destructuring
const API_KEY = process.env.API_KEY;

interface IProps {
  position: TPosition,
  lang: string,
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${WEATHER_API}`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    getWeather: builder.mutation<Weather, IProps>({
      query: (props) => ({
        url: `weather?lat=${props.position.latitude}&lon=${props.position.longitude}&appid=${API_KEY}&lang=${props.lang}&units=${props.lang === 'ru' ? 'metric' : 'imperial'}`, // eslint-disable-line
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetWeatherMutation} = weatherApi;
