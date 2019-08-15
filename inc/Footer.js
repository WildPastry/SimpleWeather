// imports
import React from 'react';

// default component functions
import { Text, View } from 'react-native';

// stylesheet
var styles = require('../styles.js');

// START footer
class Footer extends React.Component {
  // START render footer
  render() {
    // set up colour bg variable
    var colourBg = this.props.footerBg;

    return (
      // START footer display
      <View
        style={{
          alignSelf: 'stretch',
          backgroundColor: colourBg,
          flex: 1,
          justifyContent: 'center',
          paddingTop: 8,
          paddingBottom: 8
        }}
      >
        <Text style={styles.footerText}>powered by OpenWeather + DarkSky</Text>
      </View>
      // END footer display
    );
  }
  // END render footer
}
// END footer

export default Footer;
