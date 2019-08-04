// imports
import React from "react";

// configuration data
import configData from "./../data/config.json";

// default component functions
import { Text, ScrollView, View } from "react-native";

// autocomplete
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// database storage
import { AsyncStorage } from "react-native";

// set up auth key for sky data
const geo = configData.GEO;

// stylesheet
var styles = require("../styles.js");
var googleStyles = require("../google.js");

// moment set up
var moment = require("moment");

// saved location array
var savedLocation = [];

// saved location function
AsyncStorage.setItem(
  "savedLocationKey",
  JSON.stringify(savedLocation),
  async () => {
    try {
      const req = await AsyncStorage.getItem("savedLocationKey");
      const json = JSON.parse(req);
      if (!json.length) {
        // console.log("No saved location data");
      } else {
        return console.log(json);
      }
    } catch (error) {
      return console.log("error!");
    }
  }
);

// let savedLocation_object = {
//   savedLat: "",
//   savedLng: "",
//   savedName: ""
// };

// AsyncStorage.setItem(
//   "savedLocation",
//   JSON.stringify(savedLocation_object),
//   () => {
//     AsyncStorage.getItem("savedLocation", (err, result) => {
//       console.log(result);
//       // if (result.savedLat === ""){
//       //   console.log("blank");
//       // } else {
//       //   console.log(result);
//       // }
//     });
//     // this.updateSkyData();
//   }
// );

// START user input
class UserInput extends React.Component {
  // default class user input constructor
  constructor(props) {
    super(props);
    this.state = {
      // autocomplete information
      googleLat: "",
      googleLng: "",
      googleName: "",
      // get current date
      currentDate: new Date()
    };
    this.updateSkyData = this.updateSkyData.bind(this);
  }

  // update sky data function
  updateSkyData() {
    var options = {
      googleLat: this.state.googleLat,
      googleLng: this.state.googleLng,
      googleName: this.state.googleName
    };
    savedLocation = [];
    savedLocation.push(
      this.state.googleLat,
      this.state.googleLng,
      this.state.googleName
    );
    console.log(savedLocation);
    this.props.updateSkyData(options);
  }

  // START render user input
  render() {
    // console.log(savedLocation);
    // set up date constants
    const today = this.state.currentDate;
    const day = moment(today).format("dddd,");
    const date = moment(today).format("MMMM D");

    let currentLocation = "Loading...";
    if (this.state.errorMessage) {
      // display error text
      currentLocation = this.props.errorMessage;
    } else if (this.props.currentLocation) {
      // display success text (users current location)
      currentLocation = this.props.currentLocation;
    }

    return (
      // START user input display
      <View style={styles.locationWrap}>
        {/* autocomplete input */}
        <GooglePlacesAutocomplete
          keyboardShouldPersistTaps="handled"
          placeholder={this.props.currentLocation}
          minLength={2}
          autoFocus={false}
          listViewDisplayed={false}
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            this.setState({
              // set state with google details
              googleLat: details.geometry.location.lat.toFixed(5),
              googleLng: details.geometry.location.lng.toFixed(5),
              googleName: details.address_components[0].long_name
            });
            // update sky data function
            this.updateSkyData();
          }}
          // data query
          query={{
            key: geo,
            language: "en",
            types: "(cities)"
          }}
          // load google styles
          styles={googleStyles}
          currentLocation={false}
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch"
          GooglePlacesDetailsQuery={{
            fields: "formatted_address"
          }}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3"
          ]}
          debounce={100}
        />
        {/* location display */}
        {/* <Text style={styles.locationText}>{currentLocation}</Text> */}
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
