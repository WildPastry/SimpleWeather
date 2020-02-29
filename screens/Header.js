// imports
import React, { Component } from 'react';
import { Alert, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements'
import SavedLocations from '../inc/SavedLocations';
import colours from './../assets/colours.json';
import LottieView from 'lottie-react-native';
import timeout from './../data/timeout.js';

// firebase
import * as firebase from 'firebase';
import { withFirebaseHOC } from '../config/Firebase';
import 'firebase/firestore';
import 'firebase/auth';

// create animated view
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// run timeout function
{ timeout }

// START Header
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: false,
      showMenu: false,
      savedLocations: []
    };
    this.handleAnimate = this.handleAnimate.bind(this);
    this.updateSkyData = this.updateSkyData.bind(this);
  }

  renderMenuOption() {
    // Change menu based on user status
    let menuDisplay;
    // load firebase data
    var user = firebase.auth().currentUser;
    if (user) {
      // console.log('User ID:  ' + user.uid);
      console.log('Current signed in user email:  ' + user.providerData[0].email);
      menuDisplay = (
        <Button
          title='Signout'
          onPress={this.handleSignout}
          titleStyle={headerStyles.menuText}
          type='clear' />
      );
    } else {
      console.log('No user is logged in...');
      menuDisplay = (
        <Button
          title='Login or create account'
          onPress={this.handleLogin}
          titleStyle={headerStyles.menuText}
          type='clear' />
      );
    }
    return menuDisplay;
  }

  componentDidMount = async () => {
    let mounted = true;
    if (mounted) {
      console.log('inside componentDidMount from Header.js');
      // check firebase for user
      var user = firebase.auth().currentUser;
      if (user) {
        // user is signed in
        // load firebase data
        const db = firebase.firestore();
        const dbRT = firebase.database();
        const ref = dbRT.ref(user.uid);
        const locationRef = ref.child("locations");
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
        locationRef.on('value', snapshot => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            let locations = Object.values(data);
            this.setState({ savedLocations: locations }, function () {
              console.log(this.state.savedLocations);
            })
          } else {
            // if they have no locations saved set state to null
            this.setState({
              savedLocations: ''
            });
          }
        })
      } else {
        console.log('No user is currently logged in...');
      }
    }
    return () => mounted = false;
  }

  // handle delete
  handleDelete(val) {
    var user = firebase.auth().currentUser;
    const dbRT = firebase.database();
    let mounted = true;
    if (mounted) {
      console.log(val);
      dbRT.ref(user.uid + '/locations/' + val).remove();
    }
    return () => mounted = false;
  }

  // update sky data function
  updateSkyData(val) {
    let mounted = true;
    if (mounted) {
      console.log('Inside handleLocationChange from Header.js...');
      console.log(val);
      var options = {
        googleLat: val['currentSavedLat'],
        googleLng: val['currentSavedLng'],
        googleName: val['currentSavedName']
      };
      this.props.updateSkyData(options);
    }
    return () => mounted = false;
  }

  // handle signout
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth');
      console.log('User has been signed out...');
    } catch (error) {
      console.log(error)
    }
  }

  // handle login
  handleLogin = () => this.props.navigation.navigate('Login');

  // handle animation
  handleAnimate = () => {
    let mounted = true;
    if (mounted) {
      console.log('Inside handleAnimate from Header.js...');
      if (this.state.progress === false) {
        this.animation.play(20, 80);
        this.setState({
          progress: true,
          showMenu: true
        });
      } else {
        console.log('Inside handleAnimate from Header.js...');
        this.animation.play(110, 150);
        this.setState({
          progress: false,
          showMenu: false
        });
      }
    }
    return () => mounted = false;
  }

  // START render Header
  render() {
    console.log('Inside render from Header.js...');
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
              {this.renderMenuOption()}
              {/* saved locations list */}
              {this.state.savedLocations.length > 0 ? (
                <SavedLocations
                  savedLocations={this.state.savedLocations}
                  updateSkyData={this.updateSkyData}
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
  // END render Header
}
// END Header

export default withFirebaseHOC(Header);

// style
const headerStyles = StyleSheet.create({
  menuWrap: {
    padding: 8
  },
  menuText: {
    color: colours.spotYellow,
    fontSize: 19,
    fontFamily: 'allerRg',
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