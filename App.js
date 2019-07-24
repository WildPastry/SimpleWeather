// imports
import React from "react";
import {
  AppRegistry,
  Text,
  View,
  Button,
  Alert
} from "react-native";
import configData from "./data/config.json";

// import stylesheet
const styles = require("./inc/styles.js");

// set up auth keys for data
const sky = configData.SKY;

// set up lat and lng
var myLat = -41.2865;
var myLng = 174.7762;

// log lat and lng
console.log(myLat);
console.log(myLng);

// START default class app
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      weather: [],
      temp: "",
      desc: ""
    };
    // log the items in the state
    console.log(this.state.weather);
    console.log(this.state.isLoaded);
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
      // log response error or success
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed with HTTP code " + res.status);
        } else {
          console.log("Success with HTTP code " + res.status);
        }
        return res;
      })
      // convert data into json
      .then(result => result.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          weather: data.currently,
          temp: data.currently.temperature,
          desc: data.currently.summary
        });
        // console.log(this.state.weather.currently);
      })
      // catch and log any other errors
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

  // START render app display
  render() {
    // declare variables as current state
    var { isLoaded, temp } = this.state;
    console.log(this.state);
    console.log(isLoaded);
    console.log(temp);

    // START loading function
    if (!isLoaded) {
      return (
        <View style={styles.loader}>
          <Text style={styles.headingLoader}>Loading...</Text>
        </View>
      );
    // END loading function

      // finish loading function
    } else {
      return (
        // START app display
        <View style={styles.container}>
          {/* heading */}
          <Text style={styles.heading}>BASIC WEATHER</Text>
          {/* button */}
          <MyButton />
          {/* info */}
          <MyInfo temp={this.state.temp} desc={this.state.desc} />
        </View>
         // END app display
      );
    }
  }
  // END render app display
}
// END default class app

// START button
class MyButton extends React.Component {
  // alert function
  getSkyData() {
    Alert.alert("The current temperature is: ");
  }

  render() {
    return (
        // START button display
      <View style={styles.button}>
        <Button
          title="Get the weather"
          onPress={() => {
            this.getSkyData();
          }}
        />
      </View>
        // END button display
    );
  }
  // END button display
}
// END button

// START info
class MyInfo extends React.Component {
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
// END info

// register button functionality for buttons
AppRegistry.registerComponent("basic-weather", () => ButtonBasics);
