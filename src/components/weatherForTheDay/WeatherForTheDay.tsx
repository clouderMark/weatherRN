import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import {selectWetherData} from '../../redux/weatherApi';
import {useAppSelector} from '../../redux/hooks';
import {selectLocale} from '../../redux/systemLocale';
import {selectMode} from '../../redux/colorSchemeSlice';
import {getImage} from './getImage';
import {getTextColorForMode} from '../getTextColorForMode';

const WeatherForTheDay = () => {
  const {list} = useAppSelector(selectWetherData);
  const {locale} = useAppSelector(selectLocale);
  const isDarkMode = useAppSelector(selectMode);
  const textColor = getTextColorForMode(isDarkMode);

  return (
    <View style={styles.container}>
      {list.length ? (
        <FlatList
          nestedScrollEnabled
          data={list}
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
