import {useAppSelector} from '../../redux/hooks';
import {selectWetherData} from '../../redux/weatherApi';
import {selectSunAction} from '../../redux/colorSchemeSlice';
import {selectLocale} from '../../redux/systemLocale';
import {getImage} from './getImage';
import {getTime} from '../getTime';
import {ELang} from '../../types/types';
import SunAction, {sunriceMessage, sunsetMessage} from './SunAction';
import Item from './Item';

interface IProps {
  dt: number;
  isFirst: boolean;
}

const WeatherForHours = (props: IProps) => {
  const {dt, isFirst} = props;
  const {locale} = useAppSelector(selectLocale);
  const {list} = useAppSelector(selectWetherData);
  const {timezone} = useAppSelector(selectWetherData).city;

  const item = list.find((el) => el.dt === dt);

  const {sunrice, sunset} = useAppSelector(selectSunAction);

  if (item) {
    const itemTime = getTime(item.dt, timezone);
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
        <Item
          head={isFirst ? (locale === ELang.RU ? 'Сейчас' : 'now') : `${itemTime.getUTCHours()}`}
          image={getImage(item.weather[0].description, locale, isDay)}
          footer={item.main.temp.toFixed()}
        />
        <SunAction when={sunsetInMinutes} data={{...sunsetMessage, action: sunsetMessage.action(itemTimeInMinutes)}} />
      </>
    );
  }
};

export default WeatherForHours;
