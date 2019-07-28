// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

// stylesheet
var styles = require("../styles.js");

// START week
class Week extends React.Component {
  // default class week constructor
  constructor(props) {
    super(props);
    this.state = {
      weather: this.props.weather
    };
  }

  // START component mounted
  // componentdidMount() {
  //   console.log(this.state);
  // }
  // END component mounted

  render() {
    // console.log(this.state.weather[0]);
    return (
      // START week display
      <View style={styles.weekWrap}>
        {/* <View style={styles.weekText}> */}
        {this.state.weather.map(dailyWeather => (
          <View key={dailyWeather.time}>
            <Text style={styles.weekIcon}>{dailyWeather.icon}</Text>
          </View>
        ))}
        {/* </View> */}
      </View>
      // END week display
    );
  }
}
// END week

export default Week;
