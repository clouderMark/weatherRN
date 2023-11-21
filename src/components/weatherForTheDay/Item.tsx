import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {selectMode} from '../../redux/colorSchemeSlice';
import {getTextColorForMode} from '../getTextColorForMode';

interface IProps {
  head: string;
  image: ImageSourcePropType;
  footer: string;
}

const Item = (props: IProps) => {
  const {head, image, footer} = props;
  const isDarkMode = useAppSelector(selectMode);
  const textColor = getTextColorForMode(isDarkMode);

  return (
    <View style={styles.item}>
      <Text style={textColor}>{head}</Text>
      <Image style={styles.image} source={image} />
      <Text style={textColor}>{footer}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
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

export default Item;
