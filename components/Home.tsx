import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useGetWeatherMutation} from '../redux/weatherApi';
import useLocation from './useLocation';
import {useGetGeoMutation} from '../redux/geoApi';

function Home(): JSX.Element {
  const location = useLocation();
  const isDarkMode = useColorScheme() === 'dark';

  const [getWeather, {data: weatherData, isSuccess: isWeatherSuccess}] = useGetWeatherMutation();
  const [getGeo, {data: geoData, isSuccess: isGeoSuccess}] = useGetGeoMutation();

  useEffect(() => {
    if (location) {
      getWeather(location);
      getGeo(location);
    }
  }, [location]);

  useEffect(() => {
    if (isWeatherSuccess) {
      console.log(weatherData);
    } else console.log('asdf');
  }, [isWeatherSuccess]);

  useEffect(() => {
    if (isGeoSuccess && geoData) {
      const cityName =
        geoData.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address
          .Components[3].name;

      console.log(cityName);
    } else console.log('asdf');
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
            latitude:{location?.latitude.toString()} longitude: {location?.longitude.toString()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
