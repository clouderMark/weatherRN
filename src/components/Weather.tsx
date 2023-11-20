import {StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {selectWetherData} from '../redux/weatherApi';
import {selectLocale} from '../redux/systemLocale';
import {selectMode} from '../redux/colorSchemeSlice';
import {getTextColorForMode} from './getTextColorForMode';

const Weather = () => {
  const {degree, locale} = useAppSelector(selectLocale);
  const isDarkMode = useAppSelector(selectMode);
  const {description, temp, maxTemp, minTemp} = useAppSelector(selectWetherData);
  const textColor = getTextColorForMode(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={textColor}>{description}</Text>
      <Text style={[styles.temp, textColor]}>
        {temp}
        {degree}
      </Text>
      <Text style={textColor}>
        {locale === 'ru' ? 'Макс' : 'Max'}. {maxTemp}
        {degree}, {locale === 'ru' ? 'мин' : 'min'}. {minTemp}
        {degree}
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
