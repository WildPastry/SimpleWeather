import { Linking, StyleSheet, Text, View } from 'react-native';
import colours from '../../../assets/colours.json';

interface IFooter {
  bg: string;
}

const Footer: React.FC<IFooter> = (props: IFooter): JSX.Element => {
  return (
    <View style={{ backgroundColor: props.bg }}>
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
  text: {
    color: colours.white,
    fontSize: 18,
    padding: 14,
    textAlign: 'center'
  },
  textBd: {
    color: colours.spotYellow,
    fontFamily: 'allerBd'
  },
  textLt: {
    fontFamily: 'allerLt'
  }
});

export default Footer;
