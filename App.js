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

// swiper
import Swiper from '@nart/react-native-swiper';

// configuration data
import configData from './data/config.json';

// components
import Header from './inc/Header';
// import UserInput from "./inc/UserInput";
import Current from './inc/Current';
import Week from './inc/Week';
import Footer from './inc/Footer';

// image bgs
import sunnyHot from './assets/bgs/sunny-hot.png';
import sunnyCold from './assets/bgs/sunny-cold.png';
import rainyCold from './assets/bgs/rainy-cold.png';

// database storage
// import { AsyncStorage } from "react-native";

// stylesheet
var styles = require('./styles.js');

// set up auth key for sky data
const sky = configData.SKY;

// set up auth key for sky data
const geo = configData.GEO;

// get device width
const window = Dimensions.get('window');

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
      // weather data array
      weather: [],
      // error message
      errorMessage: null,
      // current weather and location data
      currentLat: null,
      currentLng: null,
      currentLocation: null,
      currentCity: null,
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
      dailyHumidity: ''
    };
    // bind functions to state
    this._getLocationAsync = this._getLocationAsync.bind(this);
    this.setCurrentIcon = this.setCurrentIcon.bind(this);
    this.updateSkyData = this.updateSkyData.bind(this);
    this.getSkyData = this.getSkyData.bind(this);
    this.reverseGeo = this.reverseGeo.bind(this);
    // this.setPressedState = this.setPressedState.bind(this);
  }

  updateSkyData(value) {
    this.setState({
      currentLat: value['googleLat'],
      currentLng: value['googleLng'],
      currentLocation: value['googleName'],
      currentCity: value['googleNameLong']
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
  // componentDidMount() {
  // load custom fonts
  //   Font.loadAsync({
  //     "poppins-light": require("./assets/fonts/Poppins-Light.otf"),
  //     "poppins-med": require("./assets/fonts/Poppins-Medium.otf"),
  //     "poppins-bold": require("./assets/fonts/Poppins-Bold.otf")
  //   });
  // }
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
        currentLocation: 'Wellington',
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
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        myLat +
        ',' +
        myLng +
        '&key=' +
        geo
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson.results[3].address_components[3].long_name)
        this.setState({
          currentLocation:
            responseJson.results[3].address_components[2].long_name,
          currentCity: responseJson.results[3].address_components[3].long_name
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
          throw new Error('Failed with HTTP code ' + res.status);
        } else {
          console.log('Success with HTTP code ' + res.status);
        }
        return res;
      })
      // convert raw data call into json
      .then(result => result.json())
      .then(data => {
        this.setState(
          {
            isLoaded: true,
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
          }
        );
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

  coldBg(){
    console.log('I am cold');
  }

  hotBg(){
    console.log('I am hot');
  }

  normalBg(){
    console.log('I am normal');
  }
  
  // START render app
  render() {
    // declare variable in current state
    var { isLoaded } = this.state;

    // image resize mode
    const resizeMode = 'center';

    // set up image display variable
    let imageBG;

    if (this.state.temp <= 10) {
      this.coldBg();
    } else if (this.state.temp >= 20) {
      this.hotBg();
    } else {
      this.normalBg();
    }

    // image else if logic
    if (this.state.icon === 'clear-day') {
      imageBG = sunnyHot;
    } else {
      imageBG = rainyCold;
    }

    // switch (value) {
    //   case 1:
    //      for (int i = 0; i < something_in_the_array.length; i++)
    //         if (whatever_value == (something_in_the_array[i])) {
    //            value = 2;
    //            break;
    //         } else if (whatever_value == 2) {
    //            value = 3;
    //            break;
    //         } else if (whatever_value == 3) {
    //            value = 4;
    //            break;
    //         }
    //      break;
    //      case 2:
    //       for (int i = 0; i < something_in_the_array.length; i++)
    //          if (whatever_value == (something_in_the_array[i])) {
    //             value = 2;
    //             break;
    //          } else if (whatever_value == 2) {
    //             value = 3;
    //             break;
    //          } else if (whatever_value == 3) {
    //             value = 4;
    //             break;
    //          }
    //         }
    // switch ($singleField['type']) {
    //   case 'text':
    //     echo '<div id="' . $customField . '" ' . $condition . ' >';
    //     echo '<label for="' . $customField . '">' . $singleField['title'] . '</label>';
    //     echo '<input type="text" name="' . $customField . '" class="inputField" value="' . $customValues[$customField][0] . '">';
    //     echo '</div>';
    //     break;
    //   case 'number':
    //     echo '<label for="' . $customField . '">' . $singleField['title'] . '</label>';
    //     echo '<input type="number" name="' . $customField . '" class="inputField" value="' . $customValues[$customField][0] . '">';
    //     break;
    //   case 'textarea':
    //     echo $customValues[$customField][0];
    //     echo '<br>';
    //     echo '<label for="' . $customField . '">' . $singleField['title'] . '</label>';
    //     echo '<textarea class="inputField" name="' . $customField . '" rows="' . $singleField['rows'] . '"></textarea>';
    //     break;
    //   case 'select':
    //     echo $customValues[$customField][0];
    //     echo '<br>';
    //     echo '<label for="' . $customField . '">' . $singleField['title'] . '</label>';
    //     echo '<select name="' . $customField . '" class="inputField customSelect">';
    //     echo '<option class="customSelect"> -- Please Enter a value -- </option>';
    //     foreach ($singleField['choices'] as $choice) {
    //       echo '<option class="customSelect" value="' . $choice . '">' . $choice . '</option>';
    //     }
    //     echo '</select>';
    //     break;
    //   default:
    //     echo $customValues[$customField][0];
    //     echo '<br>';
    //     echo '<label for="' . $customField . '">' . $singleField['title'] . '</label>';
    //     echo '<input type="text" name="' . $customField . '" class="inputField">';
    //     break;
    // }
    // START loading function
    if (!isLoaded) {
      return (
        // START loading display
        <View style={styles.loader}>
          <Text style={styles.headingLoader}>Loading...</Text>
        </View>
        // END loading display
      );
      // END loading function
    } else {
      return (
        // START dynamic image bg
        <ImageBackground
          style={{
            flex: 1,
            resizeMode
          }}
          source={imageBG}
        >
          {/* START main container */}
          <View keyboardShouldPersistTaps="handled" style={styles.container}>
            {/* START swiper */}
            <View keyboardShouldPersistTaps="handled" style={styles.swiperWrap}>
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
                {/* START app display */}
                {/* START slide 1 */}
                {/* <View keyboardShouldPersistTaps="handled" style={styles.slide1}> */}
                {/* current */}
                <Current
                  keyboardShouldPersistTaps="handled"
                  currentIcon={this.state.currentIcon}
                  updateSkyData={this.updateSkyData}
                  errorMessage={this.state.errorMessag}
                  currentLocation={this.state.currentLocation}
                  currentCity={this.state.currentCity}
                  currentLat={this.state.currentLat}
                  currentLng={this.state.currentLng}
                  wind={this.state.wind}
                  humidity={this.state.humidity}
                  temp={this.state.temp}
                  high={this.state.high}
                  low={this.state.low}
                  desc={this.state.desc}
                />
                {/* </View> */}
                {/* END slide 1 */}
                {/* START slide 2 */}
                {/* <View style={styles.slide2}> */}
                {/* week */}
                <Week
                  weather={this.state.weather.daily.data}
                  summary={this.state.weather.daily.summary}
                />
                {/* </View> */}
                {/* END slide 2 */}
                {/* END app display */}
                {/* footer */}
                <Footer />
              </ScrollView>
            </View>
            {/* END swiper */}
          </View>
          {/* END main container */}
        </ImageBackground>
        // END dynamic image bg
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
