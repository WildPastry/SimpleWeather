// imports
import React from "react";

// default component functions
import { Image, Text, View } from "react-native";

// weather icons
import IconCloudy from "./../assets/weather/cloudy.png";
import IconPartlyCloudy from "./../assets/weather/partlycloudy.png";
import IconFoggy from "./../assets/weather/foggy.png";
import IconRainy from "./../assets/weather/rainy.png";
import IconSnowy from "./../assets/weather/snowy.png";
import IconSunny from "./../assets/weather/sunny.png";
import IconWindy from "./../assets/weather/windy.png";

// stylesheet
var styles = require("../styles.js");

// START current
class Current extends React.Component {
  // START render current
  render() {
    // set current weather icon based on weather
    // set up variables
    let weatherDisplay;
    var currentIcon = this.props.currentIcon;

    // weather else if logic
    if (currentIcon === "cloudy") {
      weatherDisplay = IconCloudy;
    } else if (currentIcon === "partly-cloudy-day") {
      weatherDisplay = IconPartlyCloudy;
    } else if (currentIcon === "fog") {
      weatherDisplay = IconFoggy;
    } else if (currentIcon === "rain") {
      weatherDisplay = IconRainy;
    } else if (currentIcon === "snow") {
      weatherDisplay = IconSnowy;
    } else if (currentIcon === "clear-day") {
      weatherDisplay = IconSunny;
    } else if (currentIcon === "wind") {
      weatherDisplay = IconWindy;
    } else if (currentIcon === "sleet") {
      weatherDisplay = IconSnowy;
    } else if (currentIcon === "clear-night") {
      weatherDisplay = IconSunny;
    } else {
      weatherDisplay = IconPartlyCloudy;
    }
    return (
      // START current display
      <View style={styles.currentWrap}>
        {/* START main icon and temp */}
        <View style={styles.currentIconTempWrap}>
          {/* main icon */}
          <Image
            style={styles.currentIcon}
            source={weatherDisplay}
            resizeMode="contain"
          />
          {/* temp */}
          <Text style={styles.currentTemp}>{this.props.temp}°</Text>
        </View>
        {/* END main icon and temp */}

        {/* START high and low temps */}
        <View style={styles.currentDescTempWrap}>
          <Text style={styles.currentTempLow}>low: {this.props.low}°</Text>
          <Text style={styles.currentTempHigh}>high: {this.props.high}°</Text>
        </View>
        {/* END high and low temps */}

        {/* START description */}
        <Text style={styles.currentDesc}>{this.props.desc}</Text>
        {/* END description */}
        {/* START wind speed */}
        <Text style={styles.currentDesc}>{this.props.wind}</Text>
        {/* END wind speed */}
      </View>
      // END current display
    );
  }
  // END render current
}
// END current

export default Current;
