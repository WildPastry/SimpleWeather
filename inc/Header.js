// imports
import React from 'react';

// default component functions
import { Image, Text, View } from 'react-native';

// brand
import Brand from '../assets/misc/brand.png';

// stylesheet
var styles = require('../styles.js');

// START header
class Header extends React.Component {
  // START render header
  render() {
    return (
      // header wrap
      <View style={styles.headerWrap}>
        {/* top bar */}
        <View style={styles.headerTopBar} />
        {/* date display */}
        <Text style={styles.headerText}>
          {/* {' '}
          <Image
            style={styles.brandIconSmall}
            source={Brand}
            resizeMode="contain"
          /> */}
          {'  '}SIMPLE WEATHER
        </Text>
      </View>
    );
  }
  // END render header
}
// END header

export default Header;
