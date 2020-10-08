// imports
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  ScrollView,
  StyleSheet,
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
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

// set up auth keys
const open = configData.OPEN, sky = configData.SKY, geo = configData.GEO;

// set up URLS
const darkURL = configData.DARKURL, openWeekURL = configData.OPENWEEKURL, openCurrentURL = configData.OPENCURRENTURL, timezoneURL = configData.TIMEZONEURL;

// get device width
const window = Dimensions.get('window');

// set up image display variables
let imageBg;

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
      // open weather weekly data array
      openWeekWeather: [],
      // open weather current data array and id
      openWeather: [],
      openWeatherId: null,
      // current weather and location data
      currentIcon: '',
      currentLat: null,
      currentLng: null,
      currentLocation: null,
      // weather and location data
      location: '', desc: '', temp: '', high: '', low: '',
      humidity: '', wind: '', icon: '', sunset: '', sunrise: '', feelslike: '',
      // timezone data
      dstOffset: '',
      rawOffset: '',
      timeZoneId: '',
      timeZoneName: '',
      // colour background
      weekBg: null,
      weekBarBg: null,
      weekBarBgDarker: null,
      weekBarBgDarkest: null,
      // night or day
      night: false
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
      currentLat: val['googleLat'], currentLng: val['googleLng'], currentLocation: val['googleName']
    },
      // call sky data function with new values
      this.getSkyData);
  }

  // fallback function
  fallback() {
    this.setState({
      // fallback
      currentLocation: 'Wellington, New Zealand', currentLat: -41.2865, currentLng: 174.7762
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
      const db = firebase.firestore(), dbRT = firebase.database(), ref = dbRT.ref(user.uid), homeRef = ref.child("home");
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
          var homeLat = home.lat, homeLng = home.lng, homeLocation = home.location;
          this.setState({
            currentLat: homeLat,
            currentLng: homeLng,
            currentLocation: homeLocation
          }, this.getSkyData);
        } else {
          console.log('No home saved...');
                // run fallback function
      this.fallback();
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
    var myLat = this.state.currentLat, myLng = this.state.currentLng;
    // promise all data
    Promise.all([
      fetch(darkURL + sky + '/' + myLat + ',' + myLng + '?units=ca'),
      fetch(openCurrentURL + myLat + '&lon=' + myLng + '&units=metric&APPID=' + open),
      fetch(openWeekURL + myLat + '&lon=' + myLng + '&units=metric&APPID=' + open)
    ])
      // set json
      .then(([skyData, openCurrentData, openWeekData]) => {
        return Promise.all([skyData.json(), openCurrentData.json(), openWeekData.json()])
      })
      // set state
      .then(([skyData, openCurrentData, openWeekData]) => {
        if (this._isMounted) {
          this.setState({
            // skyData
            skyWeather: skyData,
            temp: Math.round(skyData.currently.temperature),
            high: Math.round(skyData.daily.data[0].temperatureMax),
            low: Math.round(skyData.daily.data[0].temperatureMin),
            // openCurrentData
            openWeather: openCurrentData,
            openWeatherId: openCurrentData.weather[0].id,
            desc: openCurrentData.weather[0].description,
            humidity: openCurrentData.main.humidity,
            wind: openCurrentData.wind.speed * 3.6,
            icon: openCurrentData.weather[0].icon,
            sunset: openCurrentData.sys.sunset,
            sunrise: openCurrentData.sys.sunrise,
            feelslike: openCurrentData.main.feels_like,
            // openWeekData
            openWeekWeather: openWeekData
          }, this.findUserLocalTime);
        }
      }).catch((error) => {
        if (error.res) {
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('error ', error.message);
        }
        console.log(error.config);
      });
  }
  // END sky data function

  // find users local time
  findUserLocalTime() {
    var myLat = this.state.currentLat, myLng = this.state.currentLng;

    // promise all data
    Promise.all([
      fetch(timezoneURL + myLat + ',' + myLng + '&timestamp=' + this.state.sunset + '&key=' + geo)
    ])
      // set json
      .then(([timezoneData]) => {
        return Promise.all([timezoneData.json()])
      })
      // set state
      .then(([timezoneData]) => {
        if (this._isMounted) {
          this.setState({
            // timezoneData
            timeZoneId: timezoneData.timeZoneId,
            timeZoneName: timezoneData.timeZoneName,
            dstOffset: timezoneData.dstOffset,
            rawOffset: timezoneData.rawOffset
          }, this.nightOrDay);
        }
      }).catch((error) => {
        if (error.res) {
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('error ', error.message);
        }
        console.log(error.config);
      });
  }

  // check night or day
  nightOrDay() {
    console.log('Icon = ' + this.state.icon + ' from App.js');
    console.log('Code = ' + this.state.openWeatherId + ' from App.js');
    // night icon conditions
    var conditions = ["01n", "02n", "03n", "04n", "09n", "10n", "11n", "13n", "50n"];
    // loop conditions
    var checkNight = conditions.some(e => this.state.icon.includes(e));
    console.log('Night = ' + checkNight + ' from App.js');
    // apply function based on result
    checkNight ? (this.setState({ night: true }), this.setBgNight()) :
      (this.setState({ night: false }), this.setBgDay());
  }

  // night colour bg logic
  setBgNight() {
    console.log('Night function running...');
    imageBg = colours.night;
    this.setState({
      weekBg: colours.night,
      weekBarBg: colours.nightDark,
      weekBarBgDarker: colours.nightDark,
      weekBarBgDarkest: colours.nightDark
    });
    // run app loaded function
    this.handleLoaded();
  }

  // day colour bg logic
  setBgDay() {
    let currentBg;
    let currentBarBg;
    let currentBarBgDarker;
    let currentBarBgDarkest;

    var currentID = this.state.openWeatherId;
    console.log(currentID,'From day function');

      // group 2xx: thunderstorm
      if (currentID >= 200 && currentID <= 232) {
          currentBg = colours.thunderStormDark;
          currentBarBg = colours.thunderStorm;
        // group 3xx: drizzle
      } else if (
        (currentID) >= 300 &&
        (currentID) <= 321
      ) {
          currentBg = colours.showerRainDark;
          currentBarBg = colours.showerRain;
        // group 5xx: rain
      } else if (
        (currentID) >= 500 &&
        (currentID) <= 531
      ) {
          currentBg = colours.rainDark;
          currentBarBg = colours.rain;
        // group 6xx: snow
      } else if (
        (currentID) >= 600 &&
        (currentID) <= 622
      ) {
          currentBg = colours.snowDark;
          currentBarBg = colours.snow;
        // group 7xx: atmosphere
      } else if (
        (currentID) >= 701 &&
        (currentID) <= 781
      ) {
          currentBg = colours.thunderStormDark;
          currentBarBg = colours.thunderStorm;
        // group 80x: scattered clouds
      } else if (
        (currentID) >= 801 &&
        (currentID) <= 802
      ) {
          currentBg = colours.scatteredCloudsDark;
          currentBarBg = colours.scatteredClouds;
        // group 80x: broken clouds
      } else if (
        (currentID) >= 803 &&
        (currentID) <= 804
      ) {
          currentBg = colours.brokenCloudsDark;
          currentBarBg = colours.brokenClouds;
        // group 800: clear
      } else {
          currentBg = colours.clearSkyDark;
          currentBarBg = colours.clearSky;
          currentBarBgDarker = colours.clearSkyDarker;
          currentBarBgDarkest = colours.clearSkyDarkest;
      }

    imageBg = currentBg;

    console.log(imageBg,'From day function');

    this.setState({
      weekBg: currentBg,
      weekBarBg: currentBarBg,
      weekBarBgDarker: currentBarBgDarker,
      weekBarBgDarkest: currentBarBgDarkest
    });

    // run app loaded function
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
        <View style={appStyles.loader}>
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
          style={{ alignItems: 'center', backgroundColor: colours.spotGreyMed, flex: 1 }}>
          {/* top bar */}
          <View style={{ height: 22 }} />
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
              />
              {/* current */}
              <View style={{ backgroundColor: imageBg }}>
                <Current
                  navigation={this.props.navigation}
                  keyboardShouldPersistTaps='handled'
                  weatherCode={this.state.openWeatherId}
                  currentBg={this.state.weekBg}
                  currentBarBg={this.state.weekBarBg}
                  currentBarBgDarkest={this.state.weekBarBgDarkest}
                  currentBarBgDarker={this.state.weekBarBgDarker}
                  updateSkyData={this.updateSkyData}
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
                  sunrise={this.state.sunrise}
                  feelslike={this.state.feelslike}
                  night={this.state.night}
                  dstOffset={this.state.dstOffset}
                  rawOffset={this.state.rawOffset}
                  timeZoneId={this.state.timeZoneId}
                  openWeather={this.state.openWeekWeather}
                />
              </View>
            </FirebaseProvider>
            {/* week */}
            <Week
              style={{ backgroundColor: imageBg }}
              weekBg={this.state.weekBg}
              weekBarBg={this.state.weekBarBg}
              weekBarBgDarkest={this.state.weekBarBgDarkest}
              weekBarBgDarker={this.state.weekBarBgDarker}
              weatherCode={this.state.openWeatherId}
              weather={this.state.openWeekWeather.list}
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

// style
const appStyles = StyleSheet.create({
  loader: {
    alignItems: 'center',
    backgroundColor: colours.spotGreyMed,
    flex: 1,
    justifyContent: 'center'
  }
});