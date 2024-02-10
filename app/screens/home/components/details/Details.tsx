import { StyleSheet, Text, View } from 'react-native';
import { IHourly } from '../../../../types/data.types';
import Icons from './components/Icons';
import Summary from './components/Summary';
import colours from '../../../../assets/colours.json';

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
      <Text style={styles.descSummary}>
        Feels like {Math.round(props.feelsLike)}°, {props.desc} with{' '}
        {Math.round(props.wind)} km/h wind, {props.humidity}% humidity and an
        expected high of {props.high}°
      </Text>
      <Icons />
      <Summary />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colours.thunderStormDark,
    flex: 1
  },
  descSummary: {
    fontFamily: 'allerLt',
    fontSize: 19,
    lineHeight: 25,
    textAlign: 'center',
    color: colours.white
  }
});

export default Details;
