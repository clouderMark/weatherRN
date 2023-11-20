import React, {useEffect} from 'react';
import {View, useColorScheme} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getCurrentPosition, selectPosition} from '../redux/positionSlice';
import {useGetWeatherMutation} from '../redux/weatherApi';
import HomeAreaView from './HomeAreaView';
import CityName from './CityName';
import Weather from './Weather';
import {selectLocale, setLocale} from '../redux/systemLocale';
import WeatherForTheDay from './weatherForTheDay/WeatherForTheDay';
import {setDarkMode} from '../redux/colorSchemeSlice';

function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const {position} = useAppSelector(selectPosition);
  const {locale} = useAppSelector(selectLocale);
  const [getWeather] = useGetWeatherMutation();
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    dispatch(getCurrentPosition());
    dispatch(setLocale());
  }, []);

  useEffect(() => {
    dispatch(setDarkMode(isDark));
  }, [isDark]);

  useEffect(() => {
    if (position.latitude && position.longitude && locale) {
      getWeather({position, lang: locale});
    }
  }, [position, locale]);

  return (
    <HomeAreaView>
      <View>
        <CityName />
        <Weather />
        <WeatherForTheDay />
      </View>
    </HomeAreaView>
  );
}

export default Home;
