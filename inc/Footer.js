// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

// stylesheet
var styles = require("../styles.js");

// START footer
class Footer extends React.Component {
  // START render footer
  render() {
    return (
      // START footer display
      <View style={styles.footerWrap}>
        <Text style={styles.footerText}>powered by DarkSky</Text>
      </View>
      // END footer display
    );
  }
  // END render footer
}
// END footer

export default Footer;