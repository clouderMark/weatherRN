import {createSlice} from '@reduxjs/toolkit';
import {NativeModules} from 'react-native';
import type {RootState} from './store';

const getSystemLocale = (): string => {
  let locale: string = '';

  // iOS
  if (
    NativeModules.SettingsManager &&
    NativeModules.SettingsManager.settings &&
    NativeModules.SettingsManager.settings.AppleLanguages
  ) {
    [locale] = NativeModules.SettingsManager.settings.AppleLanguages;
    // Android
  } else if (NativeModules.I18nManager) {
    locale = NativeModules.I18nManager.localeIdentifier;
  }

  if (typeof locale === 'undefined') {
    locale = 'en';
  }

  return locale;
};

interface IInitialState {
  locale: string;
}

const initialState: IInitialState = {
  locale: '',
};

export const systemLocale = createSlice({
  name: 'systemLocale',
  initialState,
  reducers: {
    setLocale: (state) => {
      const lang = getSystemLocale();

      [state.locale] = lang.split('-');
    },
  },
});

export const selectLocale = (state: RootState) => state.systemLocale;
export const {setLocale} = systemLocale.actions;
