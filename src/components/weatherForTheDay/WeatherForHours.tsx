import {Image, StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {selectWetherData} from '../../redux/weatherApi';
import {getTextColorForMode} from '../getTextColorForMode';
import {selectMode} from '../../redux/colorSchemeSlice';
import {selectLocale} from '../../redux/systemLocale';
import {getImage} from './getImage';

interface IProps {
  dt: number;
  isFirst: boolean;
}

const WeatherForHours = (props: IProps) => {
  const {dt, isFirst} = props;
  const {locale} = useAppSelector(selectLocale);
  const {list} = useAppSelector(selectWetherData);
  const isDarkMode = useAppSelector(selectMode);

  const item = list.find((el) => el.dt === dt);
  const textColor = getTextColorForMode(isDarkMode);

  return item ? (
    <View style={styles.item}>
      <Text style={textColor}>{isFirst ? (locale === 'ru' ? 'Сейчас' : 'now') : new Date(item.dt_txt).getHours()}</Text>
      <Image style={styles.image} source={getImage(item.weather[0].description, locale, item.dt_txt)} />
      <Text style={textColor}>{item.main.temp.toFixed()}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 60,
  },
  image: {
    width: 42,
    height: 32,
  },
});

export default WeatherForHours;
