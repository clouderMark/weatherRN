import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppSelector} from '../redux/hooks';
import {selectPosition} from '../redux/positionSlice';
import {useGetWeatherMutation} from '../redux/weatherApi';
import {selectLocale} from '../redux/systemLocale';
import {selectMode} from '../redux/colorSchemeSlice';

interface IInitialState {
  weather: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
  degree: '°' | '℉';
}

const initialState: IInitialState = {
  weather: '',
  temp: 0,
  minTemp: 0,
  maxTemp: 0,
  degree: '°',
};

interface IDefaultValue {min: number, max: number}
const defaultValue = {min: 0, max: 0};

const Weather = () => {
  const {position} = useAppSelector(selectPosition);
  const {locale} = useAppSelector(selectLocale);
  const isDarkMode = useAppSelector(selectMode);
  const [getWeather, {data: weatherData, isSuccess: isWeatherSuccess}] = useGetWeatherMutation();
  const [weather, setWeather] = useState(initialState);

  useEffect(() => {
    if (position && locale) {
      getWeather({position, lang: locale});
    }
  }, [position, locale]);

  useEffect(() => {
    if (isWeatherSuccess && weatherData) {
      const dataWeather = weatherData.list[0].weather[0].description;
      const minMaxTemp: IDefaultValue = weatherData.list.reduce((values: IDefaultValue, el) => {
        const min = el.main.temp_min;
        const max = el.main.temp_max;

        if (values.min === 0) {
          values.min = min;
        } else if (values.min > min) {
          values.min = min;
        } else if (values.max < max) {
          values.max = max;
        }

        return values;
      }, defaultValue);

      setWeather({
        weather: dataWeather[0].toUpperCase() + dataWeather.slice(1),
        temp: Math.round(weatherData.list[0].main.temp),
        minTemp: Math.round(minMaxTemp.min),
        maxTemp: Math.round(minMaxTemp.max),
        degree: locale === 'ru' ? '°' : '℉',
      });
    } else console.log('weatherData is empty');
  }, [isWeatherSuccess]);

  const textColor = {
    color: isDarkMode ? Colors.lighter : Colors.dark,
  };

  return (
    <View style={styles.container}>
      <Text style={textColor}>{weather.weather}</Text>
      <Text style={[styles.temp, textColor]}>
        {weather.temp}
        {weather.degree}
      </Text>
      <Text style={textColor}>
        {locale === 'ru' ? 'Макс' : 'Max'}. {weather.maxTemp}
        {weather.degree}, {locale === 'ru' ? 'мин' : 'min'}. {weather.minTemp}
        {weather.degree}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120,
    marginTop: 10,
  },
  temp: {
    fontSize: 60,
  },
});

export default Weather;
