import {useEffect, type PropsWithChildren} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectPosition} from '../redux/positionSlice';
import {useGetWeatherMutation} from '../redux/weatherApi';
import {selectMode, setDarkMode} from '../redux/colorSchemeSlice';
import {selectLocale} from '../redux/systemLocale';

interface ITime {
  time: number;
  timezone: number;
}

const getTime = (data: ITime): Date => new Date((data.time + data.timezone) * 1000);

const HomeAreaView = ({children}: PropsWithChildren): JSX.Element => {
  const dispatch = useAppDispatch();
  const {position} = useAppSelector(selectPosition);
  const {locale} = useAppSelector(selectLocale);
  const [getWeather, {data: weatherData, isSuccess: isWeatherSuccess}] = useGetWeatherMutation();
  const isDark = useColorScheme() === 'dark';
  const isDarkMode = useAppSelector(selectMode);

  useEffect(() => {
    if (position && locale) {
      getWeather({position, lang: locale});
    }
  }, [position, locale]);

  useEffect(() => {
    if (isWeatherSuccess && weatherData) {
      const sunrice = getTime({time: weatherData.sys.sunrise, timezone: weatherData.timezone});
      const sunset = getTime({time: weatherData.sys.sunset, timezone: weatherData.timezone});
      const today = new Date(Date.now() + weatherData.timezone * 1000);
      // const today = new Date('2023-11-15T12:16:38.090Z');
      // console.log({sunrice, sunset, today});

      if (sunrice > today || today > sunset || isDark) {
        dispatch(setDarkMode(true));
        console.log('dark');
      } else {
        dispatch(setDarkMode(false));
        console.log('light');
      }
    } else console.log('weatherData is empty');
  }, [isWeatherSuccess]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={[backgroundStyle, styles.container]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default HomeAreaView;
