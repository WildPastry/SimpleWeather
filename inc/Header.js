// imports
import React from 'react';

// default component functions
import { Image, Text, View } from 'react-native';

// brand icon
import BrandIcon from './../assets/brand.png';

// colours
import colours from './../assets/colours.json';

// stylesheet
var styles = require('../styles.js');

// START header
class Header extends React.Component {
  // START render header
  render() {

    return (
      // header wrap
      <View style={styles.headerWrap}>
        {/* title display wrapper */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 12
        }}>
          {/* logo */}
          <Image
            style={styles.brandIconSmall}
            source={BrandIcon}
            resizeMode='contain'
          />
          {/* text */}
          <View style={{
            height: 35,
            justifyContent: 'center'
          }}>
            <Text
              style={{
                color: colours.white,
                fontSize: 23,
                fontFamily: 'allerDisplay',
                textAlign: 'center',
              }}>
              SIMPLE WEATHER
             </Text>
          </View>
        </View>
      </View>
    );
  }
  // END render header
}
// END header

export default Header;
