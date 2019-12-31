// imports
import React from 'react';

// default component functions
import { Text, View } from 'react-native';

// stylesheet
var styles = require('../styles.js');

// START header
class Header extends React.Component {
  // START render header
  render() {

    return (
      // header wrap
      <View style={styles.headerWrap}>
        {/* top bar (might be unnecessary) */}
        {/* <View style={styles.headerTopBar} /> */}
        {/* title display */}
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontFamily: 'allerDisplay',
            padding: 15,
            textAlign: 'center',
          }}>
          {'  '}SIMPLE WEATHER
        </Text>
      </View>
    );
  }
  // END render header
}
// END header

export default Header;
