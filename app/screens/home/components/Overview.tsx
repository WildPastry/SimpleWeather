/* eslint-disable max-len */
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colours from '../../../assets/colours.json';
import { format } from 'date-fns';
import { weatherIcons } from '../../../constants/weatherIcons';

interface IOverview {
  bg: string;
  desc: string;
  high: number;
  low: number;
  sunrise: number;
  sunset: number;
  temp: number;
}

const Overview: React.FC<IOverview> = (props: IOverview): JSX.Element => {
  // Set up date
  const date: string = format(new Date(), 'EEEE, MMMM do, h:mmaaa');

  // Set up sun details
  const sunDetails = format(new Date(props.sunset), 'h:mmaaa');

  return (
    <View style={[styles.container, { backgroundColor: props.bg }]}>
      {/* 3 temps */}
      <View style={styles.temps}>
        {/* Low */}
        <View style={styles.tempIconWrapper}>
          <Text style={styles.tempLowIcon}>
            <Ionicons
              name='arrow-down-outline'
              size={30}
              color={colours.white}
            />
          </Text>
          <Text style={styles.tempLowText}>{props.low}°</Text>
        </View>
        {/* Current */}
        <Text style={styles.tempCurrent}>{props.temp}°</Text>
        {/* High */}
        <View style={styles.tempIconWrapper}>
          <Text style={styles.tempHighIcon}>
            <Ionicons name='arrow-up-outline' size={30} color={colours.white} />
          </Text>
          <Text style={styles.tempHighText}>{props.high}°</Text>
        </View>
      </View>
      {/* Date */}
      <Text style={styles.text}>{date}</Text>
      {/* Overview description */}
      <Text style={styles.desc}>
        Currently {props.temp.toString()}° with {props.desc}
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
        <Text style={styles.sunText}>Sunset at {sunDetails}</Text>
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
    letterSpacing: 0.5,
    marginLeft: 8
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
  tempIconWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tempLowIcon: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 30
  },
  tempLowText: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 30,
    marginLeft: 5
  },
  tempCurrent: {
    color: colours.white,
    fontFamily: 'allerDisplay',
    fontSize: 70
  },
  tempHighIcon: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 30
  },
  tempHighText: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 30,
    marginLeft: 5
  },
  desc: {
    color: colours.white,
    fontFamily: 'allerBd',
    fontSize: 18,
    letterSpacing: 0.5,
    paddingTop: 10,
    textAlign: 'center'
  }
});

export default Overview;
