// imports
import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// configuration data
import configData from './../data/config.json';

// component
import SavedLocations from '../inc/SavedLocations';

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

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASECONFIG);
}

// firebase database
const SIMPLEWEATHER_DATABASE = firebase.database();
const ref = SIMPLEWEATHER_DATABASE.ref("weather/");
const locationRef = ref.child("locations");

// get the unique key generated
// var newLocationId = newLocationRef.key;

// stylesheet
var styles = require('../styles.js');

// create animated view
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// function useIsMountedRef() { const isMountedRef = useRef(null); useEffect(() => { isMountedRef.current = true; return () => isMountedRef.current = false; }); return isMountedRef; }

// const isMountedRef = useIsMountedRef();

// START header
class Header extends Component {
  // default class header constructor
  constructor(props) {
    super(props);
    this.state = {
      progress: false,
      showMenu: false,
      currentKey: '',
      savedLocations: []
    };
    // bind functions to state
    this.handleAnimate = this.handleAnimate.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

  componentDidMount() {
    let mounted = true;
    if (mounted) {

      //   locationRef.on('child_added', s => {
      //     if (s.exists()) {
      //         console.log(s.val()) // It will return the new updated object
      //         console.log(s.key) // It will return the timestamp key
      //         this.setState({
      //             currentKey: s.key
      //         })
      //     }
      // })

      // function snapshotToArray(snapshot) {
      //   var returnArr = [];

      //   snapshot.forEach(function (childSnapshot) {
      //     var item = childSnapshot.val();
      //     item.key = childSnapshot.key;

      //     returnArr.push(item);

      //   });

      //   return returnArr;

      // };

      // firebase.database().ref('/weather/locations/').on('value', function (snapshot) {
      //   if (snapshot.exists()) {
      //     console.log(snapshotToArray(snapshot));
      //   } else {
      //     this.setState({
      //       savedLocations: ''
      //     });
      //   }
      // });
      // get data on load
      locationRef.on('value', snapshot => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let locations = Object.values(data);
          // let key = snapshot.key;
          // let arr = Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));
          this.setState({ savedLocations: locations }, function () {
            console.log(this.state.savedLocations);
            // console.log(arr);
          })
        } else {
          this.setState({
            savedLocations: ''
          });
        }
      })
    }
    return () => mounted = false;
  }

  // handle animation
  handleAnimate = () => {
    let mounted = true;
    if (mounted) {
      console.log('Animating from 20...');
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

  //   function snapshotToArray(snapshot) {
  //     var returnArr = [];

  //     snapshot.forEach(function(childSnapshot) {
  //         var item = childSnapshot.val();
  //         item.key = childSnapshot.key;

  //         returnArr.push(item);
  //     });

  //     return returnArr;
  // };

  // handle location
  handleLocation() {
    let mounted = true;
    if (mounted) {
      console.log('Handle location pressed...');
      // get the unique key generated
      var newLocationId = locationRef.push().key;

      // save location details to database
      locationRef.push({
        key: newLocationId,
        lat: this.props.currentLat,
        lng: this.props.currentLng,
        location: this.props.currentLocation
      }, function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log('Location details saved...');
        }
      });
    }
    return () => mounted = false;
  }

  // handle delete
  handleDelete(val) {
    let mounted = true;
    if (mounted) {
      console.log(val);
      firebase.database().ref(`weather/locations/${val}`).remove();
    }
    return () => mounted = false;
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
                fontSize: 22,
                fontFamily: 'allerDisplay',
                textAlign: 'center',
                paddingTop: 4
              }}>
              SIMPLE WEATHER
             </Text>
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
          <View style={headerStyles.menuWrap}>
            {/* save current location */}
            <View style={headerStyles.saveLocationButton}>
              <TouchableOpacity onPress={this.handleLocation}>
                <Text style={headerStyles.menuText}>
                  Save current location
                  </Text>
              </TouchableOpacity>
            </View>
            {/* saved locations list */}
            <View>
              {this.state.savedLocations.length > 0 ? (
                <SavedLocations
                  savedLocations={this.state.savedLocations}
                  handleDelete={this.handleDelete} />
              ) : (
                  <Text style={headerStyles.menuText}>
                    No saved locations yet...
                  </Text>
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

// style
const headerStyles = StyleSheet.create({
  menuWrap: {
    padding: 8
  },
  menuText: {
    color: colours.white,
    fontSize: 19,
    fontFamily: 'allerLt',
    textAlign: 'center'
  },
  saveLocationButton: {
    backgroundColor: colours.peach,
    padding: 8,
    marginBottom: 8
  }
});