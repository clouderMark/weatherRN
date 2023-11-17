import {ImageSourcePropType} from 'react-native';
import {
  sunny,
  partlyCloudy,
  slightlyCloudy,
  variablyCloudy,
  brightNight,
  partyBrightNight,
  cloudy,
  overcast,
  littleRain,
  rain,
  heavyRain,
} from '../../image';

export const getImage = (type: string, lang: string, date: Date): ImageSourcePropType => {
  const dt = new Date(date);
  const isDay = dt;
  let imageAddress: ImageSourcePropType = sunny;

  if (lang === 'ru' && isDay) {
    switch (type) {
      case 'ясно': //
        imageAddress = sunny;
        break;
      case 'переменная облачность': //
        imageAddress = partlyCloudy;
        break;
      case 'небольшая облачность': //
        imageAddress = slightlyCloudy;
        break;
      case 'облачно с прояснениями': //
        imageAddress = variablyCloudy;
        break;
      case 'облачно':
        imageAddress = cloudy;
        break;
      case 'пасмурно':
        imageAddress = overcast;
        break;
      case 'небольшой дождь':
        imageAddress = littleRain;
        break;
      case 'дождь':
        imageAddress = rain;
        break;
      case 'сильный дождь':
        imageAddress = heavyRain;
        break;

      default:
        imageAddress = sunny;
    }
  } else if (lang === 'ru' && !isDay) {
    switch (type) {
      case 'ясно': //
        imageAddress = brightNight;
        break;
      case 'переменная облачность': //
        imageAddress = partyBrightNight;
        break;
      case 'небольшая облачность': //
        imageAddress = partyBrightNight;
        break;
      case 'облачно с прояснениями': //
        imageAddress = partyBrightNight;
        break;
      case 'облачно':
        imageAddress = cloudy;
        break;
      case 'пасмурно':
        imageAddress = overcast;
        break;
      case 'небольшой дождь':
        imageAddress = littleRain;
        break;
      case 'дождь':
        imageAddress = rain;
        break;
      case 'сильный дождь':
        imageAddress = heavyRain;
        break;

      default:
        imageAddress = sunny;
    }
  } else if (isDay) {
    switch (type) {
      case 'broken clouds': //
        imageAddress = partlyCloudy;
        break;
      case 'clear sky': //
        imageAddress = sunny;
        break;
      case 'few clouds': //
        imageAddress = slightlyCloudy;
        break;
      case 'scattered clouds': //
        imageAddress = variablyCloudy;
        break;
      case 'cloudy':
        imageAddress = cloudy;
        break;
      case 'overcast clouds':
        imageAddress = overcast;
        break;
      case 'light rain':
        imageAddress = littleRain;
        break;
      case 'moderate rain':
        imageAddress = rain;
        break;
      case 'hard rain':
        imageAddress = heavyRain;
        break;

      default:
        imageAddress = sunny;
    }
  } else {
    imageAddress = sunny;
  }

  return imageAddress;
};
