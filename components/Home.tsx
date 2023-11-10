import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useGetWeatherMutation} from '../redux/weatherApi';
import useLocation from './useLocation';

function Home(): JSX.Element {
  const location = useLocation();
  const isDarkMode = useColorScheme() === 'dark';
  const [getWeather, {data, isSuccess}] = useGetWeatherMutation();

  useEffect(() => {
    if (location) {
      getWeather(location);
    }
  }, [location]);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess]);

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
