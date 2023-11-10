import {Middleware, configureStore} from '@reduxjs/toolkit';
import {weatherApi} from './weatherApi';

const middlewares: Middleware[] = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default; // eslint-disable-line

  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares).concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
