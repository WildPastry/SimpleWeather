// imports
import React, { Component } from 'react';
import { Text, Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
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

// set up auth key for sky data
const geo = configData.GEO;

// moment set up
var moment = require('moment');

// group 2xx: thunderstorm
const lightningStorm = require('./../assets/animations/weather/lightningStorm.json');
// group 3xx: drizzle
// group 5xx: rain
const lightRain = require('./../assets/animations/weather/lightRain.json');
// group 6xx: snow
const snow = require('./../assets/animations/weather/snow.json');
// group 7xx: atmosphere
const mist = require('./../assets/animations/weather/mist.json');
// group 80x: clouds
const fewClouds = require('./../assets/animations/weather/fewClouds.json');
const brokenClouds = require('./../assets/animations/weather/brokenClouds.json');
const scatteredClouds = require('./../assets/animations/weather/scatteredClouds.json');
const overcastClouds = require('./../assets/animations/weather/overcastClouds.json');
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
    // clear countdown
    // clearInterval(this.countDown);
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
    // night
    if (this.props.night === true) {
      currentWeatherIcon = nightClear
    } else
      // group 2xx: thunderstorm
      if (weatherCode >= 200 && weatherCode <= 232) {
        currentWeatherIcon = lightningStorm;
        // group 3xx: drizzle
      } else if (
        (weatherCode) >= 300 &&
        (weatherCode) <= 321
      ) {
        currentWeatherIcon = lightRain;
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
      } else if (weatherCode === 801) {
        currentWeatherIcon = fewClouds;
      } else if (weatherCode === 802) {
        currentWeatherIcon = scatteredClouds;
      } else if (weatherCode === 803) {
        currentWeatherIcon = brokenClouds;
      } else if (weatherCode === 804) {
        currentWeatherIcon = overcastClouds;
        // group 800: clear
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

    // set up sunset time formats
    var todaySun = moment.unix(this.props.sunset);
    var dateSun = moment(todaySun).format('HH:MM');

    return (
      <SafeAreaView
        keyboardShouldPersistTaps='handled'
        style={currentStyles.currentWrap}>

        {/* START autocomplete input */}
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
            // fix google names with numbers in front
            var updatedAddress = details.formatted_address.replace(/^[\s\d]+/, '');
            this.setState({
              // set state with google details
              googleLat: details.geometry.location.lat.toFixed(5),
              googleLng: details.geometry.location.lng.toFixed(5),
              googleName: updatedAddress
            });
            // // update sky data function
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
        {/* END autocomplete input */}

        {/* START add location button */}
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
        {/* END add location button */}

        {/* START main icon */}
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
        {/* END main icon */}

        {/* START temps */}
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
        {/* END temps */}

        {/* START date display */}
        <Text style={currentStyles.currentDateText}>
          {day} {date}, {year}
        </Text>
        {/* END date display */}

        {/* START description */}
        {/* Current description */}
        <Text style={currentStyles.currentDesc}>
          Currently {this.props.temp}° with {this.props.desc}
          {/* {this.props.skyWeather.hourly.summary.cutString()} */}
          {/* Daily summary: {this.props.skyWeather.daily.data[0].summary.cutString()} */}
          {/* {this.props.skyWeather.currently.summary.toLowerCase().capitalize()} */}
        </Text>

        {/* feels like */}
        {/* <Text style={currentStyles.currentDescSummary}>
          <Ionicons
            name='ios-snow'
            size={19}
            color={colours.white}
          />{' '}
          Feels like {Math.round(this.props.feelslike)}° 
          with {Math.round(this.props.skyWeather.currently.visibility)}km visibility
        </Text> */}

        {/* daily summary */}
        <Text style={currentStyles.currentDescSummary}>
          <Ionicons
            name='md-time'
            size={19}
            color={colours.white}
          />{' '}
          {/* Daily summary: */}
          {this.props.skyWeather.daily.data[0].summary.cutString()}
          {/* Currently {this.props.temp}° with {this.props.desc} */}
        </Text>
        {/* END description */}

        <Collapse>
          {/* collapse header */}
          <CollapseHeader style={{ marginBottom: 10 }}>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  justifyContent: 'center',
                  fontSize: 18,
                  fontFamily: 'allerRg',
                  color: colours.spotYellow
                }}>
                {/* chevron icon */}
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
          <CollapseBody style={{ backgroundColor: colourBarBg, marginBottom: 15 }}>
            {/* START morning afternoon evening */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: colours.spotGreyMed,
              marginTop: 5,
              marginBottom: 5,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10
            }}>
              {/* Morning */}
              <View>
                <Text style={currentStyles.currentSecondaryInfoHeading}>
                  Morning
            </Text>
                <Text
                  style={{
                    fontFamily: 'weatherfont',
                    fontSize: 45,
                    textAlign: 'center',
                    color: colours.white
                  }}>
                  {weatherIcons[this.props.openWeather.list[0].weather[0].id].code}
                  {/* <Text>{Math.round(this.props.openWeather.list[0].main.temp)}°</Text> */}
                </Text>
              </View>

              {/* Afternoon */}
              <View>
                <Text style={currentStyles.currentSecondaryInfoHeading}>
                  Afternoon
            </Text>
                <Text
                  style={{
                    fontFamily: 'weatherfont',
                    fontSize: 45,
                    textAlign: 'center',
                    color: colours.white
                  }}>
                  {weatherIcons[this.props.openWeather.list[1].weather[0].id].code}
                </Text>
              </View>

              {/* Evening */}
              <View>
                <Text style={currentStyles.currentSecondaryInfoHeading}>
                  Evening
            </Text>
                <Text
                  style={{
                    fontFamily: 'weatherfont',
                    fontSize: 45,
                    textAlign: 'center',
                    color: colours.white
                  }}>
                  {weatherIcons[this.props.openWeather.list[2].weather[0].id].code}
                </Text>
              </View>
            </View>
            {/* END morning afternoon evening */}

            {/* START sun wind humidity */}
            <View style={currentStyles.currentWindHumWrap}>
              {/* sunset */}
              {/* <View style={currentStyles.currentDetailsWrap}>
                <Text
                  style={{
                    fontFamily: 'weatherfont',
                    fontSize: 24,
                    textAlign: 'center',
                    color: colours.white
                  }}>
                  {weatherIcons.sunset.code}
                </Text>
                <Text style={currentStyles.currentDetails}>
                  {'  '}
                  {dateSun}
                </Text>
              </View> */}
              {/* wind     */}
              <View style={currentStyles.currentDetailsWrap}>
                <Text
                  style={{
                    fontFamily: 'weatherfont',
                    fontSize: 24,
                    textAlign: 'center',
                    color: colours.white
                  }}>
                  {weatherIcons.windSpeed.code}
                </Text>
                <Text style={currentStyles.currentDetails}>
                  {'  '}
                  {Math.round(this.props.skyWeather.currently.windSpeed)} km/h
            </Text>
              </View>
              {/* humidity     */}
              <View style={currentStyles.currentDetailsWrap}>
                <Text
                  style={{
                    fontFamily: 'weatherfont',
                    fontSize: 24,
                    textAlign: 'center',
                    color: colours.white
                  }}>
                  {weatherIcons.humidity.code}
                </Text>
                <Text style={currentStyles.currentDetails}>
                  {'  '}
                  {this.props.humidity}%
            </Text>
              </View>
            </View>
            {/* END sun wind humidity */}

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
    marginTop: 60
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
    justifyContent: 'space-around',
    marginBottom: 4
  },
  currentDetailsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8
  },
  currentDetails: {
    color: colours.white,
    fontSize: 18,
    fontFamily: 'allerLt',
    paddingTop: 4
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
    fontSize: 19,
    fontFamily: 'allerBd',
    padding: 10,
    textAlign: 'center'
  },
  currentDescSummary: {
    color: colours.white,
    fontSize: 18,
    fontFamily: 'allerLt',
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