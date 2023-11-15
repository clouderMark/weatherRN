import {Middleware, configureStore} from '@reduxjs/toolkit';
import {weatherApi} from './weatherApi';
import {geoApi} from './geoApi';
import {positionSlice} from './positionSlice';
import {colorSchemeSlice} from './colorSchemeSlice';

const middlewares: Middleware[] = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default; // eslint-disable-line

  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [geoApi.reducerPath]: geoApi.reducer,
    position: positionSlice.reducer,
    colorScheme: colorSchemeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(middlewares)
      .concat(weatherApi.middleware)
      .concat(geoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
