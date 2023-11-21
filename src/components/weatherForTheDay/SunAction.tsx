import {ImageSourcePropType} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {selectLocale} from '../../redux/systemLocale';
import {sunrice as sunriceImage, sunset as sunsetImage} from '../../image';
import {ELang} from '../../types/types';
import Item from './Item';

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
  const {locale} = useAppSelector(selectLocale);

  const isNow: boolean = data.action(when);

  return isNow ? (
    <Item
      head={`${Math.trunc(when / 60)}:${when % 60}`}
      image={data.image}
      footer={locale === ELang.RU ? data.ru : data.foreign}
    />
  ) : null;
};

// prettier-ignore
export const isSunrice = (itemTime: number) => (when: number): boolean => itemTime > when && when + 180 > itemTime;
// prettier-ignore
export const isSunset = (itemTime: number) => (when: number): boolean => itemTime < when && itemTime + 180 > when;

export const sunriceMessage: IObjData = {ru: 'Восход', foreign: 'Sunrice', image: sunriceImage, action: isSunrice};
export const sunsetMessage: IObjData = {ru: 'Закат', foreign: 'Sunset', image: sunsetImage, action: isSunset};

export default SunAction;
