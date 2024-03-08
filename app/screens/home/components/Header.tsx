import { StyleSheet, Text, View } from 'react-native';
import colours from '../../../assets/colours.json';

const Header: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.brandWrapper}>
        <Text style={styles.brand}>SIMPLE&nbsp;&nbsp;WEATHER</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.spotGreyMed
  },
  brandWrapper: {
    fontSize: 18,
    padding: 14,
    textAlign: 'center'
  },
  brand: {
    color: colours.white,
    fontFamily: 'merriWeatherLt'
  }
});

export default Header;
