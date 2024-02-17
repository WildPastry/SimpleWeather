import { StyleSheet, Text, View } from 'react-native';
import colours from '../../../assets/colours.json';

interface ILocation {
  bg: string;
}

const Location: React.FC<ILocation> = (props: ILocation): JSX.Element => {
  return (
    <View style={{ backgroundColor: props.bg }}>
      <Text style={styles.text}>Wellington, New Zealand</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colours.white,
    fontFamily: 'allerLt',
    fontSize: 18,
    padding: 14,
    textAlign: 'center'
  }
});

export default Location;
