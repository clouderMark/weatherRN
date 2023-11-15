import {useEffect, type PropsWithChildren, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppSelector} from '../redux/hooks';
import {selectPosition} from '../redux/positionSlice';
import {useGetWeatherMutation} from '../redux/weatherApi';

interface ITime {
  time: number;
  timezone: number;
}

const getTime = (data: ITime): Date => new Date((data.time + data.timezone) * 1000);

const HomeAreaView = ({children}: PropsWithChildren): JSX.Element => {
  const {position} = useAppSelector(selectPosition);
  const [getWeather, {data: weatherData, isSuccess: isWeatherSuccess}] = useGetWeatherMutation();
  const [isSunset, setIsSunset] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (position) {
      getWeather(position);
    }
  }, [position]);

  useEffect(() => {
    if (isWeatherSuccess && weatherData) {
      const sunrice = getTime({time: weatherData.sys.sunrise, timezone: weatherData.timezone});
      const sunset = getTime({time: weatherData.sys.sunset, timezone: weatherData.timezone});
      const today = new Date(Date.now() + (weatherData.timezone * 1000));

      if (sunrice > today || today > sunset || isDarkMode) {
        setIsSunset(true);
        console.log('dark');
      } else {
        setIsSunset(false);
        console.log('light');
      }
    } else console.log('weatherData is empty');
  }, [isWeatherSuccess]);

  const backgroundStyle = {
    backgroundColor: isSunset ? Colors.dark : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isSunset || isDarkMode ? 'light-content' : 'dark-content'}
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
