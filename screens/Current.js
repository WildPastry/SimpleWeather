// imports
import React, { Component } from 'react';
import { Text, Keyboard, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import configData from './../data/config.json';
import GlobalModal from '../screens/GlobalModal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import colours from './../assets/colours.json';
import LottieView from 'lottie-react-native';
import weatherIcons from './../assets/icons.json';
import { Ionicons } from '@expo/vector-icons';

// firebase
import { withFirebaseHOC } from '../config/Firebase';
import Firebase, { FirebaseProvider } from '../config/Firebase';

// set up auth key for google data
const geo = configData.GEO;

// moment set up
var moment = require('moment');

// group 2xx: thunderstorm
const thunderStorm = require('./../assets/animations/weather/thunderStorm.json');
// group 3xx: drizzle
const lightDrizzle = require('./../assets/animations/weather/lightDrizzle.json');
// group 5xx: rain
const lightRain = require('./../assets/animations/weather/lightRain.json');
// group 6xx: snow
const snow = require('./../assets/animations/weather/snow.json');
// group 7xx: atmosphere
const mist = require('./../assets/animations/weather/mist.json');
// group 80x: clouds
const fewClouds = require('./../assets/animations/weather/fewClouds.json');
const fewCloudsNight = require('./../assets/animations/weather/fewCloudsNight.json');
const brokenClouds = require('./../assets/animations/weather/brokenClouds.json');
const brokenCloudsNight = require('./../assets/animations/weather/brokenCloudsNight.json');
const scatteredClouds = require('./../assets/animations/weather/scatteredClouds.json');
const scatteredCloudsNight = require('./../assets/animations/weather/scatteredCloudsNight.json');
const overcastClouds = require('./../assets/animations/weather/overcastClouds.json');
const overcastCloudsNight = require('./../assets/animations/weather/overcastCloudsNight.json');
// group 800: clear
const dayClear = require('./../assets/animations/weather/dayClear.json');
const nightClear = require('./../assets/animations/weather/nightClear.json');

// capitalize first char
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// remove last char
String.prototype.cutString = function () {
  return this.substring(0, this.length - 1);
}

// START Current
class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // autocomplete information
      googleLat: '',
      googleLng: '',
      googleName: '',
      // get current date
      currentDate: new Date(),
      // placeholder clear
      placeholder: this.props.currentLocation,
      // google places listview
      listViewDisplayed: true,
    };
    this.updateSkyData = this.updateSkyData.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }

  renderSunDetails() {
    // Set up local timestamp for sunrise/sunset
    var sunsetTimeStamp = this.props.sunset,
      sunriseTimeStamp = this.props.sunrise,
      daylightOffset = this.props.dstOffsetSunset,
      utcOffset = this.props.rawOffsetSunset

    var sunsetTime = (sunsetTimeStamp + daylightOffset + utcOffset);
    var sunriseTime = (sunriseTimeStamp + daylightOffset + utcOffset);

    console.log(this.props.timeZoneId);
    console.log(this.props.timeZoneName);

    console.log('Sunset ' + sunsetTimeStamp);
    console.log('Sunrise ' + sunriseTimeStamp);
    console.log('Daylight offset ' + daylightOffset);
    console.log('UTC offset ' + utcOffset);

    console.log('Sunset ADDED ' + sunsetTime);
    console.log('Sunrise ADDED ' + sunriseTime);

    var sunrise = moment.unix(sunriseTime).format('HH:mm');
    var sunset = moment.unix(sunsetTime).format('HH:mm');

    // var newSunset = moment(finalSunset).format('HH:mm:ss');
    // console.log(newSunset)

    // Change sun details based on night or day
    let sunDisplay;
    if (this.props.night === true) {
      sunDisplay = (
        <View style={currentStyles.currentDetailsWrap}>
          <Text
            style={{
              fontFamily: 'weatherfont',
              fontSize: 18,
              color: colours.spotYellow
            }}>
            {weatherIcons.sunrise.code}
          </Text>
          <Text style={currentStyles.currentDetails}>
            {'  '}Sunrise at {sunrise}
          </Text>
        </View>
      );
    } else {
      sunDisplay = (
        <View style={currentStyles.currentDetailsWrap}>
          <Text
            style={{
              fontFamily: 'weatherfont',
              fontSize: 18,
              color: colours.spotYellow
            }}>
            {weatherIcons.sunset.code}
          </Text>
          <Text style={currentStyles.currentDetails}>
            {'  '}Sunset at {sunset}
          </Text>
        </View>
      );
    }
    return sunDisplay;
  }

  // keyboard did mount function
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  // keyboard will un-mount function
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  // keyboard shown
  _keyboardDidShow() {
    this.setState({
      placeholder: 'Enter location . . .',
      listViewDisplayed: true
    });
  }

  // keyboard hidden
  _keyboardDidHide() {
    this.setState({
      placeholder: this.props.currentLocation,
      listViewDisplayed: false
    });
  }

  // update sky data function
  updateSkyData() {
    console.log('Inside updateSkyData from Current.js...');
    var options = {
      googleLat: this.state.googleLat,
      googleLng: this.state.googleLng,
      googleName: this.state.googleName
    };
    console.log(options);
    this.props.updateSkyData(options);
  }

  // START render Current
  render() {
    console.log('Inside render from Current.js...');

    // set up weather code
    var weatherCode = this.props.weatherCode;

    console.log('weatherCode from Current.js ' + weatherCode);

    // set up icon display
    let currentWeatherIcon;

    // weather icon logic
    // group 2xx: thunderstorm
    if (weatherCode >= 200 && weatherCode <= 232) {
      currentWeatherIcon = thunderStorm;
      // group 3xx: drizzle
    } else if (
      (weatherCode) >= 300 &&
      (weatherCode) <= 321
    ) {
      currentWeatherIcon = lightDrizzle;
      // group 5xx: rain
    } else if (
      (weatherCode) >= 500 &&
      (weatherCode) <= 531
    ) {
      currentWeatherIcon = lightRain;
      // group 6xx: snow
    } else if (
      (weatherCode) >= 600 &&
      (weatherCode) <= 622
    ) {
      currentWeatherIcon = snow;
      // group 7xx: atmosphere
    } else if (
      (weatherCode) >= 701 &&
      (weatherCode) <= 781
    ) {
      currentWeatherIcon = mist;
      // group 80x: clouds
    } else if ((weatherCode === 801) && (this.props.night === true)) {
      currentWeatherIcon = fewCloudsNight;
    } else if ((weatherCode === 801) && (this.props.night === false)) {
      currentWeatherIcon = fewClouds;
    } else if ((weatherCode === 802) && (this.props.night === true)) {
      currentWeatherIcon = scatteredCloudsNight;
    } else if ((weatherCode === 802) && (this.props.night === false)) {
      currentWeatherIcon = scatteredClouds;
    } else if ((weatherCode === 803) && (this.props.night === true)) {
      currentWeatherIcon = brokenCloudsNight;
    } else if ((weatherCode === 803) && (this.props.night === false)) {
      currentWeatherIcon = brokenClouds;
    } else if ((weatherCode === 804) && (this.props.night === true)) {
      currentWeatherIcon = overcastCloudsNight;
    } else if ((weatherCode === 804) && (this.props.night === false)) {
      currentWeatherIcon = overcastClouds;
      // group 800: clear
    } else if ((weatherCode === 800) && (this.props.night === true)) {
      currentWeatherIcon = nightClear
    } else {
      currentWeatherIcon = dayClear;
    }

    // set up date constants
    const today = this.state.currentDate;
    const day = moment(today).format('dddd,');
    const date = moment(today).format('MMMM D');
    const year = moment(today).format('YYYY');

    // set up colour bg variables
    var colourBg = this.props.currentBg;
    var colourBarBg = this.props.currentBarBg;

    console.log(this.props.openWeather.list[2].dt_txt);
    console.log(this.props.openWeather.list[5].dt_txt);
    console.log(this.props.openWeather.list[14].dt_txt);

    return (
      <SafeAreaView
        keyboardShouldPersistTaps='handled'
        style={currentStyles.currentWrap}>

        {/* autocomplete input */}
        <GooglePlacesAutocomplete
          keyboardShouldPersistTaps='handled'
          placeholder={this.state.placeholder}
          placeholderTextColor={colours.white}
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          listViewDisplayed={this.state.listViewDisplayed}
          fetchDetails={true}
          renderDescription={(row) => row.description}
          onPress={(data, details = null) => {
            // fix google names
            var updatedAddress = details.formatted_address.replace(/^[\s\d]+/, '');
            this.setState({
              // set state with google details
              googleLat: details.geometry.location.lat.toFixed(5),
              googleLng: details.geometry.location.lng.toFixed(5),
              googleName: updatedAddress
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
              backgroundColor: colourBarBg,
              height: 50,
              width: '100%'
            },
            textInput: {
              alignItems: 'center',
              backgroundColor: colourBarBg,
              borderRadius: 0,
              borderTopColor: colours.spotGreyMed,
              borderTopWidth: 0,
              color: colours.white,
              height: 50,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              fontFamily: 'allerLt',
              fontSize: 18,
              textAlign: 'center',
              zIndex: 1
            },
            description: {
              alignItems: 'center',
              color: colours.white,
              fontFamily: 'allerLt',
              textAlign: 'center'
            },
            listView: {
              backgroundColor: colourBarBg,
              color: colours.white,
              fontFamily: 'allerLt',
              fontSize: 18,
              position: 'absolute',
              top: 50,
              elevation: 1
            },
            predefinedPlacesDescription: {
              color: colours.white,
              fontFamily: 'allerLt',
              fontSize: 18
            },
            separator: {
              backgroundColor: colourBg,
              height: 2
            }
          }}
          // google options
          currentLocation={false}
          currentLocationLabel='Current location'
          nearbyPlacesAPI='GooglePlacesSearch'
          GooglePlacesDetailsQuery={{
            fields: 'geometry,formatted_address'
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3'
          ]}
          debounce={100}
        />

        {/* add location button */}
        <View style={{
          zIndex: 2,
          position: 'absolute',
          top: 0,
          right: 0,
          width: '10%',
          height: 50,
          overflow: 'visible',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colourBarBg,
          borderTopColor: colours.spotGrey,
          borderTopWidth: 0.5
        }}>
          {/* globalmodal */}
          <FirebaseProvider value={Firebase}>
            <GlobalModal
              handleFail={this.handleFail}
              handleSuccess={this.handleSuccess}
              navigation={this.props.navigation}
              currentLocation={this.props.currentLocation}
              currentLat={this.props.currentLat}
              currentLng={this.props.currentLng}
            />
          </FirebaseProvider>
        </View>

        <View style={currentStyles.currentIconWrap}>
          {/* main icon */}
          <LottieView
            style={{
              height: 215,
              width: 215
            }}
            ref={animation => {
              this.animation = animation;
            }}
            source={currentWeatherIcon}
            autoPlay={true}
          />
        </View>

        <View style={currentStyles.currentTempWrap}>
          {/* low temp */}
          <View>
            <Text style={currentStyles.currentTempLow}>
              {/* down arrow */}
              <Ionicons name="ios-arrow-round-down" size={30}
                color={colours.white} />{' '}
              {this.props.low}°
            </Text>
          </View>
          {/* current temp */}
          <Text style={currentStyles.currentTemp}> {this.props.temp}°</Text>
          {/* high temp */}
          <View>
            <Text style={currentStyles.currentTempHigh}>
              {/* up arrow */}
              <Ionicons name="ios-arrow-round-up" size={30}
                color={colours.white} />{' '}
              {this.props.high}°
            </Text>
          </View>
        </View>

        {/* date display */}
        <Text style={currentStyles.currentDateText}>
          {day} {date}, {year}
        </Text>

        {/* Current description */}
        <Text style={currentStyles.currentDesc}>
          Currently {this.props.temp}° with {this.props.desc}
        </Text>

        <Collapse>
          {/* collapse header */}
          <CollapseHeader style={{ marginBottom: 15, marginTop: 5 }}>
            <View style={{ alignItems: 'center' }}>
              {/* more details */}
              <Text
                style={{
                  justifyContent: 'center',
                  fontSize: 18,
                  fontFamily: 'allerBd',
                  color: colours.spotYellow
                }}>
                <Ionicons
                  name='ios-arrow-down'
                  size={19}
                  color={colours.spotYellow}
                />{' '}{' '}
                More Details
              </Text>
            </View>
          </CollapseHeader>

          {/* collapse body */}
          <CollapseBody style={{
            backgroundColor: colourBarBg,
            marginBottom: 15
          }}>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: colours.spotGreyDarkTrans,
              padding: 15
            }}>
              <Text style={currentStyles.currentSecondaryInfoHeading}>
                Morning</Text>
              <Text style={currentStyles.currentSecondaryInfoHeading}>
                Afternoon</Text>
              <Text style={currentStyles.currentSecondaryInfoHeading}>
                Evening</Text>
            </View>

            {/* morning afternoon evening */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: colours.spotGreyTrans,
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 15,
              paddingTop: 5
            }}>
              {/* Morning */}
              <Text
                style={{
                  fontFamily: 'weatherfont',
                  fontSize: 45,
                  textAlign: 'center',
                  color: colours.white
                }}>
                {/* 6am */}
                {weatherIcons[this.props.openWeather.list[2].weather[0].id].code}
              </Text>

              {/* Afternoon */}
              <Text
                style={{
                  fontFamily: 'weatherfont',
                  fontSize: 45,
                  textAlign: 'center',
                  color: colours.white
                }}>
                {/* 3pm */}
                {weatherIcons[this.props.openWeather.list[5].weather[0].id].code}
              </Text>

              {/* Evening */}
              <Text
                style={{
                  fontFamily: 'weatherfont',
                  fontSize: 45,
                  textAlign: 'center',
                  color: colours.white
                }}>
                {/* 6pm */}
                {weatherIcons[this.props.openWeather.list[14].weather[0].id].code}
              </Text>
            </View>

            {/* daily summary */}
            <View style={{ padding: 10 }}>
              <Text style={currentStyles.currentDescSummaryBold}>
                <Ionicons
                  name='md-time'
                  size={19}
                  color={colours.white}
                /> {' '}Daily Summary
              </Text><Text style={currentStyles.currentDescSummary}>Feels like{' '}{Math.round(this.props.feelslike)}°,{' '}{this.props.skyWeather.daily.data[0].summary.cutString().toLowerCase()}{' '}with{' '}{Math.round(this.props.skyWeather.currently.windSpeed)} km/h wind and{' '}{this.props.humidity}% humidity</Text>
              {/* sun details */}
              {this.renderSunDetails()}
            </View>

          </CollapseBody>
        </Collapse>
      </SafeAreaView>
    );
  }
  // END render Current
}
// END Current

