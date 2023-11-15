import {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useGetGeoMutation} from '../redux/geoApi';
import {useAppSelector} from '../redux/hooks';
import {selectPosition} from '../redux/positionSlice';
import {selectMode} from '../redux/colorSchemeSlice';

const CityName = () => {
  const {position} = useAppSelector(selectPosition);
  const [getGeo, {data: geoData, isSuccess: isGeoSuccess}] = useGetGeoMutation();
  const [city, setCity] = useState('Город не опреден');
  const isDarkMode = useAppSelector(selectMode);

  useEffect(() => {
    if (position) {
      getGeo(position);
    }
  }, [position]);

  useEffect(() => {
    if (isGeoSuccess && geoData) {
      const cityName = // eslint-disable-next-line
        geoData.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.at(
          -1,
        )?.name;

      if (cityName) setCity(cityName.replace('город', ''));
    } else console.log('geoData is empty');
  }, [isGeoSuccess]);

  const textColor = {
    color: isDarkMode ? Colors.lighter : Colors.dark,
  };

  return <Text style={[textColor, styles.text]}>{city}</Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 43,
  },
});

export default CityName;
