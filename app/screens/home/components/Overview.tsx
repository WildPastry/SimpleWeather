/* eslint-disable max-len */
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colours from '../../../assets/colours.json';
import { weatherIcons } from '../../../constants/weatherIcons';

interface IOverview {
  bg: string;
  desc: string;
  high: number;
  low: number;
  temp: number;
}

const Overview: React.FC<IOverview> = (props: IOverview): JSX.Element => {
  return (
    <View style={[styles.container, { backgroundColor: props.bg }]}>
      {/* 3 temps */}
      <View style={styles.temps}>
        {/* Low */}
        <Text style={styles.tempLow}>
          <Ionicons name='arrow-down-outline' size={30} color={colours.white} />{' '}
          {props.low}°
        </Text>
        {/* Current */}
        <Text style={styles.tempCurrent}>{props.temp}°</Text>
        {/* High */}
        <Text style={styles.tempHigh}>
          <Ionicons name='arrow-up-outline' size={30} color={colours.white} />{' '}
          {props.high}°
        </Text>
      </View>
      {/* Date */}
      <Text style={styles.text}>Saturday, September 4th, 2:00 pm</Text>
      {/* Overview description */}
      <Text style={styles.desc}>
        Currently {props.temp.toString()}° with{' '}
        <Text style={styles.spotDesc}>{props.desc}</Text>
      </Text>
      {/* Sunrise/sunset */}
      <View style={styles.sunWrapper}>
        <Text
          style={{
            fontFamily: 'weatherfont',
            fontSize: 18,
            color: colours.spotYellow
          }}>
          {weatherIcons[105].code}
        </Text>
        <Text style={styles.sunText}>{'  '}Sunset at 8:30 pm</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 10
  },
  sunWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10
  },
  sunText: {
    color: colours.white,
    fontFamily: 'allerRg',
    fontSize: 18,
    letterSpacing: 0.5
  },
  text: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 18,
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  temps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  tempLow: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 30,
    textAlignVertical: 'center'
  },
  tempCurrent: {
    color: colours.white,
    fontFamily: 'allerDisplay',
    fontSize: 70
  },
  tempHigh: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 30,
    textAlignVertical: 'center'
  },
  desc: {
    color: colours.white,
    fontFamily: 'allerBd',
    fontSize: 18,
    letterSpacing: 0.5,
    paddingTop: 10,
    textAlign: 'center'
  },
  spotDesc: {
    color: colours.spotGrey
  }
});

export default Overview;
