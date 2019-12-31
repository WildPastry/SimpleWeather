// imports
import React from 'react';

// default component functions
import {
  Alert,
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  Text,
  View
} from 'react-native';

// permissions API
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// font
import * as Font from 'expo-font';

// configuration data
import configData from './data/config.json';

// components
import Header from './inc/Header';
import Current from './inc/Current';
import Week from './inc/Week';
import Footer from './inc/Footer';

// colours
import colours from './assets/colours.json';

// pre-loader
import preLoader from './assets/preloader.gif';

// stylesheet
var styles = require('./styles.js');

// set up auth keys
const geo = configData.GEO;
const open = configData.OPEN;
const sky = configData.SKY;

// get device width
const window = Dimensions.get('window');

// set up image display variable
let imageBg;

// START default class app
export default class App extends React.Component {
  // control requests
  _isMounted = false;
  // default class app constructor
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
    this._getLocationAsync = this._getLocationAsync.bind(this);
    this.updateSkyData = this.updateSkyData.bind(this);
    this.getSkyData = this.getSkyData.bind(this);
    this.reverseGeo = this.reverseGeo.bind(this);
    this.nightOrDay = this.nightOrDay.bind(this);
    this.setBgDay = this.setBgDay.bind(this);
    this.setBgNight = this.setBgNight.bind(this);
  }

  // update sky data function
  updateSkyData(value) {
    this.setState({
      currentLat: value['googleLat'],
      currentLng: value['googleLng'],
      currentLocation: value['googleName']
    });
    // call sky data function with new values
    this.getSkyData();
  }

  // START component mounted
  async componentDidMount() {
    this._isMounted = true;
    // load custom fonts
    await Font.loadAsync({
      poppinslight: require('./assets/fonts/Poppins-Light.otf'),
      poppinsmed: require('./assets/fonts/Poppins-Medium.otf'),
      poppinsbold: require('./assets/fonts/Poppins-Bold.otf'),
      weatherfont: require('./assets/fonts/weathericons-regular-webfont.ttf')
    });
    this.setState({ fontLoaded: true }, () => {
      console.log('FROM componentDidMount: Fonts loaded = ' + this.state.fontLoaded);
      // get user location function
      this._getLocationAsync();
    });
  }
  // END component mounted

  // START get location function
  _getLocationAsync = async () => {
    // check provider and if location services are enabled
    let providerStatus = await Location.getProviderStatusAsync();
    // console.log('FROM getLocationAsync ');
    // console.log(providerStatus);
    // services disabled error
    if (!providerStatus.locationServicesEnabled) {
      this.setState({
        errorMessage: 'Please enable location services for this app',
        // fallback
        currentLocation: 'Wellington, New Zealand',
        currentLat: -41.2865,
        currentLng: 174.7762
      });
      Alert.alert(this.state.errorMessage);
      console.log(this.state.errorMessage);
      this.getSkyData();
      return;
    }

    // check permissions
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // console.log('FROM getLocationAsync (151) ' + status);
    // permission denied error
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
        // fallback
        currentLocation: 'Wellington',
        currentLat: -41.2865,
        currentLng: 174.7762
      });
      Alert.alert(this.state.errorMessage);
      console.log(this.state.errorMessage);
      this.getSkyData();
      return;
    }

    // success function
    let location = await Location.getCurrentPositionAsync({});
    // console.log('FROM getLocationAsync ');
    // console.log(location);
    this.setState({
      location: location,
      currentLat: location.coords.latitude.toFixed(5),
      currentLng: location.coords.longitude.toFixed(5)
    });
    this.reverseGeo();
  };
  // END get location function

  // START reverse geo function
  reverseGeo() {
    var myLat = this.state.currentLat;
    var myLng = this.state.currentLng;
    // fetch location data
    fetch(
      // google data
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      myLat +
      ',' +
      myLng +
      '&key=' +
      geo
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          currentLocation: responseJson.results[8].formatted_address
        });
      });
    this.getSkyData();
  }
  // END reverse geo fucntion

  // START sky data function
  getSkyData() {
    this.setState({
      isLoaded: false
    });
    var myLat = this.state.currentLat;
    var myLng = this.state.currentLng;
    console.log('FROM getSkyData ' + myLat);
    console.log('FROM getSkyData ' + myLng);
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
                  // loading screen
                  isLoaded: true,
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
    var isNightOrDay = this.state.icon.includes('01n');
    console.log('Night = ' + isNightOrDay + ' from App.js');
    if (isNightOrDay === true) {
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
  }

  // day colour bg logic
  setBgDay() {
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
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // START render app
  render() {
    // declare loading variables in current state
    var { isLoaded } = this.state;

    // START loading function
    if (!isLoaded) {
      return (
        // START loading display
        <View style={styles.loader}>
          <Image style={styles.iconLoader} source={preLoader} />
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: '700',
              padding: 10,
              textAlign: 'center'
            }}>
            loading . . .
          </Text>
        </View>
        // END loading display
      );
      // END loading function
    } else {
      return (
        //  START main container
        <View
          keyboardShouldPersistTaps='handled'
          style={{ alignItems: 'center', backgroundColor: imageBg, flex: 1 }}>
          <ScrollView
            loop={false}
            width={window.width}
            keyboardShouldPersistTaps='handled'
            showsButtons={false}
            horizontal={false}
            showsPagination={false}>
            {/* header */}
            <Header
              headerBg={this.state.weekBg}
              headerBarBg={this.state.weekBarBg}
            />
            {/* current */}
            <Current
              keyboardShouldPersistTaps='handled'
              weatherCode={this.state.openWeatherId}
              currentBg={this.state.weekBg}
              currentIcon={this.state.currentIcon}
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

            />
            {/* week */}
            <Week
              weekBg={this.state.weekBg}
              weekBarBg={this.state.weekBarBg}
              weather={this.state.weather.list}
              skyWeather={this.state.skyWeather.daily.data}
            />
            {/* footer */}
            <Footer footerBg={this.state.weekBg} />
          </ScrollView>
        </View>
        // END main container
      );
    }
  }
  // END render app
}
// END default class app

// register button functionality
AppRegistry.registerComponent('basic-weather', () => ButtonBasics);

// register swiper functionality
AppRegistry.registerComponent('basic-weather', () => SwiperComponent);
