import {Image, Text, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {selectMode} from '../../redux/colorSchemeSlice';
import {selectLocale} from '../../redux/systemLocale';
import {styles} from './styles';
import {sunset as image} from '../../image';
import {getTextColorForMode} from '../getTextColorForMode';
import {ELang} from '../../types/types';

interface IProps {
  itemTime: number;
  when: number;
}

const SunsetItem = (props: IProps) => {
  const {itemTime, when} = props;
  const isDarkMode = useAppSelector(selectMode);
  const textColor = getTextColorForMode(isDarkMode);
  const {locale} = useAppSelector(selectLocale);

  const isNow = itemTime < when && itemTime + 180 > when;

  return isNow ? (
    <View style={styles.item}>
      <Text style={textColor}>{`${Math.trunc(when / 60)}:${when % 60}`}</Text>
      <Image style={styles.image} source={image} />
      <Text style={textColor}>{locale === ELang.RU ? 'Закат' : 'Sunset'}</Text>
    </View>
  ) : null;
};

export default SunsetItem;
