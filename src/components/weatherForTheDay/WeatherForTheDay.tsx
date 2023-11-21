import {StyleSheet, View, FlatList} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {selectWetherData} from '../../redux/weatherApi';
import {useAppSelector} from '../../redux/hooks';
import WeatherForHours from './WeatherForHours';
import {selectMode} from '../../redux/colorSchemeSlice';

const WeatherForTheDay = () => {
  const {list} = useAppSelector(selectWetherData);
  const isDarkMode = useAppSelector(selectMode);

  const border = {
    borderColor: isDarkMode ? Colors.lighter : Colors.dark,
  };

  return (
    <View style={[styles.container, border]}>
      {list.length ? (
        <FlatList
          nestedScrollEnabled
          data={list}
          horizontal
          renderItem={({item, index}) => <WeatherForHours dt={item.dt} isFirst={!index} />}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    marginTop: 40,
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
});

export default WeatherForTheDay;
