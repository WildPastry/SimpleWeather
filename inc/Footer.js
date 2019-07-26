// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

// stylesheet
var styles = require("../styles.js");

// START footer
class Footer extends React.Component {
  render() {
    return (
      // START footer display
      <View style={styles.footerWrap}>
        <Text style={styles.footerText}>an app by mike parker</Text>
      </View>
      // END footer display
    );
  }
}
// END footer

export default Footer;