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
      // autocomplete information
      googleLat: "",
      googleLng: "",
      googleName: "",
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
    this.updateSkyData = this.updateSkyData.bind(this);
  }

  updateSkyData() {
    var options = {
      googleLat: this.state.googleLat,
      googleLng: this.state.googleLng,
      googleName: this.state.googleName
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
          // returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="true" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            this.setState({
              googleLat: details.geometry.location.lat.toFixed(5),
              googleLng: details.geometry.location.lng.toFixed(5),
              googleName: details.address_components[0].short_name
            });
            // 'details' is provided when fetchDetails = true
            // console.log(data, details);
            // console.log(this.state.googleLat);
            // console.log(this.state.googleLng);
            // console.log(this.state.googleName);
            this.updateSkyData();
            // console.log(details.geometry.location.lat.toFixed(5));
            // console.log(details.geometry.location.lng.toFixed(5));
            // console.log(details.address_components[0].short_name);
          }}
          getDefaultValue={() => ""}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: geo,
            language: "en", // language of the results
            types: "(cities)" // default: 'geocode'
          }}
          styles={{
            container: {
              zIndex: 50
            },
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
          // GoogleReverseGeocodingQuery={
          //   {
          //     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          //   }
          // }
          GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: "formatted_address"
          }}
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
          // onPress={this.updateSkyData.bind(this, [
          //   this.state.googleLat,
          //   this.state.googleLng,
          //   this.state.googleName
          // ])}
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
