// imports
import React from 'react';

// configuration data
import configData from './../data/config.json';

// default component functions
import { Image, Text, SafeAreaView, View } from 'react-native';

// autocomplete
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// weather icons
import IconCloudy from './../assets/weather/cloudy.png';
import IconPartlyCloudy from './../assets/weather/partlycloudy.png';
import IconFoggy from './../assets/weather/foggy.png';
import IconRainy from './../assets/weather/rainy.png';
import IconSnowy from './../assets/weather/snowy.png';
import IconSunny from './../assets/weather/sunny.png';
import IconWindy from './../assets/weather/windy.png';

// set up auth key for sky data
const geo = configData.GEO;

// stylesheet
var styles = require('../styles.js');
var googleStyles = require('../google.js');

// moment set up
var moment = require('moment');

// START current
class Current extends React.Component {
  // default class current constructor
  constructor(props) {
    super(props);
    this.state = {
      // autocomplete information
      googleLat: '',
      googleLng: '',
      googleName: '',
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
      googleName: this.state.googleName,
      googleNameLong: this.state.googleNameLong
    };
    this.props.updateSkyData(options);
  }

  // START render current
  render() {
    // set up location
    var currentPlaceholder =
      this.props.currentLocation + ', ' + this.props.currentCity;
    // set current weather icon based on weather

    // set up variables
    let weatherDisplay;
    var currentIcon = this.props.currentIcon;

    // set up date constants
    const today = this.state.currentDate;
    const day = moment(today).format('dddd,');
    const date = moment(today).format('MMMM D');

    // set up humidity percentage
    var percentage = this.props.humidity.toString();

    // weather else if logic
    if (currentIcon === 'cloudy') {
      weatherDisplay = IconCloudy;
    } else if (currentIcon === 'partly-cloudy-day') {
      weatherDisplay = IconPartlyCloudy;
    } else if (currentIcon === 'fog') {
      weatherDisplay = IconFoggy;
    } else if (currentIcon === 'rain') {
      weatherDisplay = IconRainy;
    } else if (currentIcon === 'snow') {
      weatherDisplay = IconSnowy;
    } else if (currentIcon === 'clear-day') {
      weatherDisplay = IconSunny;
    } else if (currentIcon === 'wind') {
      weatherDisplay = IconWindy;
    } else if (currentIcon === 'sleet') {
      weatherDisplay = IconSnowy;
    } else if (currentIcon === 'clear-night') {
      weatherDisplay = IconSunny;
    } else {
      weatherDisplay = IconPartlyCloudy;
    }
    return (
      // START current display
      <SafeAreaView
        keyboardShouldPersistTaps="handled"
        style={styles.currentWrap}
      >
        {/* START autocomplete input */}
        <GooglePlacesAutocomplete
          keyboardShouldPersistTaps="handled"
          placeholder={currentPlaceholder}
          placeholderTextColor="#fff"
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          listViewDisplayed={true}
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            this.setState({
              // set state with google details
              googleLat: details.geometry.location.lat.toFixed(5),
              googleLng: details.geometry.location.lng.toFixed(5),
              googleName: details.address_components[0].long_name,
              googleNameLong: details.address_components[1].long_name
            });

            // update sky data function
            this.updateSkyData();
          }}
          // data query
          query={{
            key: geo,
            language: 'en',
            types: '(cities)'
          }}
          // load google styles
          styles={googleStyles}
          currentLocation={false}
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch"
          GooglePlacesDetailsQuery={{
            fields: 'formatted_address'
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3'
          ]}
          debounce={100}
        />
        {/* END autocomplete input */}
        {/* date display */}
        <Text style={styles.dateText}>
          {day} {date}
        </Text>
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
        <Text style={styles.currentDesc}>
          Wind Speed: {this.props.wind} km/ph
        </Text>
        {/* END wind speed */}
        {/* START humidity */}
        <Text style={styles.currentDesc}>
          Humidity: {percentage.substring(2)}%
        </Text>
        {/* END humidity */}
      </SafeAreaView>
      // END current display
    );
  }
  // END render current
}
// END current

export default Current;
