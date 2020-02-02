// imports
import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'
// import Firebase, { FirebaseProvider } from '../config/Firebase'

// component
import SavedLocations from '../inc/SavedLocations';

// configuration data
// import configData from './../data/config.json';

// colours
import colours from './../assets/colours.json';

// lottie
import LottieView from 'lottie-react-native';

import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
// import firebaseConfig from './firebaseConfig'

// // timeout
import timeout from './../data/timeout.js';

// // firebase
// import * as firebase from "firebase/app";
// import "firebase/database";

// // Firebase project configuration
// const FIREBASECONFIG = {
//   apiKey: configData.GEO,
//   authDomain: configData.AUTHDOMAIN,
//   databaseURL: configData.DATABASEURL,
//   projectId: configData.PROJECTID,
//   storageBucket: configData.STORAGEBUCKET,
//   messagingSenderId: configData.MESSAGINGSENDERID,
//   appId: configData.APPID
// };

// create animated view
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

var user = firebase.auth().currentUser
let db = firebase.firestore();

// // run timeout function
{ timeout }

// // firebase database
// const swDB = firebase.database();
// const ref = swDB.ref("weather/");
// const locationRef = ref.child("locations");

// const admin = require('firebase-admin');
// const functions = require('firebase-functions');

// admin.initializeApp(functions.config().firebase);

// console.log(db);
// console.log(withFirebaseHOC);
// console.log(FirebaseProvider);
// console.log(Firebase);

// const readData = this.props.firebase.createNewUser(userData);
// console.log(db);
// async _getUserDataFromFirestore() {
//   try {
//     const ref = firebase
//       .firestore()
//       .collection('user')
//       .doc(this.props.user.uid);
//     await ref.get().then(userData => {
//      console.log('User details of userID - ' + this.props.user.uid , userData.data());
//     });  
//   } catch (err) {
//     console.log('Error while getting user data from firestore : ', err);
//   }
// }
// db.collection('users').get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   })
//   .catch((err) => {
//     console.log('Error getting documents', err);
//   });

// state check for menu display
let buttonTitle;

if (user) {
  var docRef = db.collection("users").doc(user.uid);
  buttonTitle = 'Signout';
  docRef.get().then(function (doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
} else {
  buttonTitle = 'Login or create account';
  console.log('No user is logged in...');
}

// var user = firebase.auth().currentUser
// console.log('User: ' + user);
// db.collection("userProfiles").where('unique', '==', user.uid).get()
//   .then(querySnapshot => {
//     querySnapshot.forEach(doc => {console.log(doc) }

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
    // this.handleLocation = this.handleLocation.bind(this);
  }

  // componentDidMount = async () => {
  //   // console.log(user.uid);

  //   //   db.collection("users").where('unique', '==', user.uid).get()
  //   // .then(querySnapshot => {
  //   //   querySnapshot.forEach(doc => {
  //   //     console.log(doc);
  //   //    }
  //   //   )}
  //   // );
  //   // const snapshot = await firebase.firestore().collection('users').get()
  //   // console.log(snapshot);
  //   // try {
  //   //   await this.props.firebase.createNewUser(userData => {
  //   //     console.log('user');
  //   //     console.log(userData);
  //   //   })
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // }

  // componentDidMount() {
  //   db.collection('users').get()
  // .then((snapshot) => {
  //   snapshot.forEach((doc) => {
  //     console.log(doc.id, '=>', doc.data());
  //   });
  // })
  // .catch((err) => {
  //   console.log('Error getting documents', err);
  // });
  // }

  // Handle signout
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }

  // Handle login
  // handleLogin = async () => {
  //   try {
  //     this.props.navigation.navigate('Signup');
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // componentDidMount() {
  //   let mounted = true;
  //   if (mounted) {
  //     // get data on load
  //     locationRef.on('value', snapshot => {
  //       if (snapshot.exists()) {
  //         let data = snapshot.val();
  //         let locations = Object.values(data);
  //         this.setState({ savedLocations: locations }, function () {
  //           console.log(this.state.savedLocations);
  //         })
  //       } else {
  //         this.setState({
  //           savedLocations: ''
  //         });
  //       }
  //     })
  //   }
  //   return () => mounted = false;
  // }

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

  // handle location
  // handleLocation() {
  //   let mounted = true;
  //   if (mounted) {
  //     console.log('Handle location pressed...');
  //     // get the unique key generated
  //     var newLocationId = locationRef.push({}).key;
  //     // save location details to database
  //     swDB.ref('weather/locations/' + newLocationId).set({
  //       key: newLocationId,
  //       lat: this.props.currentLat,
  //       lng: this.props.currentLng,
  //       location: this.props.currentLocation
  //     }, function (error) {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log('Location details saved...');
  //       }
  //     });
  //   }
  //   return () => mounted = false;
  // }

  // handle delete
  // handleDelete(val) {
  //   let mounted = true;
  //   if (mounted) {
  //     console.log(val);
  //     swDB.ref('weather/locations/' + val).remove();
  //   }
  //   return () => mounted = false;
  // }

  // START render header
  render() {
    return (
      // master wrap
      <View>
        {/* header wrap */}
        <View style={headerStyles.headerWrap}>
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
              style={headerStyles.simpleWeather}>
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
            <View>
              <Button
                title={buttonTitle}
                onPress={this.handleSignout}
                titleStyle={headerStyles.menuText}
                type='clear' />
              {/* <TouchableOpacity onPress={this.handleLocation}>
                <Text style={headerStyles.menuText}>
                  Save current location
                  </Text>
              </TouchableOpacity> */}
              {/* saved locations list */}
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

export default withFirebaseHOC(Header);

// style
const headerStyles = StyleSheet.create({
  menuWrap: {
    padding: 8
  },
  menuText: {
    color: colours.spotYellow,
    fontSize: 19,
    fontFamily: 'allerBd',
    textAlign: 'center',
    marginBottom: 8
  },
  simpleWeather: {
    color: colours.white,
    fontSize: 22,
    fontFamily: 'allerDisplay',
    textAlign: 'center',
    paddingTop: 4
  },
  saveLocationButton: {
    padding: 8,
    marginBottom: 8
  },
  brandIconSmall: {
    alignSelf: 'center',
    height: 35,
    width: 35
  },
  headerWrap: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#303030',
    borderBottomColor: colours.white,
    borderBottomWidth: 0.5
  },
});