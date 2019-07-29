// imports
import React from "react";

// default component functions
import { Image, Text, View } from "react-native";

// weather icons
// import IconCloudy from "./../assets/weather/cloudy.png";
// import IconPartlyCloudy from "./../assets/weather/partlycloudy.png";
// import IconFoggy from "./../assets/weather/foggy.png";
import IconRainy from "./../assets/weather/rainy.png";
// import IconSnowy from "./../assets/weather/snowy.png";
// import IconSunny from "./../assets/weather/sunny.png";
// import IconWindy from "./../assets/weather/windy.png";

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

  // renderSwitch(param) {
  //   switch(param) {
  //     case 'foo':
  //       return 'bar';
  //     default:
  //       return 'foo';
  //   }
  // }

  render() {
    // console.log(this.state.weather);

    // set daily weather icon based on weather
    // let dailyWeatherDisplay;
    // var dailyIcon = dailyWeather.icon;
    // console.log(dailyWeatherDisplay);
    // weather else if logic
    // if (dailyWeather.icon === "cloudy") {
    //   dailyWeatherDisplay = IconCloudy;
    // } else if (dailyWeather.icon === "partly-cloudy-day") {
    //   dailyWeatherDisplay = IconPartlyCloudy;
    // } else if (dailyWeather.icon === "fog") {
    //   dailyWeatherDisplay = IconFoggy;
    // } else if (dailyWeather.icon === "rain") {
    //   dailyWeatherDisplay = IconRainy;
    // } else if (dailyWeather.icon === "snow") {
    //   dailyWeatherDisplay = IconSnowy;
    // } else if (dailyWeather.icon === "clear-day") {
    //   dailyWeatherDisplay = IconSunny;
    // } else if (dailyWeather.icon === "wind") {
    //   dailyWeatherDisplay = IconWindy;
    // } else if (dailyWeather.icon === "sleet") {
    //   dailyWeatherDisplay = IconSnowy;
    // } else if (dailyWeather.icon === "clear-night") {
    //   dailyWeatherDisplay = IconSunny;
    // } else if (dailyWeather.icon === "partly-cloudy-night") {
    //   dailyWeatherDisplay = IconPartlyCloudy;
    // }
    // return <Text style={styles.weekIcon}>{dailyWeatherDisplay}</Text>
    return (
      // START week display
      <View style={styles.weekWrap}>
        {/* <View style={styles.weekText}> */}
        {this.state.weather.map(dailyWeather => {
          // let dailyWeatherDisplay;
          // if (dailyWeather.icon === "rain") {
          //   dailyWeatherDisplay = IconRainy;
          // } else dailyWeatherDisplay = IconRainy;
          // console.log(dailyWeatherDisplay);

          <View style={styles.weekIconTempWrap} key={dailyWeather.time}>
            {/* <Image
              style={styles.weekIcon}
              source={IconRainy}
              resizeMode="contain"
            /> */}
            <Text style={styles.weekLowTemp}>
              {Math.round(dailyWeather.temperatureLow)}°
            </Text>
            <Text style={styles.weekHighTemp}>
              {Math.round(dailyWeather.temperatureHigh)}°
            </Text>
          </View>;
        })}
        {/* </View> */}
      </View>
      // END week display
    );
  }
}
// END week

export default Week;
