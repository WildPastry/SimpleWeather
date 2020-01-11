// imports
import React, { Component } from 'react';

// default component functions
import { Text, View } from 'react-native';

// colours
import colours from './../assets/colours.json';

// stylesheet
var styles = require('../styles.js');

// START footer
class Footer extends Component {
  // START render footer
  render() {

    return (
      // START footer display
      <View
        style={{
          alignSelf: 'stretch',
          backgroundColor: colours.simpleWeather,
          flex: 1,
          justifyContent: 'center',
          paddingTop: 8,
          paddingBottom: 8
        }}>
        <Text style={styles.footerText}>
          <Text style={{
            fontFamily: 'allerLt',
          }}>data by{' '}
          </Text>
          <Text style={{
            fontFamily: 'allerBd',
          }}>DarkSky{' '}
          </Text>
          <Text style={{
            fontFamily: 'allerLt',
          }}>and{' '}
          </Text>
          <Text style={{
            fontFamily: 'allerBd',
          }}>OpenWeather
        </Text>
        </Text>
      </View>
      // END footer display
    );
  }
  // END render footer
}
// END footer

export default Footer;
