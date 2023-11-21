import {Image, Text, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {selectWetherData} from '../../redux/weatherApi';
import {getTextColorForMode} from '../getTextColorForMode';
import {selectMode, selectSunAction} from '../../redux/colorSchemeSlice';
import {selectLocale} from '../../redux/systemLocale';
import {getImage} from './getImage';
import {getTime} from '../getTime';
import {styles} from './styles';
import {ELang} from '../../types/types';
import SunAction, {sunriceMessage, sunsetMessage} from './SunAction';

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

  const {sunrice, sunset} = useAppSelector(selectSunAction);

  if (item) {
    const textColor = getTextColorForMode(isDarkMode);
    const itemTime = getTime({time: item.dt, timezone});
    const itemTimeInMinutes = itemTime.getUTCHours() * 60 + itemTime.getMinutes();

    const sunriceHours = sunrice.getUTCHours();
    const sunriceMinutes = sunrice.getMinutes();
    const sunsetHours = sunset.getUTCHours();
    const sunsetMinutes = sunset.getMinutes();
    const sunriceInMinutes = sunriceHours * 60 + sunriceMinutes;
    const sunsetInMinutes = sunsetHours * 60 + sunsetMinutes;
    const isDay = itemTimeInMinutes > sunriceInMinutes && itemTimeInMinutes < sunsetInMinutes;

    return (
      <>
        <SunAction
          when={sunriceInMinutes}
          data={{...sunriceMessage, action: sunriceMessage.action(itemTimeInMinutes)}}
        />
        <View style={styles.item}>
          <Text style={textColor}>{isFirst ? (locale === ELang.RU ? 'Сейчас' : 'now') : itemTime.getUTCHours()}</Text>
          <Image style={styles.image} source={getImage(item.weather[0].description, locale, isDay)} />
          <Text style={textColor}>{item.main.temp.toFixed()}</Text>
        </View>
        <SunAction
          when={sunsetInMinutes}
          data={{...sunsetMessage, action: sunsetMessage.action(itemTimeInMinutes)}}
        />
      </>
    );
  }
};

export default WeatherForHours;
