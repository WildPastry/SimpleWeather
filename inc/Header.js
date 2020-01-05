// imports
import React from 'react';

// default component functions
import { Animated, Button, Image, Text, TouchableOpacity, View } from 'react-native';

// configuration data
import configData from './../data/config.json';

// brand icon
import BrandIcon from './../assets/brand.png';

// colours
import colours from './../assets/colours.json';

// lottie
import LottieView from 'lottie-react-native';

// timeout
import timeout from './../data/timeout.js';

// firebase
import * as firebase from "firebase/app";
import "firebase/database";

// run timeout function
{ timeout }

// Firebase project configuration
const FIREBASECONFIG = {
  apiKey: configData.GEO,
  authDomain: configData.AUTHDOMAIN,
  databaseURL: configData.DATABASEURL,
  projectId: configData.PROJECTID,
  storageBucket: configData.STORAGEBUCKET,
  messagingSenderId: configData.MESSAGINGSENDERID,
  appId: configData.APPID
};

// // Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASECONFIG);
}

// // firebase database
const SIMPLEWEATHER_DATABASE = firebase.database();

// console.log(SIMPLEWEATHER_DATABASE);
// SIMPLEWEATHER_DATABASE.ref('users/' + 1).set({
//   username: "name",
//   email: "email",
//   profile_picture : "imageUrl"
// }, function(error) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Data saved to database');
//   }
// });

// var ref = SIMPLEWEATHER_DATABASE.ref('users/' + 1);

// ref.on("value", function (snapshot) {
//   console.log('Database value: ' + snapshot.val());
// }, function (errorObject) {
//   console.log('The read failed: ' + errorObject.code);
// });

// stylesheet
var styles = require('../styles.js');

// create animated view
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// START header
class Header extends React.Component {
  // default class header constructor
  constructor(props) {
    super(props);
    this.state = {
      progress: false,
      showMenu: false
    };
    // bind functions to state
    this.handleAnimate = this.handleAnimate.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

  // handle animation
  handleAnimate = () => {
    console.log('Animating from 20...');
    if (this.state.progress === false) {
      this.setState({
        progress: true,
        showMenu: true
      }, () => { this.animation.play(20, 80); });
    } else {
      console.log('Animating from 110...');
      this.setState({
        progress: false,
        showMenu: false
      }, () => { this.animation.play(110, 150); });
    }
  }

  // handle location
  handleLocation = () => {
    console.log('Handle location pressed...');
  }

  // START render header
  render() {

    return (
      // master wrap
      <View>
        {/* header wrap */}
        <View style={styles.headerWrap}>
          {/* hamburger */}
          <AnimatedTouchable onPress={this.handleAnimate} style={{
            height: 35,
            width: 35,
          }}>
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              source={require('./../assets/animations/hamburger.json')}
              loop={false}
            />
          </AnimatedTouchable>
          {/* brand wrap */}
          <View style={{ flexDirection: 'row' }}>
            {/* brand text */}
            <Text
              style={{
                color: colours.white,
                fontSize: 23,
                fontFamily: 'allerDisplay',
                textAlign: 'center',
                paddingTop: 4
              }}>
              SIMPLE WEATHER
             </Text>
            {/* brand logo */}
            <Image
              style={styles.brandIconSmall}
              source={BrandIcon}
              resizeMode='contain'
            />
          </View>
          {/* right icon for balance */}
          <View style={{
            backgroundColor: colours.simpleWeather,
            height: 35,
            width: 35
          }} />
        </View>
        {/* menu */}
        {this.state.showMenu &&
          <View style={styles.menuWrap}>
            <TouchableOpacity onPress={this.handleLocation}>
              <Text style={styles.menuText}>Save this location</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
  // END render header
}
// END header

export default Header;
