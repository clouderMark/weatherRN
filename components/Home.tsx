import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getCurrentPosition, selectPosition} from '../redux/positionSlice';
import {useGetWeatherMutation} from '../redux/weatherApi';
import HomeAreaView from './HomeAreaView';
import CityName from './CityName';
import Weather from './Weather';
import {selectLocale, setLocale} from '../redux/systemLocale';

function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const {position} = useAppSelector(selectPosition);
  const {locale} = useAppSelector(selectLocale);
  const [getWeather] = useGetWeatherMutation();

  useEffect(() => {
    dispatch(getCurrentPosition());
    dispatch(setLocale());
  }, []);

  useEffect(() => {
    if (position && locale) {
      getWeather({position, lang: locale});
    }
  }, [position, locale]);

  return (
    <HomeAreaView>
      <View>
        <CityName />
        <Weather />
      </View>
    </HomeAreaView>
  );
}

export default Home;
