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
import WindSpeed from './../assets/weather/windSpeed.png';
import Humidity from './../assets/weather/humidity.png';

// misc icons
import DownIcon from './../assets/misc/down.png';
import UpIcon from './../assets/misc/up.png';

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
      googleName: this.state.googleName
    };
    this.props.updateSkyData(options);
  }

  // START render current
  render() {
    // set up placeholder text with current location
    var currentPlaceholder = this.props.currentLocation;

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

    // set up colour bg variable
    var colourBg = this.props.currentBg;

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
              googleName: details.formatted_address
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
          // google styles
          styles={{
            container: {
              zIndex: 1,
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible'
            },
            textInputContainer: {
              alignContent: 'center',
              backgroundColor: colourBg,
              height: 50,
              width: '100%'
            },
            textInput: {
              alignItems: 'center',
              backgroundColor: colourBg,
              borderRadius: 0,
              color: '#fff',
              height: 50,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              fontWeight: '900',
              fontSize: 20,
              textAlign: 'center',
              zIndex: 1
            },
            description: {
              alignItems: 'center',
              color: '#fff',
              fontWeight: '700',
              textAlign: 'center'
            },
            listView: {
              backgroundColor: colourBg,
              color: '#fff',
              position: 'absolute',
              top: 50,
              elevation: 1
            },
            separator: {
              backgroundColor: '#ffffff48',
              height: 0.5
            }
          }}
          // google options
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

        {/* START main icon and temp */}
        <View style={styles.currentIconWrap}>
          {/* main icon */}
          <Image
            style={styles.currentIcon}
            source={weatherDisplay}
            resizeMode="contain"
          />
        </View>
        {/* END main icon and temp */}

        {/* START temps */}
        <View style={styles.currentTempWrap}>
          {/* low temp */}
          <View>
            <Text style={styles.currentTempLow}>
              <Image
                style={styles.currentIconSmall}
                source={DownIcon}
                resizeMode="contain"
              />
              {this.props.low}°
            </Text>
          </View>
          {/* <Text style={styles.currentDesc}>low</Text> */}
          {/* current temp */}
          <Text style={styles.currentTemp}>{this.props.temp}°</Text>
          {/* <Text style={styles.currentDesc}>current</Text> */}
          {/* high temp */}
          <View>
            <Text style={styles.currentTempHigh}>
              <Image
                style={styles.currentIconSmall}
                source={UpIcon}
                resizeMode="contain"
              />
              {this.props.high}°
            </Text>
          </View>
          {/* <Text style={styles.currentDesc}>high</Text> */}
        </View>

        {/* END temps */}

        {/* START date display */}
        <Text style={styles.dateText}>
          {day} {date}
        </Text>
        {/* END date display */}

        {/* START description */}
        <Text style={styles.currentDesc}>{this.props.desc}</Text>
        {/* END description */}

        {/* START wind speed */}
        <View style={styles.currentTempWrap}>
          <View>
            <Text style={styles.currentDesc}>
              <Image
                style={styles.currentIconSmall}
                source={WindSpeed}
                resizeMode="contain"
              />
              {'  '}
              {this.props.wind} km/h
            </Text>
          </View>
          {/* END wind speed */}

          {/* START humidity */}
          <View>
            <Text style={styles.currentDesc}>
              <Image
                style={styles.currentIconSmall}
                source={Humidity}
                resizeMode="contain"
              />
              {'  '}
              {percentage.substring(2)}%
            </Text>
          </View>
          {/* END humidity */}
        </View>
      </SafeAreaView>
      // END current display
    );
  }
  // END render current
}
// END current

export default Current;
