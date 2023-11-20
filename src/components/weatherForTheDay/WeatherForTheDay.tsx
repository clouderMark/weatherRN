import {StyleSheet, View, FlatList} from 'react-native';
import {selectWetherData} from '../../redux/weatherApi';
import {useAppSelector} from '../../redux/hooks';
import WeatherForHours from './WeatherForHours';

const WeatherForTheDay = () => {
  const {list} = useAppSelector(selectWetherData);

  return (
    <View style={styles.container}>
      {list.length ? (
        <FlatList
          nestedScrollEnabled
          data={list}
          horizontal
          renderItem={({item, index}) => (
            <WeatherForHours dt={item.dt} isFirst={!index}/>
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    marginTop: 40,
    borderColor: 'white',
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
});

export default WeatherForTheDay;
