import {Image, Text, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {selectMode, selectSunAction} from '../../redux/colorSchemeSlice';
import {selectLocale} from '../../redux/systemLocale';
import {styles} from './styles';
import {sunrice as image} from '../../image';
import {getTextColorForMode} from '../getTextColorForMode';

interface IProps {
  itemTime: number;
}

const SunriceItem = (props: IProps) => {
  const {itemTime} = props;
  const {sunrice} = useAppSelector(selectSunAction);
  const sunriceHours = sunrice.getUTCHours();
  const sunriceMinutes = sunrice.getMinutes();
  const sunriceInMinutes = sunriceHours * 60 + sunriceMinutes;
  const isDarkMode = useAppSelector(selectMode);
  const textColor = getTextColorForMode(isDarkMode);
  const {locale} = useAppSelector(selectLocale);

  const isNow = itemTime > sunriceInMinutes && sunriceInMinutes + 180 > itemTime;

  return isNow ? (
    <View style={styles.item}>
      <Text style={textColor}>{`${sunriceHours}:${sunriceMinutes}`}</Text>
      <Image style={styles.image} source={image} />
      <Text style={textColor}>{locale === 'ru' ? 'Восход' : 'Sunrice'}</Text>
    </View>
  ) : null;
};

export default SunriceItem;
