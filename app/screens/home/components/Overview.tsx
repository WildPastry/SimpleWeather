/* eslint-disable max-len */
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colours from '../../../assets/colours.json';

interface IOverview {
  desc: string;
  low: number;
  high: number;
  temp: number;
}

const Overview: React.FC<IOverview> = (props: IOverview): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.temps}>
        <Text style={styles.tempLow}>
          <Ionicons name='arrow-down-outline' size={30} color={colours.white} />{' '}
          {props.low}°
        </Text>
        <Text style={styles.tempCurrent}>{props.temp}°</Text>
        <Text style={styles.tempHigh}>
          <Ionicons name='arrow-up-outline' size={30} color={colours.white} />{' '}
          {props.high}°
        </Text>
      </View>
      <Text style={styles.desc}>
        Currently {props.temp.toString()}° with{' '}
        <Text style={styles.spotDesc}>{props.desc}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.thunderStormDark,
    flex: 1,
    padding: 15,
    paddingBottom: 20
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
    fontFamily: 'allerBd',
    fontSize: 18,
    textAlign: 'center',
    color: colours.white
  },
  spotDesc: {
    color: colours.spotGrey
  }
});

export default Overview;
