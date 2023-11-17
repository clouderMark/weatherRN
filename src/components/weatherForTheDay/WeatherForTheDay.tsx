import {useEffect} from 'react';
import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useGetWeatherMutation} from '../../redux/weatherApi';
import {useAppSelector} from '../../redux/hooks';
import {selectPosition} from '../../redux/positionSlice';
import {selectLocale} from '../../redux/systemLocale';
import {selectMode} from '../../redux/colorSchemeSlice';
import {getImage} from './getImage';

const WeatherForTheDay = () => {
  const [get, {data, isSuccess}] = useGetWeatherMutation();
  const {position} = useAppSelector(selectPosition);
  const {locale} = useAppSelector(selectLocale);
  const isDarkMode = useAppSelector(selectMode);

  useEffect(() => {
    if (position && locale) {
      get({position, lang: locale});
    }
  }, [position, locale]);

  const textColor = {
    color: isDarkMode ? Colors.lighter : Colors.dark,
  };

  return (
    <View style={styles.container}>
      {isSuccess ? (
        <FlatList
          nestedScrollEnabled
          data={data!.list}
          horizontal
          renderItem={({item, index}) => (
            <View style={styles.item}>
              <Text style={textColor}>
                {index === 0 ? (locale === 'ru' ? 'Сейчас' : 'now') : new Date(item.dt_txt).getHours()}
              </Text>
              <Image style={styles.image} source={getImage(item.weather[0].description, locale, item.dt_txt)} />
              <Text style={textColor}>{item.main.temp.toFixed()}</Text>
            </View>
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
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 60,
  },
  image: {
    // flexGrow: 1,
    width: 42,
    height: 32,
  },
});

export default WeatherForTheDay;
