// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

// stylesheet
var styles = require("./styles.js");

// START heading
class Heading extends React.Component {
  render() {
    return (
      // heading wrap
      <View style={styles.headingWrap}>
        {/* top bar */}
        <View style={styles.headingTopBar} />
        {/* heading display */}
        <Text style={styles.heading}>BASIC WEATHER</Text>
      </View>
    );
  }
}
// END heading

export default Heading;
