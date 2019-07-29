// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

// stylesheet
var styles = require("../styles.js");

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
        <Text style={styles.headerText}>base weather</Text>
      </View>
    );
  }
  // END render header
}
// END header

export default Header;
