import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, TPosition, IWelcome} from '../types/types';

const GEOPOSITION_API = 'https://geocode-maps.yandex.ru/1.x/';
// eslint-disable-next-line prefer-destructuring
const GEO_API_KEY = process.env.GEO_API_KEY;

export const geoApi = createApi({
  reducerPath: 'geoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${GEOPOSITION_API}`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    getGeo: builder.mutation<IWelcome, TPosition>({
      query: (position) => ({
        url: `?apikey=${GEO_API_KEY}&geocode=${position.longitude},${position.latitude}&format=json`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetGeoMutation} = geoApi;
