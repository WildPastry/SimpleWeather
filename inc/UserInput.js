// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

// stylesheet
var styles = require("../styles.js");

// moment set up
var moment = require("moment");

// START user input
class UserInput extends React.Component {
  // default class user input constructor
  constructor(props) {
    super(props);
    this.state = {
      // error message
      errorMessage: this.props.errorMessage,
      // get current location
      currentLocation: this.props.currentLocation,
      // get current lat lng
      currentLat: this.props.currentLat,
      currentLng: this.props.currentLng,
      // get current date
      currentDate: new Date()
    };
  }

  // START render user input
  render() {
    // set up date constants
    const today = this.state.currentDate;
    const day = moment(today).format("dddd,");
    const date = moment(today).format("MMMM D");

    let currentLocation = "Loading...";
    if (this.state.errorMessage) {
      // display error text
      currentLocation = this.state.errorMessage;
    } else if (this.state.currentLocation) {
      // display success text (users current location)
      currentLocation = this.state.currentLocation;
    }

    return (
      // START user input display
      <View style={styles.locationWrap}>
        {/* location display */}
        <Text style={styles.locationText}>{currentLocation}</Text>
        {/* date display */}
        <Text style={styles.dateText}>
          {day} {date}
        </Text>
      </View>
      // END user input display
    );
  }
  // END render user input
}
// END user input

export default UserInput;
