import {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppSelector} from '../redux/hooks';
import {selectPosition} from '../redux/positionSlice';
import {selectMode} from '../redux/colorSchemeSlice';
import {useGetWeatherMutation} from '../redux/weatherApi';
import {selectLocale} from '../redux/systemLocale';

const CityName = () => {
  const {position} = useAppSelector(selectPosition);
  const {locale} = useAppSelector(selectLocale);
  const [getWeather, {data: weatherData, isSuccess: isWeatherSuccess}] = useGetWeatherMutation();
  const [city, setCity] = useState('Город не опреден');
  const isDarkMode = useAppSelector(selectMode);

  useEffect(() => {
    if (position) {
      getWeather({position, lang: locale});
    }
  }, [position]);

  useEffect(() => {
    if (isWeatherSuccess && weatherData) {
      const cityName = weatherData.city.name;

      if (cityName) setCity(cityName);
    } else console.log('geoData is empty');
  }, [isWeatherSuccess]);

  const textColor = {
    color: isDarkMode ? Colors.lighter : Colors.dark,
  };

  return <Text style={[textColor, styles.text]}>{city}</Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 43,
  },
});

export default CityName;
