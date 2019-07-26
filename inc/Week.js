// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

// stylesheet
var styles = require("../styles.js");

// START week
class Week extends React.Component {
  render() {
    return (
      // START week display
      <View style={styles.weekWrap}>
        <Text style={styles.weekText}>Week Component</Text>
      </View>
      // END week display
    );
  }
}
// END week

export default Week;