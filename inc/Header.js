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

    // set up colour bg variables
    var colourBg = this.props.headerBg;
    var colourBarBg = this.props.headerBarBg;

    return (
      // header wrap
      <View style={styles.headerWrap}>
        {/* top bar */}
        <View style={styles.headerTopBar} />
        {/* title display */}
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            fontWeight: '700',
            padding: 10,
            textAlign: 'center'
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
