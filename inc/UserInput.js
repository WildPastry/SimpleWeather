// imports
import React from "react";

// default component functions
import { Platform, Text, View } from "react-native";

// permissions API
import { Constants, Location, Permissions } from "expo";

// configuration data
import configData from "./../data/config.json";

// set up auth key for sky data
const geo = configData.GEO;

// stylesheet
var styles = require("../styles.js");

// START user input
class UserInput extends React.Component {
  // default class user input constructor
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      currentLocation: null,
      errorMessage: null,
      currentLat: null,
      currentLng: null
    };
  }

  // START component mounted
  componentWillMount() {
    // platform check
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
      // run get location function
    } else {
      this._getLocationAsync();
    }
  }
  // END component mounted

  // START get location function
  _getLocationAsync = async () => {
    // check provider and if location services are enabled
    let providerStatus = await Location.getProviderStatusAsync();
    // services disabled error
    if (!providerStatus.locationServicesEnabled) {
      this.setState({
        errorMessage: "Location Services Disabled"
      });
      return;
    }

    // check permissions
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // permission denied error
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
      return;
    }

    // success function
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location: location,
      currentLat: location.coords.latitude.toFixed(5),
      currentLng: location.coords.longitude.toFixed(5)
    });
    this.reverseGeo();
  };
  // END get location function

  // START reverse geo function
  reverseGeo() {
    var myLat = this.state.currentLat;
    var myLng = this.state.currentLng;
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        myLat +
        "," +
        myLng +
        "&key=" +
        geo
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          currentLocation: responseJson.results[3].address_components[3].long_name
        });
        // console.log(responseJson.results[3].address_components[3].long_name);
      });
  }
  // END reverse geo fucntion

  // START render user input
  render() {
    let text = "Loading...";
    if (this.state.errorMessage) {
      // display error text
      text = this.state.errorMessage;
    } else if (this.state.currentLocation) {
      // display success text (users current location)
      text = this.state.currentLocation;
      // var myLat = this.state.location.coords.latitude.toFixed(5);
      // var myLng = this.state.location.coords.longitude.toFixed(5);
      // console.log(myLat);
      // console.log(myLng);
      console.log(text);
    }

    return (
      // START user input display
      <View style={styles.locationWrap}>
        <Text style={styles.locationText}>{text}</Text>
      </View>
      // END user input display
    );
  }
  // END render user input
}
// END user input

export default UserInput;
