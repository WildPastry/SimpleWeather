// imports
import React from 'react';

// default component functions
import { Image, Text, View } from 'react-native';

// brand
import Brand from '../assets/misc/brand.png';

// font
import { Font } from 'expo';

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
        {/* title display */}
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            fontWeight: '700',
            // fontFamily: 'poppinsbold',
            padding: 10,
            textAlign: 'center'
          }}>
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
