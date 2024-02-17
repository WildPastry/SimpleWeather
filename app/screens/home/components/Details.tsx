/* eslint-disable max-len */
import { IDaily, IHourly } from '../../../types/data.types';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colours from '../../../assets/colours.json';
import { weatherIcons } from '../../../constants/weatherIcons';

interface IDetails {
  bg: string;
  daily: IDaily[];
  desc: string;
  feelsLike: number;
  high: number;
  hourly: IHourly[];
  humidity: string;
  night: boolean;
  wind: number;
}

const Details: React.FC<IDetails> = (props: IDetails): JSX.Element => {
  return (
    <View style={[styles.container, { backgroundColor: props.bg }]}>
      {/* Icons */}
      <View style={styles.iconsWrapper}>
        {/* Morning */}
        <View style={styles.weatherIconWrapper}>
          <Text style={styles.weatherIcon}>
            {weatherIcons[props.hourly[9].weather[0].id].code}
          </Text>
          <Text style={styles.infoHeading}>7am</Text>
        </View>
        {/* Afternoon */}
        <View style={styles.weatherIconWrapper}>
          <Text style={styles.weatherIcon}>
            {weatherIcons[props.hourly[14].weather[0].id].code}
          </Text>
          <Text style={styles.infoHeading}>mid-day</Text>
        </View>
        <View style={styles.weatherIconWrapper}>
          {/* Evening */}
          <Text style={styles.weatherIcon}>
            {weatherIcons[props.hourly[19].weather[0].id].code}
          </Text>
          <Text style={styles.infoHeading}>5pm</Text>
        </View>
      </View>
      <View>
        {/* Wind speed and humidity */}
        <View style={styles.weekWindHumWrap}>
          {/* Wind speed */}
          <View style={styles.weekWindWrap}>
            <Text
              style={{
                fontFamily: 'weatherfont',
                fontSize: 18,
                color: colours.white
              }}>
              {weatherIcons[103].code}
            </Text>
            <Text style={styles.weekWindHumDetails}>
              {'  '}
              {Math.round(props.daily[0].wind_speed * 3.6)} km/h
            </Text>
          </View>
          {/* Humidity */}
          <View style={styles.weekHumWrap}>
            <Text
              style={{
                fontFamily: 'weatherfont',
                fontSize: 18,
                color: colours.white
              }}>
              {weatherIcons[102].code}
            </Text>
            <Text style={styles.weekWindHumDetails}>
              {'  '}
              {props.daily[0].humidity}%
            </Text>
          </View>
        </View>
        {/* Daily Summary */}
        <Text style={styles.descTitleWrapper}>
          <Ionicons name='time' size={22} color={colours.white} />{' '}
          <Text style={styles.descTitle}>Daily Summary</Text>
        </Text>
        {/* Description */}
        <Text style={styles.descSummary}>
          Feels like {Math.round(props.feelsLike)}°, {props.desc} with{' '}
          {Math.round(props.wind)} km/h wind, {props.humidity}% humidity and an
          expected high of {props.high}°
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 20
  },
  descTitleWrapper: {
    paddingBottom: 10,
    textAlign: 'center'
  },
  descTitle: {
    color: colours.white,
    fontFamily: 'allerBd',
    fontSize: 19,
    letterSpacing: 0.5
  },
  descSummary: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 18,
    letterSpacing: 0.5,
    lineHeight: 25,
    textAlign: 'center'
  },
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingBottom: 20
  },
  infoHeading: {
    color: colours.white,
    fontFamily: 'allerRg',
    fontSize: 18,
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  weatherIconWrapper: {
    justifyContent: 'center',
    flexDirection: 'column'
  },
  weatherIcon: {
    color: colours.white,
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'weatherfont'
  },
  weekWindHumWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  weekWindWrap: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  weekHumWrap: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  weekWindHumDetails: {
    color: colours.white,
    fontSize: 18,
    fontFamily: 'allerLt',
    paddingTop: 2
  }
});

export default Details;
