import {StyleSheet, Text} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {selectMode} from '../redux/colorSchemeSlice';
import {selectWetherData} from '../redux/weatherApi';
import {getTextColorForMode} from './getTextColorForMode';

const CityName = () => {
  const isDarkMode = useAppSelector(selectMode);
  const {name} = useAppSelector(selectWetherData).city;
  const textColor = getTextColorForMode(isDarkMode);

  return <Text style={[textColor, styles.text]}>{name || 'Город не опреден'}</Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 43,
  },
});

export default CityName;
