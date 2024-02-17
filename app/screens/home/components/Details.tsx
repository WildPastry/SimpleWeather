/* eslint-disable max-len */
import { StyleSheet, Text, View } from 'react-native';
import { IHourly } from '../../../types/data.types';
import { Ionicons } from '@expo/vector-icons';
import colours from '../../../assets/colours.json';
import { weatherIcons } from '../../../constants/weatherIcons';

interface IDetails {
  bg: string;
  desc: string;
  feelsLike: number;
  high: number;
  hourly: IHourly[];
  humidity: number;
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
        <View style={styles.windHumidityWrap}>
          {/* Wind speed */}
          <View style={styles.windWrapper}>
            <Text
              style={{
                fontFamily: 'weatherfont',
                fontSize: 18,
                color: colours.white
              }}>
              {weatherIcons[103].code}
            </Text>
            <Text style={styles.windHumidityDetails}>
              {Math.round(props.wind)} km/h
            </Text>
          </View>
          {/* Humidity */}
          <View style={styles.humidityWrapper}>
            <Text
              style={{
                fontFamily: 'weatherfont',
                fontSize: 18,
                color: colours.white
              }}>
              {weatherIcons[102].code}
            </Text>
            <Text style={styles.windHumidityDetails}>{props.humidity}%</Text>
          </View>
        </View>
        {/* Daily Summary */}
        <View style={styles.descTitleWrapper}>
          <Text>
            <Ionicons name='time' size={22} color={colours.white} />
          </Text>
          <Text style={styles.descTitle}>Daily Summary</Text>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10
  },
  descTitle: {
    color: colours.white,
    fontFamily: 'allerBd',
    fontSize: 19,
    letterSpacing: 0.5,
    marginLeft: 8
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
  windHumidityWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  windWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  humidityWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  windHumidityDetails: {
    color: colours.white,
    fontSize: 18,
    fontFamily: 'allerLt',
    letterSpacing: 0.5,
    marginLeft: 8,
    paddingTop: 2
  }
});

export default Details;
