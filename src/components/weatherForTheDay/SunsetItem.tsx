import {Image, Text, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {selectMode, selectSunAction} from '../../redux/colorSchemeSlice';
import {selectLocale} from '../../redux/systemLocale';
import {styles} from './styles';
import {sunset as image} from '../../image';
import {getTextColorForMode} from '../getTextColorForMode';

interface IProps {
  itemTime: number;
}

const SunsetItem = (props: IProps) => {
  const {itemTime} = props;
  const {sunset} = useAppSelector(selectSunAction);
  const sunsetHours = sunset.getUTCHours();
  const sunsetMinutes = sunset.getMinutes();
  const sunsetInMinutes = sunsetHours * 60 + sunsetMinutes;
  const isDarkMode = useAppSelector(selectMode);
  const textColor = getTextColorForMode(isDarkMode);
  const {locale} = useAppSelector(selectLocale);

  const isNow = itemTime < sunsetInMinutes && itemTime + 180 > sunsetInMinutes;

  return isNow ? (
    <View style={styles.item}>
      <Text style={textColor}>{`${sunsetHours}:${sunsetMinutes}`}</Text>
      <Image style={styles.image} source={image} />
      <Text style={textColor}>{locale === 'ru' ? 'Закат' : 'Sunset'}</Text>
    </View>
  ) : null;
};

export default SunsetItem;
