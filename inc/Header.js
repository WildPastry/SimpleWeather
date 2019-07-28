// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

// moment set up
var moment = require("moment");
moment().format();

// stylesheet
var styles = require("../styles.js");

// START header
class Header extends React.Component {
  // default class header constructor
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      markedDate: moment(new Date()).format("YYYY-MM-DD")
    };
  }

  // START render header
  render() {
    // set up date constants
    const today = this.state.currentDate;
    const day = moment(today).format("dddd");
    const date = moment(today).format("MMMM D, YYYY");

    return (
      // header wrap
      <View style={styles.headerWrap}>
        {/* top bar */}
        <View style={styles.headerTopBar} />
        {/* date display */}
        <Text style={styles.headerText}>
          {day} {date}
        </Text>
      </View>
    );
  }
  // END render header
}
// END header

export default Header;
