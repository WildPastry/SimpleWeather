// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

import GetLocation from 'react-native-get-location'
 
GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
})
.then(location => {
    console.log(location);
})
.catch(error => {
    const { code, message } = error;
    console.warn(code, message);
})

// stylesheet
var styles = require("../styles.js");

// START location
class Location extends React.Component {
  render() {
    return (
      // START location display
      <View style={styles.locationWrap}>
        <Text style={styles.locationText}>Location Component</Text>
      </View>
      // END location display
    );
  }
}
// END location

export default Location;
