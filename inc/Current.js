// imports
import React from "react";

// default component functions
import {
  Text,
  View
} from "react-native";

// stylesheet
var styles = require("./styles.js");

// START current
class Current extends React.Component {
  render() {
    return (
        // START info display
      <View style={styles.info}>
        <Text style={styles.text}>{this.props.temp}</Text>
        <Text style={styles.text}>{this.props.desc}</Text>
      </View>
        // END info display
    );
  }
}
// END current

export default Current;
