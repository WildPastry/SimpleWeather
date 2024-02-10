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
        <Text style={styles.temp}>{props.temp}°</Text>
        <Text style={styles.tempHigh}>{props.high}</Text>
      </View>
      <Text style={styles.title}>
        Currently {props.temp.toString()}° with {props.desc}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
  temp: {
    color: colours.white,
    fontFamily: 'allerDisplay',
    fontSize: 70,
    textAlign: 'center'
  },
  tempHigh: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 30
  },
  title: {
    color: colours.white
  }
});

export default Overview;
