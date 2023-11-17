import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';

interface IInitialState {
  isDarkMode: boolean;
}

const initialState: IInitialState = {
  isDarkMode: false,
};

export const colorSchemeSlice = createSlice({
  name: 'colorScheme',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const selectMode = (state: RootState) => state.colorScheme.isDarkMode;
export const {setDarkMode} = colorSchemeSlice.actions;
