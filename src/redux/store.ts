import {Middleware, configureStore} from '@reduxjs/toolkit';
import {weatherApi, weatherSlice} from './weatherApi';
import {positionSlice} from './positionSlice';
import {colorSchemeSlice} from './colorSchemeSlice';
import {systemLocale} from './systemLocale';

const middlewares: Middleware[] = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default; // eslint-disable-line

  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    weather: weatherSlice.reducer,
    position: positionSlice.reducer,
    colorScheme: colorSchemeSlice.reducer,
    systemLocale: systemLocale.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(middlewares)
      .concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
