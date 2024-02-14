/* eslint-disable max-len */
import { StyleSheet, Text, View } from 'react-native';
import { IHourly } from '../../../types/data.types';
import { Ionicons } from '@expo/vector-icons';
import colours from '../../../assets/colours.json';
import { weatherIcons } from '../../../constants/weatherIcons';

interface IDetails {
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
    <View style={styles.container}>
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
      {/* Description */}
      <View style={styles.descWrapper}>
        <Text style={styles.descTitle}>
          <Ionicons name='time' size={19} color={colours.white} /> Daily Summary
        </Text>
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
    backgroundColor: colours.thunderStormDarkest,
    flex: 1
  },
  descWrapper: {
    padding: 10
  },
  descTitle: {
    color: colours.white,
    fontFamily: 'allerBd',
    fontSize: 19,
    paddingBottom: 10,
    textAlign: 'center'
  },
  descSummary: {
    fontFamily: 'allerLt',
    fontSize: 19,
    lineHeight: 25,
    textAlign: 'center',
    color: colours.white
  },
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5
  },
  infoHeading: {
    color: colours.white,
    fontFamily: 'allerRg',
    fontSize: 18,
    textAlign: 'center'
  },
  weatherIconWrapper: {
    justifyContent: 'center',
    flexDirection: 'column'
  },
  weatherIcon: {
    color: colours.white,
    fontSize: 45,
    textAlign: 'center',
    fontFamily: 'weatherfont'
  }
});

export default Details;
