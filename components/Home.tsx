import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getCurrentPosition, selectPosition} from '../redux/positionSlice';
import {useGetWeatherMutation} from '../redux/weatherApi';
import {useGetGeoMutation} from '../redux/geoApi';

function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const {position} = useAppSelector(selectPosition);
  const [getWeather, {data: weatherData, isSuccess: isWeatherSuccess}] = useGetWeatherMutation();
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
    if (isWeatherSuccess && weatherData) {
      console.log(weatherData);
    } else console.log('weatherData is empty');
  }, [isWeatherSuccess]);

  useEffect(() => {
    if (isGeoSuccess && geoData) {
      const cityName =
        geoData.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address
          .Components.at(-1)?.name;

      console.log(cityName);
    } else console.log('geoData is empty');
  }, [isGeoSuccess]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View>
          <Text>
            latitude:{position.latitude.toString()} longitude: {position.longitude.toString()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
