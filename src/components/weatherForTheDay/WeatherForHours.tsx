import {Image, Text, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {selectWetherData} from '../../redux/weatherApi';
import {getTextColorForMode} from '../getTextColorForMode';
import {selectMode} from '../../redux/colorSchemeSlice';
import {selectLocale} from '../../redux/systemLocale';
import {getImage} from './getImage';
import {getTime} from '../getTime';
import SunriceItem from './SunriceItem';
import SunsetItem from './SunsetItem';
import {styles} from './styles';
import {ELang} from '../../types/types';

interface IProps {
  dt: number;
  isFirst: boolean;
}

const WeatherForHours = (props: IProps) => {
  const {dt, isFirst} = props;
  const {locale} = useAppSelector(selectLocale);
  const {list} = useAppSelector(selectWetherData);
  const isDarkMode = useAppSelector(selectMode);
  const {timezone} = useAppSelector(selectWetherData).city;

  const item = list.find((el) => el.dt === dt);

  if (item) {
    const textColor = getTextColorForMode(isDarkMode);
    const itemTime = getTime({time: item.dt, timezone});
    const itemTimeInMinutes = itemTime.getUTCHours() * 60 + itemTime.getMinutes();

    return (
      <>
        <SunriceItem itemTime={itemTimeInMinutes} />
        <View style={styles.item}>
          <Text style={textColor}>{isFirst ? (locale === ELang.RU ? 'Сейчас' : 'now') : itemTime.getUTCHours()}</Text>
          <Image style={styles.image} source={getImage(item.weather[0].description, locale, true)} />
          <Text style={textColor}>{item.main.temp.toFixed()}</Text>
        </View>
        <SunsetItem itemTime={itemTimeInMinutes} />
      </>
    );
  }
};

export default WeatherForHours;
