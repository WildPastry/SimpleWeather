// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

// stylesheet
var styles = require("./styles.js");

// START header
class Header extends React.Component {
  render() {
    return (
      // header wrap
      <View style={styles.headerWrap}>
        {/* top bar */}
        <View style={styles.headerTopBar} />
        {/* header display */}
        <Text style={styles.headerText}>basic weather</Text>
      </View>
    );
  }
}
// END header

export default Header;
