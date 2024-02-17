/* eslint-disable */
/* eslint-disable max-statements */
import { IError, IWeather, IWeatherBg } from '../../types/data.types';
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

  // const appLoading: boolean = useAppSelector((state: AppState): boolean => {
  //   return state.data.loading;
  // });

  const appData: IWeather = useAppSelector((state: AppState): IWeather => {
    return state.data.weather;
  });

  // Local data states
  const [night, setNight] = useState(false);
  const [weatherBg, setWeatherBg] = useState<IWeatherBg>({
    weatherBg: '',
    weatherBgDark: '',
    weatherBgDarkest: ''
  });

  // Error screen
  const errorScreen = (): JSX.Element => {
    return <ErrorScreen errorInfo={appError} />;
  };

  // Logic for setting colours
  const setColours = (): void => {
    // Night icon conditions
    const conditions: string[] = [
      '01n',
      '02n',
      '03n',
      '04n',
      '09n',
      '10n',
      '11n',
      '13n',
      '50n'
    ];
    // Loop conditions
    const checkNight: boolean = conditions.some((e) =>
      appData.icon.includes(e)
    );
    // Apply function based on result
    checkNight ? (setNight(true), setBgNight()) : (setNight(false), setBgDay());
  };

  // Night colour bg logic
  const setBgNight = (): void => {
    setWeatherBg({
      weatherBg: colours.night,
      weatherBgDark: colours.nightDark,
      weatherBgDarkest: colours.nightDarkest
    });
  };

  // Day colour bg logic
  const setBgDay = (): void => {
    let currentBg: string = '';
    let currentBgDark: string = '';
    let currentBgDarkest: string = '';

    const currentID: number = appData.id;

    // Group 2xx: thunderstorm
    if (currentID >= 200 && currentID <= 232) {
      currentBg = colours.thunderStorm;
      currentBgDark = colours.thunderStormDark;
      currentBgDarkest = colours.thunderStormDarkest;
      // Group 3xx: drizzle
    } else if (currentID >= 300 && currentID <= 331) {
      currentBg = colours.drizzle;
      currentBgDark = colours.drizzleDark;
      currentBgDarkest = colours.drizzleDarkest;
      // Group 5xx: rain
    } else if (currentID >= 500 && currentID <= 531) {
      currentBg = colours.rain;
      currentBgDark = colours.rainDark;
      currentBgDarkest = colours.rainDarkest;
      // Group 6xx: snow
    } else if (currentID >= 600 && currentID <= 622) {
      currentBg = colours.snow;
      currentBgDark = colours.snowDark;
      currentBgDarkest = colours.snowDarkest;
      // Group 7xx: atmosphere
    } else if (currentID >= 701 && currentID <= 781) {
      currentBg = colours.atmosphere;
      currentBgDark = colours.atmosphereDark;
      currentBgDarkest = colours.atmosphereDarkest;
      // Group 800: clear
    } else if (currentID === 800) {
      currentBg = colours.clearSky;
      currentBgDark = colours.clearSkyDark;
      currentBgDarkest = colours.clearSkyDarkest;
      // Group 80x: clouds
    } else {
      currentBg = colours.clouds;
      currentBgDark = colours.cloudsDark;
      currentBgDarkest = colours.cloudsDarkest;
    }

    setWeatherBg({
      weatherBg: currentBg,
      weatherBgDark: currentBgDark,
      weatherBgDarkest: currentBgDarkest
    });
  };

  useEffect((): void => {
    setColours();
  }, [appData]);

  // Render home page
  const renderHome = () => {
    return (
      <View
        style={[styles.container, { backgroundColor: weatherBg.weatherBg }]}>
        <Header />
        <ScrollView keyboardShouldPersistTaps='handled' horizontal={false}>
          {/* <Location bg={weatherBg.weatherBg} location={appLocation.location} /> */}
          <Icon bg={weatherBg.weatherBgDark} id={appData.id} night={night} />
          <Overview
            bg={weatherBg.weatherBgDark}
            desc={appData.desc}
            high={appData.high}
            low={appData.low}
            sunrise={appData.sunrise}
            sunset={appData.sunset}
            temp={appData.temp}
          />
          <Details
            bg={weatherBg.weatherBgDarkest}
            desc={appData.desc}
            feelsLike={appData.feelsLike}
            high={appData.high}
            hourly={appData.hourly}
            humidity={appData.humidity}
            wind={appData.wind}
          />
          <Footer bg={weatherBg.weatherBg} />
        </ScrollView>
      </View>
    );
  };
  // Check for error state
  return appError.errorState ? errorScreen() : renderHome();
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;
