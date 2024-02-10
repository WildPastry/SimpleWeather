import { Linking, StyleSheet, Text, View } from 'react-native';
import colours from '../../../assets/colours.json';

const Footer: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {' '}
        <Text style={styles.textLt}>Data from </Text>
        <Text
          style={styles.textBd}
          onPress={() => Linking.openURL('https://openweathermap.org/')}>
          OpenWeather
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.spotGreyMed
  },
  text: {
    color: colours.white,
    fontSize: 16,
    padding: 14
  },
  textBd: {
    fontFamily: 'allerBd'
  },
  textLt: {
    fontFamily: 'allerLt'
  }
});

export default Footer;
