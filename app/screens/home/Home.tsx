/* eslint-disable no-console */
import { IError, IWeather } from '../../types/data.types';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppState } from '../../redux/store';
import Details from './components/details/Details';
import ErrorScreen from '../ErrorScreen';
import Footer from './components/Footer';
import Header from './components/Header';
import Icon from './components/Icon';
import Overview from './components/Overview';
import colours from '../../assets/colours.json';
import { useAppSelector } from '../../redux/hooks';

const Home: React.FC = (): JSX.Element => {
  // Data from store
  const appError: IError = useAppSelector((state: AppState): IError => {
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
    return <ErrorScreen errorInfo={appError} />;
  };

  useEffect((): void => {
    console.log(
      'appLoading',
      appLoading,
      'appError',
      appError,
      'appData',
      appData.sunset
    );
  }, [appData]);

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
  return appError.errorState ? errorScreen() : renderHome();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.spotBlue,
    flex: 1
  }
});

export default Home;
