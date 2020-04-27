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
    this.handleHome = this.handleHome.bind(this);
    this.handleFail = this.handleFail.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.updateSkyData = this.updateSkyData.bind(this);
  }

  renderMenuOption() {
    // Change menu based on user status
    let menuDisplay;
    // load firebase data
    var user = firebase.auth().currentUser;
    if (user) {
      console.log('Current signed in user email:  ' + user.providerData[0].email);
      menuDisplay = (
        <Button
          title='Signout'
          onPress={this.handleSignout}
          titleStyle={headerStyles.menuTitle}
          type='clear' />
      );
    } else {
      console.log('No user is logged in...');
      menuDisplay = (
        <Button
          title='Login or create account'
          onPress={this.handleLogin}
          titleStyle={headerStyles.menuTitle}
          type='clear' />
      );
    }
    return menuDisplay;
  }

  // START componentDidMount
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
              console.log('Locations loaded in Header.js...');
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
  // END componentDidMount

  // handle alert fail
  handleFail = () => {
    console.log('Inside handleFail from Header.js...');
    // Alert
    Alert.alert(
      'Not Logged In',
      'Please login or signup to set a location as home',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: this.handleLogin },
      ],
      { cancelable: false },
    );
  }

  // handle alert success
  handleSuccess = () => {
    console.log('Inside handleSuccess from Header.js...');
    // Alert
    Alert.alert(
      'Success',
      'New location set as home',
      [
        { text: 'OK', style: 'cancel' },
      ],
      { cancelable: false },
    );
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

  // handle home
  handleHome(val) {
    let mounted = true;
    if (mounted) {
      console.log('Inside handleHome from Header.js...');
      var options = {
        currentSavedLat: val[0],
        currentSavedLng: val[1],
        currentSavedName: val[2]
      }
      console.log(options);
      // check firebase for user
      var user = firebase.auth().currentUser;
      if (user) {
        console.log('User ID:  ' + user.uid);
        console.log('User email:  ' + user.providerData[0].email);
        // user is signed in
        // load firebase data
        const dbRT = firebase.database();
        // save home location
        dbRT.ref(user.uid + '/home').set({
          lat: options.currentSavedLat,
          lng: options.currentSavedLng,
          location: options.currentSavedName
        }, function (error) {
          if (error) {
            console.log(error);
          } else {
            // no error and user is signed in so:
            console.log('Home location saved...');
          }
        });
      } else {
        // no user is signed in
        console.log('No user is logged in to save details...');
        this.handleFail();
      }
    }
    if (user) {
      this.handleSuccess();
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
            {/* render menu based on user status */}
            <View>
              {this.renderMenuOption()}
            </View>
            {/* set current location as home */}
            <Text
              style={headerStyles.menuText}
              onPress={this.handleHome.bind(this, [
                this.props.currentLat,
                this.props.currentLng,
                this.props.currentLocation
              ])}>
              Set current location to home
            </Text>
            <View>
              {/* saved locations list */}
              {this.state.savedLocations.length > 0 ? (
                <SavedLocations
                  savedLocations={this.state.savedLocations}
                  updateSkyData={this.updateSkyData}
                  handleDelete={this.handleDelete} />
              ) : (
                  <Text style={headerStyles.menuText}>
                    No saved locations yet
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
  menuTitle: {
    color: colours.white,
    fontSize: 19,
    fontFamily: 'allerBd',
    textAlign: 'center',
    marginBottom: 8
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