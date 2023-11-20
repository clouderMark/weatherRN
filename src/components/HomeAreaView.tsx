import {type PropsWithChildren} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppSelector} from '../redux/hooks';
import {selectMode} from '../redux/colorSchemeSlice';

const HomeAreaView = ({children}: PropsWithChildren): JSX.Element => {
  const isDarkMode = useAppSelector(selectMode);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={[backgroundStyle, styles.container]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default HomeAreaView;
