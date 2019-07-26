// imports
import React from "react";

// default component functions
import { Text, View } from "react-native";

// weather icons
// import IconCloudy from "./../assets/weather/iconCloudy";
// import IconPartlyCloudy from "./../assets/weather/iconPartlyCloudy";
// import IconRainbow from "./../assets/weather/iconRainbow";
// import IconRainy from "./../assets/weather/iconRainy";
// import IconSnowy from "./../assets/weather/iconSnowy";
// import IconSunny from "./../assets/weather/iconSunny";
// import IconWindy from "./../assets/weather/iconWindy";

// stylesheet
var styles = require("../styles.js");

// START current
class Current extends React.Component {
  // class current constructor
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentIcon: this.props.icon
  //   };
  // }

  // set current weather icon
  // setCurrentIcon() {
  //   this.setState({
  //     currentIcon: this.props.icon
  //   });
  // }

  render() {
    // set current weather icon
    let weatherDisplay;
    // var currentIcon = this.props.currentIcon;
    // if (currentIcon === "cloudy") {
      // weatherDisplay = <IconCloudy />;
    // } else if (currentIcon === "partly-cloudy-day") {
    //   weatherDisplay = <IconPartlyCloudy />;
    // } else if (currentIcon === "fog") {
    //   weatherDisplay = <IconRainbow />;
    // } else if (currentIcon === "rain") {
    //   weatherDisplay = <IconRainy />;
    // } else if (currentIcon === "snow") {
    //   weatherDisplay = <IconSnowy />;
    // } else if (currentIcon === "clear-day") {
    //   weatherDisplay = <IconSunny />;
    // } else if (currentIcon === "wind") {
    //   weatherDisplay = <IconWindy />;
    // } else if (currentIcon === "sleet") {
    //   weatherDisplay = <IconSnowy />;
    // } else if (currentIcon === "clear-night") {
    //   weatherDisplay = <IconSunny />;
    // } else if (currentIcon === "partly-cloudy-night") {
    //   weatherDisplay = <IconPartlyCloudy />;
    // }
    return (
      // START current display
      <View style={styles.currentWrap}>
        {/* START main icon and temp */}
        <View style={styles.currentTextWrap}>
          <Text>{weatherDisplay}</Text>
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
