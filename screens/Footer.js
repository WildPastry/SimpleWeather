// imports
import React, {Component} from 'react';
import {Text, Linking, StyleSheet, View} from 'react-native';
import colours from './../assets/colours.json';

// START Footer
class Footer extends Component {
  // START render Footer
  render() {
    return (
      <View
        style={{
          alignSelf: 'stretch',
          backgroundColor: colours.spotGreyMed,
          flex: 1,
          justifyContent: 'center',
          paddingTop: 8,
          paddingBottom: 8,
        }}>
        <Text style={footerStyles.footerText}>
          <Text
            style={{
              fontFamily: 'allerLt',
            }}>
            Data from{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'allerBd',
            }}
            onPress={() => Linking.openURL('https://openweathermap.org/')}>
            OpenWeather
          </Text>
        </Text>
      </View>
    );
  }
  // END render Footer
}
// END Footer

export default Footer;

// style
const footerStyles = StyleSheet.create({
  footerText: {
    color: colours.white,
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
});
