import {Middleware, configureStore} from '@reduxjs/toolkit';
import {weatherApi} from './weatherApi';
import {geoApi} from './geoApi';

const middlewares: Middleware[] = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default; // eslint-disable-line

  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [geoApi.reducerPath]: geoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares).concat(weatherApi.middleware).concat(geoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
