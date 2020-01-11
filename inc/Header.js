// imports
import React, { Component } from 'react';

// default component functions
import { Alert, Animated, Button, Image, Text, TouchableOpacity, View } from 'react-native';

// configuration data
import configData from './../data/config.json';

// components
import SavedLocations from '../inc/SavedLocations';

// brand icon
// import BrandIcon from './../assets/brand.png';

// prop types
import PropTypes from 'prop-types';

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
const ref = SIMPLEWEATHER_DATABASE.ref("weather/");
const locationRef = ref.child("locations");

// generate a reference to a new location and add some data
var newLocationRef = locationRef.push();

// get the unique key generated
var newLocationId = newLocationRef.key;

// stylesheet
var styles = require('../styles.js');

// create animated view
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// START header
class Header extends Component {
  // default class header constructor
  constructor(props) {
    super(props);
    this.state = {
      progress: false,
      showMenu: false,
      savedLocations: []
    };
    // bind functions to state
    this.handleAnimate = this.handleAnimate.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

  componentDidMount() {
    // get data on load
    firebase.database().ref('weather/locations/').on('value', snapshot => {
      let data = snapshot.val()
      let locations = Object.values(data);
      this.setState({ savedLocations: locations }, function () {
        console.log(this.state.savedLocations);
      })
    })
  }

  // handle animation
  handleAnimate = () => {
    let mounted = true;
    console.log('Animating from 20...');
    if (mounted) {
      if (this.state.progress === false) {
        this.animation.play(20, 80);
        this.setState({
          progress: true,
          showMenu: true
        });
      } else {
        console.log('Animating from 110...');
        this.animation.play(110, 150);
        this.setState({
          progress: false,
          showMenu: false
        });
      }
    }
    return () => mounted = false;
  }

  // handle location
  handleLocation = () => {
    console.log('Handle location pressed...');
    // save location details to database
    newLocationRef.set({
      key: newLocationId,
      lat: this.props.currentLat,
      lng: this.props.currentLng,
      location: this.props.currentLocation
    }, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Location details saved with key: ' + newLocationId);
        Alert.alert(this.props.currentLocation + ' has been saved');
      }
    });
  }

  // START render header
  render() {

    // set up colour bg variables
    var colourBg = this.props.currentBg;

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
                fontSize: 22,
                fontFamily: 'allerDisplay',
                textAlign: 'center',
                paddingTop: 4
              }}>
              SIMPLE WEATHER
             </Text>
            {/* brand logo */}
            {/* <Image
              style={styles.brandIconSmall}
              source={BrandIcon}
              resizeMode='contain'
            /> */}
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
            {/* save current location */}
            <View style={{backgroundColor: colours.peach}}>
              <TouchableOpacity onPress={this.handleLocation}>
                <Text style={styles.menuText}>Save current location</Text>
              </TouchableOpacity>
            </View>
            {/* saved locations list */}
            <View>
              {this.state.savedLocations.length > 0 ? (
                <SavedLocations savedLocations={this.state.savedLocations} />
              ) : (
                  <Text>No Saved Locations...</Text>
                )}
            </View>
          </View>
        }
      </View>
    );
  }
  // END render header
}
// END header

export default Header;