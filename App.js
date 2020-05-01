// imports
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  ScrollView,
  View
} from 'react-native';
import configData from './data/config.json';
import Header from './screens/Header';
import Current from './screens/Current';
import Week from './screens/Week';
import Footer from './screens/Footer';
import colours from './assets/colours.json';
import LottieView from 'lottie-react-native';

// firebase
import * as firebase from 'firebase';
import { withFirebaseHOC } from './config/Firebase';
import Firebase, { FirebaseProvider } from './config/Firebase';
import 'firebase/firestore';
import 'firebase/auth';

// firebase globals
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

// stylesheet
var styles = require('./styles.js');

// set up auth keys
const open = configData.OPEN;
const sky = configData.SKY;

// get device width
const window = Dimensions.get('window');

// set up image display variable
let imageBg;

const cloudyNightWeather = require('./assets/animations/weather/weather-cloudy-night.json');
const foggyWeather = require('./assets/animations/weather/weather-foggy.json');
const mistWeather = require('./assets/animations/weather/weather-mist.json');
const nightWeather = require('./assets/animations/weather/weather-night.json');
const partlyCloudyWeather = require('./assets/animations/weather/weather-partly-cloudy.json');
const partlyShowerWeather = require('./assets/animations/weather/weather-partly-shower.json');
const rainyNightWeather = require('./assets/animations/weather/weather-rainy-night.json');
const snowNightWeather = require('./assets/animations/weather/weather-snow-night.json');
const snowSunnyWeather = require('./assets/animations/weather/weather-snow-sunny.json');
const snowWeather = require('./assets/animations/weather/weather-snow.json');
const stormShowersDayWeather = require('./assets/animations/weather/weather-storm-showers-day.json');
const stormWeather = require('./assets/animations/weather/weather-storm.json');
const sunnyWeather = require('./assets/animations/weather/weather-sunny.json');
const thunderWeather = require('./assets/animations/weather/weather-thunder.json');
const windyWeather = require('./assets/animations/weather/weather-windy.json');

