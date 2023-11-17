import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Home from './src/components/Home';

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
