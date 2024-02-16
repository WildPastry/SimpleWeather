/* eslint-disable no-console */
import { IError, IWeather } from '../../types/data.types';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppState } from '../../redux/store';
import Details from './components/Details';
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

  // Local data states
  const [night, setNight] = useState(false);

  // Error screen
  const errorScreen = (): JSX.Element => {
    return <ErrorScreen errorInfo={appError} />;
  };

  useEffect((): void => {
    setNight(false);
    console.log(
      'appLoading',
      appLoading,
      'appError',
      appError,
      'appData',
      appData.hourly
    );
  }, [appData]);

  // Render home page
  const renderHome = () => {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView keyboardShouldPersistTaps='handled' horizontal={false}>
          <Icon id={appData.id} night={night} />
          <Overview
            desc={appData.desc}
            low={appData.low}
            high={appData.high}
            temp={appData.temp}
          />
          <Details
            desc={appData.desc}
            feelsLike={appData.feelsLike}
            high={appData.high}
            hourly={appData.hourly}
            humidity={appData.humidity}
            night={night}
            wind={appData.wind}
          />
          <Footer />
        </ScrollView>
      </View>
    );
  };
  // Check for error state
  return appError.errorState ? errorScreen() : renderHome();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.thunderStorm,
    flex: 1
  }
});

export default Home;
