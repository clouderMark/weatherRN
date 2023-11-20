import {StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppSelector} from '../redux/hooks';
import {selectMode} from '../redux/colorSchemeSlice';
import {selectWetherData} from '../redux/weatherApi';

const CityName = () => {
  const isDarkMode = useAppSelector(selectMode);
  const {name} = useAppSelector(selectWetherData).city;

  const textColor = {
    color: isDarkMode ? Colors.lighter : Colors.dark,
  };

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