// START App
class App extends Component {
  // control requests
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      // loading screen
      isLoaded: false,
      // fonts
      fontLoaded: false,
      // sky weather
      skyWeather: [],
      // open weather daily data array
      weather: [],
      // open weather current data array and id
      openWeather: [],
      openWeatherId: null,
      // error message
      errorMessage: null,
      // current weather and location data
      currentIcon: '',
      currentLat: null,
      currentLng: null,
      currentLocation: null,
      // weather and location data
      location: '',
      desc: '',
      temp: '',
      high: '',
      low: '',
      humidity: '',
      wind: '',
      icon: '',
      sunset: '',
      // colour background
      weekBg: null,
      weekBarBg: null
    };
    // bind functions to state
    this.handleLoaded = this.handleLoaded.bind(this);
    this.updateSkyData = this.updateSkyData.bind(this);
    this.getSkyData = this.getSkyData.bind(this);
    this.nightOrDay = this.nightOrDay.bind(this);
    this.setBgDay = this.setBgDay.bind(this);
    this.setBgNight = this.setBgNight.bind(this);
    this.fallback = this.fallback.bind(this);
  }

  // handle loading
  handleLoaded = () => {
    console.log('Inside handleLoaded from App.js...');
    this.setState({
      isLoaded: true
    }, () => {
      console.log('App loaded: ' + this.state.isLoaded);
    });
  }

  // update sky data function
  updateSkyData(val) {
    console.log('Inside updateSkyData from App.js...');
    console.log(val);
    this.setState({
      isLoaded: false,
      currentLat: val['googleLat'],
      currentLng: val['googleLng'],
      currentLocation: val['googleName']
    },
      // call sky data function with new values
      this.getSkyData);
  }

  // fallback function
  fallback() {
    this.setState({
      // fallback
      currentLocation: 'Wellington, New Zealand',
      currentLat: -41.2865,
      currentLng: 174.7762
    }, this.getSkyData);
  }

  // START component mounted
  componentDidMount() {
    // set component mounted
    this._isMounted = true;
    console.log('Inside componentDidMount from App.js: Mounted = ' + this._isMounted);
    // check firebase for user
    var user = firebase.auth().currentUser;
    if (user) {
      // user is signed in
      // load firebase data
      const db = firebase.firestore();
      const dbRT = firebase.database();
      const ref = dbRT.ref(user.uid);
      const homeRef = ref.child("home");
      var docRef = db.collection("users").doc(user.uid);
      // check if the signed in user has data saved
      docRef.get().then(function (doc) {
        if (doc.exists) {
          console.log("User", doc.data().name, "is logged in");
        } else {
          console.log("No docs exist...");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
      // get signed in users saved data on load
      homeRef.on('value', snapshot => {
        if (snapshot.exists()) {
          let home = snapshot.val();
          console.log(home);
          var homeLat = home.lat;
          var homeLng = home.lng;
          var homeLocation = home.location;
          this.setState({
            currentLat: homeLat,
            currentLng: homeLng,
            currentLocation: homeLocation
          }, this.getSkyData);
        } else {
          console.log('No home saved...');
        }
      })
      // no user
    } else {
      console.log('No user is currently logged in...');
      // run fallback function
      this.fallback();
    }
  }
  // END component mounted

  // START sky data function
  getSkyData() {
    var myLat = this.state.currentLat;
    var myLng = this.state.currentLng;
    console.log('FROM getSkyData (App.js) ' + myLat);
    console.log('FROM getSkyData (App.js) ' + myLng);
    // fetch sky data
    fetch(
      'https://api.darksky.net/forecast/' +
      sky +
      '/' +
      myLat +
      ',' +
      myLng +
      '?units=si'
    )
      // log HTTP response error or success for data call
      .then((res) => {
        if (!res.ok) {
          throw new Error('DarkSky Failed with HTTP code ' + res.status);
        } else {
          console.log('DarkSky Success with HTTP code ' + res.status);
        }
        return res;
      })
      // convert raw data call into json
      .then((result) => result.json())
      .then((skyData) => {
        if (this._isMounted) {
          this.setState({
            skyWeather: skyData,
            temp: Math.round(skyData.currently.temperature),
            high: Math.round(skyData.daily.data[0].temperatureMax),
            low: Math.round(skyData.daily.data[0].temperatureMin)
          });
        }
      });
    // daily weather data
    fetch(
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      myLat +
      '&lon=' +
      myLng +
      '&units=metric&APPID=' +
      open
    )
      // log HTTP response error or success for data call
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            'Open Weather DAILY Failed with HTTP code ' + res.status
          );
        } else {
          console.log(
            'Open Weather DAILY Success with HTTP code ' + res.status
          );
        }
        return res;
      })
      // convert raw data call into json
      .then((result) => result.json())
      .then((data) => {
        if (this._isMounted) {
          this.setState({
            weather: data
          });
        }
        // current weather data
        fetch(
          'https://api.openweathermap.org/data/2.5/weather?lat=' +
          myLat +
          '&lon=' +
          myLng +
          '&units=metric&APPID=' +
          open
        )
          // log HTTP response error or success for data call
          .then((res) => {
            if (!res.ok) {
              throw new Error(
                'Open Weather CURRENT Failed with HTTP code ' + res.status
              );
            } else {
              console.log(
                'Open Weather CURRENT Success with HTTP code ' + res.status
              );
            }
            return res;
          })
          // convert raw data call into json
          .then((openResponse) => openResponse.json())
          .then((openResponseJson) => {
            if (this._isMounted) {
              this.setState(
                {
                  // weather wrapper
                  openWeather: openResponseJson,
                  // icon id
                  openWeatherId: openResponseJson.weather[0].id,
                  // weather and location data
                  desc: openResponseJson.weather[0].description,
                  humidity: openResponseJson.main.humidity,
                  wind: openResponseJson.wind.speed,
                  icon: openResponseJson.weather[0].icon,
                  sunset: openResponseJson.sys.sunset
                },
                () => {
                  this.nightOrDay();
                }
              );
            }
          });
      })
      // catch and log errors
      .catch((error) => {
        if (error.res) {
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('error ', error.message);
        }
        console.log(error.config);
      });
  }
  // END sky data fucntion

  // check night or day function
  nightOrDay() {
    console.log('Icon = ' + this.state.icon + ' from App.js');
    var conditions = ["01n", "02n"];
    var checkNight = conditions.some(e => this.state.icon.includes(e));
    console.log('Night = ' + checkNight + ' from App.js');
    if (checkNight === true) {
      this.setBgNight();
      console.log('Must be night...');
    } else {
      console.log('Must be day...');
      this.setBgDay();
    }
  }

  // night colour bg logic
  setBgNight() {
    console.log('Night function running...');
    imageBg = colours.night;
    this.setState({
      weekBg: colours.nightDark,
      weekBarBg: colours.night
    });
    this.handleLoaded();
  }

  // day colour bg logic
  setBgDay() {
    console.log(this.state.temp);
    console.log('Day function running...');
    // group 2xx: thunderstorm
    if (this.state.openWeatherId >= 200 && this.state.openWeatherId <= 232) {
      imageBg = colours.thunderStorm;
      this.setState({
        weekBg: colours.thunderStormDark,
        weekBarBg: colours.thunderStorm
      });
      // group 3xx: drizzle
    } else if (
      (this.state.openWeatherId) >= 300 &&
      (this.state.openWeatherId) <= 321
    ) {
      imageBg = colours.showerRain;
      this.setState({
        weekBg: colours.showerRainDark,
        weekBarBg: colours.showerRain
      });
      // group 5xx: rain
    } else if (
      (this.state.openWeatherId) >= 500 &&
      (this.state.openWeatherId) <= 531
    ) {
      imageBg = colours.rain;
      this.setState({
        weekBg: colours.rainDark,
        weekBarBg: colours.rain
      });
      // group 6xx: snow
    } else if (
      (this.state.openWeatherId) >= 600 &&
      (this.state.openWeatherId) <= 622
    ) {
      imageBg = colours.snow;
      this.setState({
        weekBg: colours.snowDark,
        weekBarBg: colours.snow
      });
      // group 7xx: atmosphere
    } else if (
      (this.state.openWeatherId) >= 701 &&
      (this.state.openWeatherId) <= 781
    ) {
      imageBg = colours.thunderStorm;
      this.setState({
        weekBg: colours.thunderStormDark,
        weekBarBg: colours.thunderStorm
      });
      // group 80x: scattered clouds
    } else if (
      (this.state.openWeatherId) >= 801 &&
      (this.state.openWeatherId) <= 802
    ) {
      imageBg = colours.scatteredClouds;
      this.setState({
        weekBg: colours.scatteredCloudsDark,
        weekBarBg: colours.scatteredClouds
      });
      // group 80x: broken clouds
    } else if (
      (this.state.openWeatherId) >= 803 &&
      (this.state.openWeatherId) <= 804
    ) {
      imageBg = colours.brokenClouds;
      this.setState({
        weekBg: colours.brokenCloudsDark,
        weekBarBg: colours.brokenClouds
      });
      // group 800: clear
    } else {
      imageBg = colours.clearSky;
      this.setState({
        weekBg: colours.clearSkyDark,
        weekBarBg: colours.clearSky
      });
    }
    this.handleLoaded();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // START render App
  render() {
    // declare loading variables in current state
    var { isLoaded } = this.state;

    // START loading function
    if (!isLoaded) {
      console.log('Inside RENDER NOT COMPLETE from App.js...');
      return (
        // START loading display
        <View style={styles.loader}>
          <LottieView
            style={{
              height: 250,
              width: 250,
            }}
            ref={animation => {
              this.animation = animation;
            }}
            source={require('./assets/animations/loader.json')}
            autoPlay={true}
          />
        </View>
        // END loading display
      );
      // END loading function
    } else {
      console.log('Inside RENDER COMPLETE from App.js...');
      return (
        // START main container
        <View
          keyboardShouldPersistTaps='handled'
          style={{ alignItems: 'center', backgroundColor: colours.simpleWeather, flex: 1 }}>
          {/* top bar */}
          <View style={styles.headerTopBar} />
          <ScrollView
            loop={false}
            width={window.width}
            keyboardShouldPersistTaps='handled'
            showsButtons={false}
            horizontal={false}
            showsPagination={false}>
            {/* header */}
            <FirebaseProvider value={Firebase}>
              <Header
                navigation={this.props.navigation}
                currentLocation={this.state.currentLocation}
                updateSkyData={this.updateSkyData}
                currentLat={this.state.currentLat}
                currentLng={this.state.currentLng}
                currentBg={this.state.weekBg}
              />
              {/* current */}
              <View style={{ backgroundColor: imageBg }}>
                <Current
                  navigation={this.props.navigation}
                  keyboardShouldPersistTaps='handled'
                  weatherCode={this.state.openWeatherId}
                  currentBg={this.state.weekBg}
                  updateSkyData={this.updateSkyData}
                  errorMessage={this.state.errorMessag}
                  currentLocation={this.state.currentLocation}
                  currentLat={this.state.currentLat}
                  currentLng={this.state.currentLng}
                  wind={this.state.wind}
                  humidity={this.state.humidity}
                  temp={this.state.temp}
                  high={this.state.high}
                  low={this.state.low}
                  desc={this.state.desc}
                  icon={this.state.icon}
                  sunset={this.state.sunset}
                  skyWeather={this.state.skyWeather}
                />
              </View>
            </FirebaseProvider>
            {/* week */}
            <Week
              style={{ backgroundColor: imageBg }}
              weekBg={this.state.weekBg}
              weekBarBg={this.state.weekBarBg}
              weatherCode={this.state.openWeatherId}
              weather={this.state.weather.list}
              skyWeather={this.state.skyWeather.daily.data}
            />
            {/* footer */}
            <Footer />
          </ScrollView>
        </View>
        // END main container
      );
    }
  }
  // END render App
}
// END App

export default withFirebaseHOC(App);

// register button functionality
AppRegistry.registerComponent('basic-weather', () => ButtonBasics);

// register swiper functionality
AppRegistry.registerComponent('basic-weather', () => SwiperComponent);
