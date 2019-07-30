// imports
import React from "react";

// configuration data
import configData from "./../data/config.json";

// default component functions
import { Text, View } from "react-native";

// autocomplete
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// set up auth key for sky data
const geo = configData.GEO;

// stylesheet
var styles = require("../styles.js");

// moment set up
var moment = require("moment");

// const yourLocation = { description: this.state.currentLocation, geometry: { location: { lat: this.state.currentLat, lng: this.state.currentLng } }};

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
    this.updateSkyDataValue = this.updateSkyDataValue.bind(this);
  }

  updateSkyDataValue(value) {
    var options = {
      googleLat: value[0],
      googleLng: value[1]
    };
    this.props.updateSkyData(options);
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
        {/* autocomplete input */}
        <GooglePlacesAutocomplete
          placeholder={this.state.currentLocation}
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="true" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          getDefaultValue={() => ""}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: geo,
            language: "en", // language of the results
            types: "(cities)" // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              backgroundColor: "#fff",
              borderStyle: "none",
              width: "100%",
              zIndex: 100
            },
            textInput: {
              textAlign: "center"
            },
            description: {
              fontWeight: "700"
            },
            predefinedPlacesDescription: {
              color: "#1faadb"
            },
            listView: {
              backgroundColor: "#fff",
              color: "#000",
              zIndex: 5000,
              position: "absolute"
            }
          }}
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={
            {
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }
          }
          // GooglePlacesSearchQuery={{
          //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          //   rankby: "distance",
          //   types: "bar"
          // }}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3"
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          // predefinedPlaces={[yourLocation]}

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          // renderLeftButton={()  => <Text>Custom text after the input</Text>}
          // renderRightButton={() => <Text>Custom text after the input</Text>}
        />
        {/* location display */}
        <Text
          onPress={this.updateSkyDataValue.bind(this, [454545, 787878])}
          style={styles.locationText}
        >
          {currentLocation}
        </Text>
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