export default withFirebaseHOC(Current);

// style
const currentStyles = StyleSheet.create({
  currentWrap: {
    alignSelf: 'stretch',
    flex: 1
  },
  currentIconWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40
  },
  currentIconSmall: {
    alignSelf: 'center',
    height: 30,
    width: 30
  },
  currentTemp: {
    color: colours.white,
    fontSize: 70,
    fontFamily: 'allerDisplay',
    textAlign: 'center'
  },
  currentTempWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline'
  },
  currentWindHumWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  currentDetailsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8
  },
  currentDetails: {
    color: colours.white,
    fontSize: 18,
    fontFamily: 'allerRg'
  },
  currentTempHigh: {
    color: colours.white,
    fontSize: 30,
    fontFamily: 'allerLt',
    paddingBottom: 12
  },
  currentTempLow: {
    color: colours.white,
    fontSize: 30,
    fontFamily: 'allerLt',
    paddingBottom: 12
  },
  currentDesc: {
    color: colours.white,
    fontSize: 18,
    fontFamily: 'allerBd',
    padding: 10,
    textAlign: 'center'
  },
  currentDescSummary: {
    color: colours.white,
    fontSize: 19,
    lineHeight: 25,
    fontFamily: 'allerLt',
    textAlign: 'center'
  },
  currentDescSummaryBold: {
    color: colours.white,
    fontSize: 19,
    fontFamily: 'allerBd',
    textAlign: 'center',
    paddingBottom: 10
  },
  currentDateText: {
    color: colours.white,
    fontSize: 18,
    fontFamily: 'allerLt',
    padding: 10,
    paddingBottom: 0,
    textAlign: 'center',
    marginTop: 10
  },
  currentSecondaryInfoHeading: {
    color: colours.white,
    fontSize: 18,
    fontFamily: 'allerRg',
    textAlign: 'center'
  }
});