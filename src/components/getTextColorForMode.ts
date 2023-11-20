import {Colors} from 'react-native/Libraries/NewAppScreen';

export const getTextColorForMode = (isDarkMode: boolean) => ({
  color: isDarkMode ? Colors.lighter : Colors.dark,
});
