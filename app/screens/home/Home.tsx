/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppState } from '../../redux/store';
import Details from './components/details/Details';
import ErrorScreen from '../ErrorScreen';
import Footer from './components/Footer';
import Header from './components/Header';
import { IWeather } from '../../types/data.types';
import Icon from './components/Icon';
import Overview from './components/Overview';
import { useAppSelector } from '../../redux/hooks';

const Home: React.FC = (): JSX.Element => {
  // Data from store
  const appError: boolean = useAppSelector((state: AppState): boolean => {
    return state.data.error;
  });

  const appLoading: boolean = useAppSelector((state: AppState): boolean => {
    return state.data.loading;
  });

  const appData: IWeather = useAppSelector((state: AppState): IWeather => {
    return state.data.weather;
  });

  // Error screen
  const errorScreen = (): JSX.Element => {
    return <ErrorScreen />;
  };

  useEffect((): void => {
    console.log(
      'appLoading',
      appLoading,
      'appError',
      appError,
      'appData',
      appData
    );
  }, []);

  // Render home page
  const renderHome = () => {
    return (
      <View style={styles.container}>
        <Header />
        <Icon />
        <Overview />
        <Details />
        <Footer />
      </View>
    );
  };
  // Check for error state
  return appError ? errorScreen() : renderHome();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2485c7',
    flex: 1
  },
  text: {
    color: 'white'
  }
});

export default Home;
