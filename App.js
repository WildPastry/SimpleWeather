// imports
import React from 'react';

// default component functions
import {
  Alert,
  AppRegistry,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

// permissions API
import { Constants, Location, Permissions } from 'expo';

// font
import { Font } from 'expo';

// configuration data
import configData from './data/config.json';

// components
import Header from './inc/Header';
import Current from './inc/Current';
import Week from './inc/Week';
import Footer from './inc/Footer';

// colours
import colours from './assets/colours.json';

// icons
import weatherIcons from './assets/icons.json';

// pre-loader
import preLoader from './assets/preloader.gif';

// database storage
// import { AsyncStorage } from "react-native";

// stylesheet
var styles = require('./styles.js');

// set up auth key for sky data
const sky = configData.SKY;

// set up auth key for sky data
const geo = configData.GEO;

// set up auth key for open data
const open = configData.OPEN;

// get device width
const window = Dimensions.get('window');

// set up image display variable
let imageBg;

// saved data fucntion
// let savedLocation_object = {
//   savedLat: "",
//   savedLng: "",
//   savedName: ""
// };

// AsyncStorage.setItem(
//   "savedLocation",
//   JSON.stringify(savedLocation_object),
//   () => {
//     AsyncStorage.getItem("savedLocation", (err, result) => {
//       console.log(result);
//     });
//   }
// );

// START default class app
export default class App extends React.Component {
  // default class app constructor
  constructor(props) {
    super(props);
    this.state = {
      // loading screen
      isLoaded: false,
      // fonts
      fontLoaded: false,
      // sky weather data array
      weather: [],
      // open weather data array
      openWeather: [],
      // error message
      errorMessage: null,
      // current weather and location data
      openWeatherDesc: null,
      openWeatherId: null,
      currentLat: null,
      currentLng: null,
      currentLocation: null,
      currentIcon: null,
      // weather and location data
      location: '',
      icon: '',
      temp: '',
      high: '',
      low: '',
      desc: '',
      time: '',
      sunsetTime: '',
      wind: '',
      humidity: '',
      dailyWind: '',
      dailyHumidity: '',
      // colour background
      weekBg: null,
      weekBarBg: null
    };
    // bind functions to state
    this._getLocationAsync = this._getLocationAsync.bind(this);
    this.setCurrentIcon = this.setCurrentIcon.bind(this);
    this.updateSkyData = this.updateSkyData.bind(this);
    this.getSkyData = this.getSkyData.bind(this);
    this.reverseGeo = this.reverseGeo.bind(this);
  }

  updateSkyData(value) {
    this.setState({
      currentLat: value['googleLat'],
      currentLng: value['googleLng'],
      currentLocation: value['googleName']
    });
    this.getSkyData();
  }

  // START component pre mount
  componentWillMount() {
    // get user location function
    this._getLocationAsync();
  }
  // END component pre mount

  // START component mounted
  async componentDidMount() {
    // load custom fonts
    await Font.loadAsync({
      poppinsLight: require('./assets/fonts/Poppins-Light.otf'),
      poppinsMed: require('./assets/fonts/Poppins-Medium.otf'),
      poppinsBold: require('./assets/fonts/Poppins-Bold.otf'),
      weatherFont: require('./assets/fonts/weathericons-regular-webfont.ttf')
    });
    this.setState({ fontLoaded: true });
  }
  // END component mounted

  // START get location function
  _getLocationAsync = async () => {
    // check provider and if location services are enabled
    let providerStatus = await Location.getProviderStatusAsync();
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
      .then(response => response.json())
      .then(responseJson => {
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
      .then(res => {
        if (!res.ok) {
          throw new Error('DarkSky Failed with HTTP code ' + res.status);
        } else {
          console.log('DarkSky Success with HTTP code ' + res.status);
        }
        return res;
      })
      // convert raw data call into json
      .then(result => result.json())
      .then(data => {
        this.setState(
          {
            weather: data,
            icon: data.currently.icon,
            wind: data.currently.windSpeed,
            humidity: data.currently.humidity.toFixed(2),
            sunsetTime: data.currently.sunsetTime,
            temp: Math.round(data.currently.temperature),
            high: Math.round(data.daily.data[0].temperatureHigh),
            low: Math.round(data.daily.data[0].temperatureLow),
            desc: data.daily.data[0].summary,
            time: data.daily.data[0].time
          },
          () => {
            this.setCurrentIcon();
            this.setBg();
          }
        );
        fetch(
          // open data
          'https://api.openweathermap.org/data/2.5/forecast?lat=' +
            myLat +
            '&lon=' +
            myLng +
            '&units=metric&APPID=' +
            open
        )
          // log HTTP response error or success for data call
          .then(res => {
            if (!res.ok) {
              throw new Error(
                'Open Weather Failed with HTTP code ' + res.status
              );
            } else {
              console.log('Open Weather Success with HTTP code ' + res.status);
            }
            return res;
          })
          // convert raw data call into json
          .then(openResponse => openResponse.json())
          .then(openResponseJson => {
            this.setState(
              {
                isLoaded: true,
                openWeather: openResponseJson,
                openWeatherDesc:
                  openResponseJson.list[0].weather[0].description,
                openWeatherId: openResponseJson.list[0].weather[0].id
              },
              () => {
                // console.log(this.state.openWeather.list);
                // console.log(this.state.openWeather.list[0].weather[0].description);
                // console.log(this.state.openWeather.list[0].weather[0].id);
                // console.log(this.state.openWeather.list[0].dt_txt);
                // console.log(this.state.openWeather.list[1].dt_txt);
                // console.log(this.state.openWeather.list[2].dt_txt);
                // console.log(this.state.openWeather.list[3].dt_txt);
                // console.log(this.state.openWeather.list[6].dt_txt);
                // console.log(this.state.openWeather.list[6].dt_txt);
                // console.log(this.state.openWeather.list[0].weather[0].id);
                // console.log(this.state.openWeather.list[10].dt_txt);
                // console.log(this.state.openWeather.list[10].weather[0].icon);
                // console.log(this.state.openWeather.list[15].dt_txt);
                // console.log(this.state.openWeather.list[15].weather[0].icon);
                // console.log(this.state.openWeather.list[18].dt_txt);
                // console.log(this.state.openWeather.list[18].weather[0].icon);
                // console.log(this.state.openWeather.list[5].dt_txt);
                // console.log(this.state.openWeather.list[6].dt_txt);
                // console.log(this.state.openWeather.list[7].dt_txt);
                // console.log(this.state.openWeather.list[8].dt_txt);
                // console.log(this.state.openWeather.list[9].dt_txt);
                // console.log(this.state.openWeather.list[10].dt_txt);
                // console.log(this.state.openWeather.list[11].dt_txt);
                // console.log(this.state.openWeather.list[12].dt_txt);
                // console.log(this.state.openWeather.list[13].dt_txt);
                // console.log(this.state.openWeather.list[14].dt_txt);
                // console.log(this.state.openWeather.list[15].dt_txt);
                // console.log(this.state.openWeather.list[16].dt_txt);
                // console.log(this.state.openWeather.list[17].dt_txt);
                // console.log(this.state.openWeather.list[18].dt_txt);
                // console.log(this.state.openWeather.list[19].dt_txt);
                // console.log(this.state.openWeather.list[20].dt_txt);
                // console.log(this.state.openWeather.list[21].dt_txt);
                // console.log(this.state.openWeather.list[22].dt_txt);
                // console.log(this.state.openWeather.list[23].dt_txt);
                // console.log(this.state.openWeather.list[24].dt_txt);
                // console.log(this.state.openWeather.list[25].dt_txt);
                // console.log(this.state.openWeather.list[26].dt_txt);
                // console.log(this.state.openWeather.list[27].dt_txt);
                // console.log(this.state.openWeather.list[28].dt_txt);
                // console.log(this.state.openWeather.list[29].dt_txt);
                // console.log(this.state.openWeather.list[30].dt_txt);
                // console.log(this.state.openWeather.list[31].dt_txt);
                // console.log(this.state.openWeather.list[32].dt_txt);
                // console.log(this.state.openWeather.list[33].dt_txt);
                // console.log(this.state.openWeather.list[34].dt_txt);
                // console.log(this.state.openWeather.list[35].dt_txt);
                // console.log(this.state.openWeather.list[36].dt_txt);
                // console.log(this.state.openWeather.list[37].dt_txt);
                // console.log(this.state.openWeather.list[38].dt_txt);
                // console.log(this.state.openWeather.list[39].dt_txt);
              }
            );
          });
      })
      // catch and log errors
      .catch(error => {
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

  // set current weather icon
  setCurrentIcon() {
    this.setState({
      currentIcon: this.state.icon
    });
  }

  // image else if logic
  setBg() {
    // console.log(this.state.icon);
    if (this.state.icon === 'clear-day') {
      imageBg = colours.clearSky;
      this.setState({
        weekBg: colours.clearSkyDark,
        weekBarBg: colours.clearSky
      });
      // weekBg = colours.clearSkyDark
    } else if (this.state.icon === 'clear-night') {
      imageBg = colours.night;
      this.setState({
        weekBg: colours.nightDark,
        weekBarBg: colours.night
      });
      // weekBg = colours.nightDark
    } else {
      imageBg = colours.showerRain;
      this.setState({
        weekBg: colours.showerRainDark,
        weekBarBg: colours.showerRain
      });
      // weekBg = colours.showerRainDark
    }
  }

  // START render app
  render() {
    // var weatherCode = this.state.openWeatherId;
    // console.log(this.state.openWeatherDesc);

    // console.log(this.state.openWeather.list[0].weather[0].description);
    // console.log(this.state.openWeather.list[0].weather[0].icon);
    // console.log(weatherIcons[200].code);
    // console.log(weatherIcons[200].label);
    // console.log(weatherIcons[200].icon);
    // console.log(this.state.openWeather.list[0].weather[0].description);
    // console.log(this.state.openWeather.list[0].weather[0].icon);

    // declare variable in current state
    var { isLoaded } = this.state;

    // START loading function
    if (!isLoaded) {
      return (
        // START loading display
        <View style={styles.loader}>
          <Image style={styles.iconLoader} source={preLoader} />
          <Text style={styles.headerText}>loading . . .</Text>
        </View>
        // END loading display
      );
      // END loading function
    } else {
      return (
        //  START main container
        <View
          keyboardShouldPersistTaps="handled"
          style={{ alignItems: 'center', backgroundColor: imageBg, flex: 1 }}
        >
          <ScrollView
            loop={false}
            width={window.width}
            keyboardShouldPersistTaps="handled"
            showsButtons={false}
            horizontal={false}
            showsPagination={false}
          >
            {/* header */}
            <Header />
            {/* <Text
              style={{
                fontFamily: 'weatherFont',
                fontSize: 80,
                textAlign: 'center',
                color: colours.snow
              }}
            >
              {weatherIcons[weatherCode].code}
            </Text> */}
            {/* current */}
            <Current
              keyboardShouldPersistTaps="handled"
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
            />
            {/* week */}
            <Week
              weekBg={this.state.weekBg}
              weekBarBg={this.state.weekBarBg}
              weather={this.state.weather.daily.data}
              summary={this.state.weather.daily.summary}
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
