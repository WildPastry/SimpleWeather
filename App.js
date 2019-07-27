// imports
import React from "react";

// default component functions
import { AppRegistry, Text, View, Button, Alert } from "react-native";

// components
import Header from "./inc/Header";
import UserInput from "./inc/UserInput";
import Current from "./inc/Current";
import Week from "./inc/Week";
import Footer from "./inc/Footer";

// configuration data
import configData from "./data/config.json";

// stylesheet
var styles = require("./styles.js");

// set up auth key for sky data
const sky = configData.SKY;

// set up lat and lng
var myLat = -41.2865;
var myLng = 174.7762;

// START default class app
export default class App extends React.Component {
  // default class app constructor
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      weather: [],
      icon: "",
      currentIcon: "",
      temp: "",
      high: "",
      low: "",
      desc: ""
    };
  }

  // START component mounted
  componentDidMount() {
    // fetch data
    fetch(
      "https://api.darksky.net/forecast/" +
        sky +
        "/" +
        myLat +
        "," +
        myLng +
        "?units=si"
    )
      // log HTTP response error or success for data call
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed with HTTP code " + res.status);
        } else {
          console.log("Success with HTTP code " + res.status);
        }
        return res;
      })
      // convert raw data call into json
      .then(result => result.json())
      .then(data => {
        this.setState(
          {
            isLoaded: true,
            weather: data,
            icon: data.currently.icon,
            temp: Math.trunc(data.currently.temperature),
            high: Math.trunc(data.daily.data[0].temperatureHigh),
            low: Math.trunc(data.daily.data[0].temperatureLow),
            desc: data.daily.data[0].summary
          },
          () => {
            this.setCurrentIcon();
          }
        );
        // console.log(this.state.weather);
      })
      // catch and log errors
      .catch(error => {
        if (error.res) {
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("error ", error.message);
        }
        console.log(error.config);
      });
  }
  // END component mounted

  // set current weather icon
  setCurrentIcon() {
    this.setState(
      {
        currentIcon: this.state.icon
      },
      () => {
        console.log(this.state.currentIcon);
      }
    );
  }

  // START render app
  render() {
    // declare variable in current state
    var { isLoaded } = this.state;

    // START loading function
    if (!isLoaded) {
      return (
        // START loading display
        <View style={styles.loader}>
          <Text style={styles.headingLoader}>Loading...</Text>
        </View>
        // END loading display
      );
      // END loading function
    } else {
      return (
        // START app display
        <View style={styles.container}>
          {/* header */}
          <Header />
          {/* location */}
          <UserInput />
          {/* current */}
          <Current
            currentIcon={this.state.currentIcon}
            temp={this.state.temp}
            high={this.state.high}
            low={this.state.low}
            desc={this.state.desc}
          />
          {/* week */}
          <Week />
          {/* footer */}
          <Footer />
        </View>
        // END app display
      );
    }
  }
  // END render app
}
// END default class app

// register button functionality
AppRegistry.registerComponent("basic-weather", () => ButtonBasics);