import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getCurrentPosition, selectPosition} from '../redux/positionSlice';
import {useGetWeatherMutation} from '../redux/weatherApi';
import {useGetGeoMutation} from '../redux/geoApi';
import HomeAreaView from './HomeAreaView';

function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const {position} = useAppSelector(selectPosition);
  const [getWeather] = useGetWeatherMutation();
  const [getGeo, {data: geoData, isSuccess: isGeoSuccess}] = useGetGeoMutation();

  useEffect(() => {
    dispatch(getCurrentPosition());
  }, []);

  useEffect(() => {
    if (position) {
      getWeather(position);
      getGeo(position);
    }
  }, [position]);

  useEffect(() => {
    if (isGeoSuccess && geoData) {
      const cityName =
        geoData.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address
          .Components.at(-1)?.name;

      console.log(cityName);
    } else console.log('geoData is empty');
  }, [isGeoSuccess]);

  return (
    <HomeAreaView>
      <View>
        <Text>
          latitude:{position.latitude.toString()} longitude: {position.longitude.toString()}
        </Text>
      </View>
    </HomeAreaView>
  );
}

export default Home;
