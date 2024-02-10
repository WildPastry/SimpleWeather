import { StyleSheet, Text, View } from 'react-native';
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
        <Text style={styles.tempLow}>{props.low}</Text>
        <Text style={styles.tempCurrent}>{props.temp}°</Text>
        <Text style={styles.tempHigh}>{props.high}</Text>
      </View>
      <Text style={styles.desc}>
        Currently {props.temp.toString()}° with {props.desc}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.thunderStorm
  },
  temps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  tempLow: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 30
  },
  tempCurrent: {
    color: colours.white,
    fontFamily: 'allerDisplay',
    fontSize: 70
  },
  tempHigh: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 30
  },
  desc: {
    fontFamily: 'allerBd',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
    color: colours.white
  }
});

export default Overview;
