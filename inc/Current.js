// imports
import React, { Component } from 'react';
import { Text, Keyboard, SafeAreaView, View } from 'react-native';
import configData from './../data/config.json';
import GlobalModal from '../screens/GlobalModal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colours from './../assets/colours.json';
import LottieView from 'lottie-react-native';
import weatherIcons from './../assets/icons.json';
import nightWeatherIcons from './../assets/nightIcons.json';
import { Ionicons } from '@expo/vector-icons';
import weather from './../assets/animations/weather.json';

// firebase
import { withFirebaseHOC } from '../config/Firebase';
import Firebase, { FirebaseProvider } from '../config/Firebase';

// set up auth key for sky data
const geo = configData.GEO;

// stylesheet
var styles = require('../styles.js');

// moment set up
var moment = require('moment');

// countdown set up
// var countdown;

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
    // call countdown function
    // this.countDown = setInterval(() => {
    //   this.startCountDown();
    // }, 1000);
  }

  // start countdown function
  // startCountDown = () => {
  //   var sunSetTime = this.props.sunset;
  //   var sunTimer = new Date(sunSetTime * 1000).toString();
  //   var sunTimerShort = sunTimer.slice(0, 24);
  //   var countDownDate = new Date(sunTimerShort).getTime();
  //   var now = new Date().getTime();
  //   var distance = countDownDate - now;
  //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //   // getCountdown.innerHTML = "<h1>" + hours + " : " +
  //   //   minutes + " : " + seconds + " " + "</h1>";
  //   console.log(hours + minutes + seconds);
  //   // if (distance < 0) {
  //   //   clearInterval(countDown);
  //   //   getCountdown.innerHTML = "<h1>" + "Expired" + "</h1>";
  //   // }
  // }

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

    // check night or day
    var isNightOrDay = this.props.icon.includes('02n');

    // night or day function
    console.log('Night = ' + isNightOrDay + ' from Current.js');
    // weather icon logic
    // night
    if (isNightOrDay === true) {
      currentWeatherIcon = weather.weatherNight
    } else
      // group 2xx: thunderstorm
      if (weatherCode >= 200 && weatherCode <= 232) {
        currentWeatherIcon = weather.weatherStorm;
        // group 3xx: drizzle
      } else if (
        (weatherCode) >= 300 &&
        (weatherCode) <= 321
      ) {
        currentWeatherIcon = weather.weatherPartlyShower;
        // group 5xx: rain
      } else if (
        (weatherCode) >= 500 &&
        (weatherCode) <= 531
      ) {
        currentWeatherIcon = weather.weatherPartlyShower;
        // group 6xx: snow
      } else if (
        (weatherCode) >= 600 &&
        (weatherCode) <= 622
      ) {
        currentWeatherIcon = weather.weatherSnow;
        // group 7xx: atmosphere
      } else if (
        (weatherCode) >= 701 &&
        (weatherCode) <= 781
      ) {
        currentWeatherIcon = weather.weatherFoggy;
        // group 80x: scattered clouds
      } else if (
        (weatherCode) >= 801 &&
        (weatherCode) <= 802
      ) {
        currentWeatherIcon = weather.weatherPartlyCloudy;
        // group 80x: broken clouds
      } else if (
        (weatherCode) >= 803 &&
        (weatherCode) <= 804
      ) {
        currentWeatherIcon = weather.weatherPartlyCloudy;
        // group 800: clear
      } else {
        currentWeatherIcon = weather.weatherSunny;
      }

    // set up date constants
    const today = this.state.currentDate;
    const day = moment(today).format('dddd,');
    const date = moment(today).format('MMMM D');

    console.log(today)
    // set up colour bg variable
    var colourBg = this.props.currentBg;

    // countdown function
    // clearInterval(countDown);
    // clearInterval(countDown);
    // set up countdown
    // countdown set up
    // var sunSetTime = this.props.sunset;
    // var sunTimer = new Date(sunSetTime * 1000).toString();
    // var sunTimerShort = sunTimer.slice(0, 24);
    // var countDownDate = new Date(sunTimerShort).getTime();

    // console.log(countDownDate);
    // var todaySun = moment.unix(this.props.sunset);
    // var dateSun = moment(todaySun).format('HH:MM');

    // console.log('Time of sunset: ' + this.props.sunset);
    // console.log('Current time: ' + moment().unix());

    // console.log(dateSun);
    // console.log(this.props.sunset);

    // console.log(this.props.skyWeather.currently);
    // console.log(this.props.skyWeather.daily.data[0]);
    // console.log(this.props.skyWeather.hourly.data);

    // {
    //   this.props.skyWeather.hourly.data.map((hourlyData) => {
    //     console.log(moment(hourlyData.time).format('HH:MM:SSSS'));
    //   });
    // }

    return (
      <SafeAreaView
        keyboardShouldPersistTaps='handled'
        style={styles.currentWrap}>

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
            // console.log(details);
            // console.log(details.formatted_address);
            // console.log(details.address_components[1].long_name);
            // console.log(details.address_components[2].long_name);
            // fix google names with numbers in front
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
              backgroundColor: colourBg,
              height: 50,
              width: '100%'
            },
            textInput: {
              alignItems: 'center',
              backgroundColor: colourBg,
              borderRadius: 0,
              borderTopColor: colours.simpleWeather,
              borderTopWidth: 0,
              color: colours.white,
              height: 50,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              fontFamily: 'allerLt',
              fontSize: 19,
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
              backgroundColor: colourBg,
              color: colours.white,
              fontFamily: 'allerLt',
              fontSize: 19,
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
          backgroundColor: colourBg
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
        <View style={styles.currentIconWrap}>
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
        <View style={styles.currentTempWrap}>
          {/* low temp */}
          <View>
            <Text style={styles.currentTempLow}>
              {/* down arrow */}
              <Ionicons name="ios-arrow-round-down" size={30}
                color={colours.white} />{' '}
              {this.props.low}°
            </Text>
          </View>
          {/* current temp */}
          <Text style={styles.currentTemp}> {this.props.temp}°</Text>
          {/* high temp */}
          <View>
            <Text style={styles.currentTempHigh}>
              {/* up arrow */}
              <Ionicons name="ios-arrow-round-up" size={30}
                color={colours.white} />{' '}
              {this.props.high}°
            </Text>
          </View>
        </View>
        {/* END temps */}

        {/* START date display */}
        <Text style={styles.dateText}>
          {day} {date}
        </Text>
        {/* END date display */}

        {/* START description */}
        {/* Current description */}
        <Text style={styles.currentDesc}>
          Right now it's {this.props.temp}° with {this.props.desc}
        </Text>
        {/* Hourly description */}
        <Text style={styles.currentDescSummary}>
          Hourly summary - {this.props.skyWeather.hourly.data[0].summary.toLowerCase()}
        </Text>
        {/* END description */}

        {/* START wind and humidity */}
        <View style={styles.currentWindHumWrap}>
          <View style={styles.currentDetailsWrap}>
            <Text
              style={{
                fontFamily: 'weatherfont',
                fontSize: 24,
                textAlign: 'center',
                color: colours.white
              }}>
              {weatherIcons.windSpeed.code}
            </Text>
            <Text style={styles.currentDetails}>
              {'  '}
              {Math.round(this.props.wind)} km/h
            </Text>
          </View>
          <View style={styles.currentDetailsWrap}>
            <Text
              style={{
                fontFamily: 'weatherfont',
                fontSize: 24,
                textAlign: 'center',
                color: colours.white
              }}>
              {weatherIcons.humidity.code}
            </Text>
            <Text style={styles.currentDetails}>
              {'  '}
              {this.props.humidity}
            </Text>
          </View>
        </View>
        {/* END wind and humidity */}

      </SafeAreaView>
    );
  }
  // END render Current
}
// END Current

export default withFirebaseHOC(Current);
