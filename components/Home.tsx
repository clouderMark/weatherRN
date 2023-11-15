import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getCurrentPosition, selectPosition} from '../redux/positionSlice';
import {useGetWeatherMutation} from '../redux/weatherApi';
import {useGetGeoMutation} from '../redux/geoApi';
import HomeAreaView from './HomeAreaView';
import CityName from './CityName';

function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const {position} = useAppSelector(selectPosition);
  const [getWeather] = useGetWeatherMutation();
  const [getGeo] = useGetGeoMutation();

  useEffect(() => {
    dispatch(getCurrentPosition());
  }, []);

  useEffect(() => {
    if (position) {
      getWeather(position);
      getGeo(position);
    }
  }, [position]);

  return (
    <HomeAreaView>
      <View>
        <CityName />
      </View>
    </HomeAreaView>
  );
}

export default Home;
