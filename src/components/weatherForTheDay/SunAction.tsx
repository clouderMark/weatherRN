import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {selectMode} from '../../redux/colorSchemeSlice';
import {selectLocale} from '../../redux/systemLocale';
import {styles} from './styles';
import {sunrice as sunriceImage, sunset as sunsetImage} from '../../image';
import {getTextColorForMode} from '../getTextColorForMode';
import {ELang} from '../../types/types';

interface IData {
  ru: string;
  foreign: string;
  image: ImageSourcePropType;
}

interface IPropsData extends IData {
  action(when: number): boolean;
}

interface IObjData extends IData {
  action(itemTime: number): (when: number) => boolean;
}

interface IProps {
  when: number;
  data: IPropsData;
}

const SunAction = (props: IProps) => {
  const {when, data} = props;
  const isDarkMode = useAppSelector(selectMode);
  const textColor = getTextColorForMode(isDarkMode);
  const {locale} = useAppSelector(selectLocale);

  const isNow: boolean = data.action(when);

  return isNow ? (
    <View style={styles.item}>
      <Text style={textColor}>{`${Math.trunc(when / 60)}:${when % 60}`}</Text>
      <Image style={styles.image} source={data.image} />
      <Text style={textColor}>{locale === ELang.RU ? data.ru : data.foreign}</Text>
    </View>
  ) : null;
};

export const isSunrice = (itemTime: number) => (when: number): boolean => itemTime > when && when + 180 > itemTime;
export const isSunset = (itemTime: number) => (when: number): boolean => itemTime < when && itemTime + 180 > when;

export const sunriceMessage: IObjData = {ru: 'Восход', foreign: 'Sunrice', image: sunriceImage, action: isSunrice};
export const sunsetMessage: IObjData = {ru: 'Закат', foreign: 'Sunset', image: sunsetImage, action: isSunset};

export default SunAction;
