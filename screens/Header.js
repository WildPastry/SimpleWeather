// imports
import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  }

  renderMenuOption() {
    // Change menu based on user status
    let menuDisplay;
    // load firebase data
    var user = firebase.auth().currentUser;
    if (user) {
      console.log('User ID:  ' + user.uid);
      console.log('User email:  ' + user.providerData[0].email);
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
      console.log(user);
      // try {
      //   await new Promise((resolve, reject) =>
      //     app.auth().onAuthStateChanged(
      //       user => {
      //         if (user) {
      //           // User is signed in.
      //           console.log(user);
      //           resolve(user)
      //         } else {
      //           // No user is signed in.
      //           console.log('no user logged in');
      //           reject('no user logged in');
      //         }
      //       },
      //       // Prevent console error
      //       error => reject(error)
      //     )
      //   )
      //   return true
      // } catch (error) {
      //   return false
      // }
      // check firebase for user
      // firebase.auth().onAuthStateChanged(function (user) {
      // console.log(firebase.auth().currentUser.isAnonymous)
      // console.log(firebase.auth().currentUser)
      if (user) {
        const db = firebase.firestore();
        const dbRT = firebase.database();
        const ref = dbRT.ref(user.uid);
        const locationRef = ref.child("locations");
        var docRef = db.collection("users").doc(user.uid);
        docRef.get().then(function (doc) {
          if (doc.exists) {
            console.log("User", doc.data().name, "is logged in");
          } else {
            console.log("No docs exist...");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
        // get users saved data on load
        locationRef.once('value', snapshot => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            let locations = Object.values(data);
            this.setState({ savedLocations: locations }, function () {
              console.log(this.state.savedLocations);
            })
          } else {
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
    let mounted = true;
    if (mounted) {
      console.log(val);
      dbRT.ref(user.uid + '/locations/' + val).remove();
    }
    return () => mounted = false;
  }

  // handle signout
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      // console.log("User", user, "is logged in");
      this.props.navigation.navigate('Auth');
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

  // START render Header
  render() {
    console.log('Inside render from Header...');
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