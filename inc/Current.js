// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

// stylesheet
var styles = require("./styles.js");

// START current
class Current extends React.Component {
  render() {
    return (
      // START current display
      <View style={styles.currentWrap}>
        {/* START main icon and temp */}
        <View style={styles.currentTextWrap}>
          <Text style={styles.currentText}>{this.props.icon}</Text>
          <Text style={styles.currentText}>{this.props.temp}°</Text>
        </View>
        {/* END main icon and temp */}

        {/* START high and low temps */}
        <View style={styles.currentTextWrap}>
          <Text style={styles.currentText}>{this.props.high}°</Text>
          <Text style={styles.currentText}>{this.props.low}°</Text>
        </View>
        {/* END high and low temps */}

        {/* START description */}
        <Text style={styles.currentText}>{this.props.desc}</Text>
        {/* END description */}
      </View>
      // END current display
    );
  }
}
// END current

export default Current;
