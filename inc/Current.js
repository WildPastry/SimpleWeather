// imports
import React from 'react';

// configuration data
import configData from './../data/config.json';

// default component functions
import { Image, Text, SafeAreaView, View } from 'react-native';

// autocomplete
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// weather icons
import WindSpeed from './../assets/weather/windSpeed.png';
import Humidity from './../assets/weather/humidity.png';

// misc icons
import DownIcon from './../assets/misc/down.png';
import UpIcon from './../assets/misc/up.png';

// colours
import colours from './../assets/colours.json';

// icons
import weatherIcons from './../assets/icons.json';
import nightWeatherIcons from './../assets/nightIcons.json';
import { Ionicons } from '@expo/vector-icons';

// set up auth key for sky data
const geo = configData.GEO;

// stylesheet
var styles = require('../styles.js');

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
    // set up weather code
    var weatherCode = this.props.weatherCode;

    // set up icon display
    let displayWeatherIcon;

    // set up placeholder text with current location
    var currentPlaceholder = this.props.currentLocation;

    // set up date constants
    const today = this.state.currentDate;
    const day = moment(today).format('dddd,');
    const date = moment(today).format('MMMM D');

    // set up colour bg variable
    var colourBg = this.props.currentBg;

    // check night or day
    var isNightOrDay = this.props.icon.includes('01n');

    console.log(isNightOrDay + ' from Current.js');
    if (isNightOrDay === true) {
      displayWeatherIcon = nightWeatherIcons;
    } else {
      displayWeatherIcon = weatherIcons;
    }

    return (
      // START current display
      <SafeAreaView
        keyboardShouldPersistTaps='handled'
        style={styles.currentWrap}>
        {/* START autocomplete input */}
        <GooglePlacesAutocomplete
          keyboardShouldPersistTaps='handled'
          placeholder={currentPlaceholder}
          placeholderTextColor='#fff'
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          listViewDisplayed={true}
          fetchDetails={true}
          renderDescription={(row) => row.description}
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
              fontSize: 18,
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
          currentLocationLabel='Current location'
          nearbyPlacesAPI='GooglePlacesSearch'
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
          <Text
            style={{
              fontFamily: 'weatherfont',
              fontSize: 140,
              textAlign: 'center',
              color: colours.snow
            }}>
            {displayWeatherIcon[weatherCode].code}
          </Text>
        </View>
        {/* END main icon and temp */}

        {/* START temps */}
        <View style={styles.currentTempWrap}>
          {/* low temp */}
          <View>
            <Text style={styles.currentTempLow}>
              <Ionicons
                name='ios-arrow-round-down'
                size={35}
                color={colours.snow}
              />{' '}
              {this.props.low}°
            </Text>
          </View>
          {/* current temp */}
          <Text style={styles.currentTemp}> {this.props.temp}°</Text>
          {/* high temp */}
          <View>
            <Text style={styles.currentTempHigh}>
            <Ionicons
                name='ios-arrow-round-up'
                size={35}
                color={colours.snow}
              />{' '}
              {this.props.high}°
            </Text>
          </View>
        </View>
        {/* END temps */}

        {/* START date display */}
        <Text style={styles.dateText}>
          {/* <MaterialCommunityIcons name='chevron-down' size={35} color={colours.snow} /> {' '}  */}
          {day} {date}
        </Text>
        {/* END date display */}

        {/* START description */}
        <Text style={styles.currentDesc}>
          current{'  '}/{'  '}
          {this.props.desc}
        </Text>
        {/* END description */}

        {/* START wind and humidity */}
        <View style={styles.currentWindHumWrap}>
          {/* START wind speed */}
          <View style={styles.currentWindWrap}>
            <Image
              style={styles.currentIconSmall}
              source={WindSpeed}
              resizeMode='contain'
            />
            <Text style={styles.currentDetails}>
              {'  '}
              {Math.round(this.props.wind)} km/h
            </Text>
          </View>
          {/* END wind speed */}

          {/* START humidity */}
          <View style={styles.currentHumWrap}>
            <Image
              style={styles.currentIconSmall}
              source={Humidity}
              resizeMode='contain'
            />
            <Text style={styles.currentDetails}>
              {'  '}
              {this.props.humidity}%
            </Text>
          </View>
          {/* END humidity */}
        </View>
        {/* END wind and humidity */}
      </SafeAreaView>
      // END current display
    );
  }
  // END render current
}
// END current

export default Current;
