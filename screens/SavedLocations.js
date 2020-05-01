// imports
import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import colours from './../assets/colours.json';

// firebase
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// START SavedLocations
class SavedLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // home icon
      home: ''
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.updateSkyData = this.updateSkyData.bind(this);
  }

  // static proptypes
  static propTypes = {
    savedLocations: PropTypes.array.isRequired
  };

  // handle delete
  handleDelete = (val) => {
    let mounted = true;
    if (mounted) {
      this.props.handleDelete(val);
    }
    return () => mounted = false;
  }

  // handle alert
  handleAlert = (val) => {
    console.log('Inside handleAlert from SavedLocations.js...');
    console.log('Value is: ' + val);
    // Alert
    Alert.alert(
      'Remove Location',
      'Are you sure you want to remove this saved location?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => this.handleDelete(val) },
      ],
      { cancelable: false },
    );
  }

  // handle location change
  updateSkyData = (val) => {
    let mounted = true;
    if (mounted) {
      var options = {
        currentSavedLat: val[0],
        currentSavedLng: val[1],
        currentSavedName: val[2]
      }
      this.props.updateSkyData(options);
    }
    return () => mounted = false;
  }

  // START component mounted
  // componentDidMount() {
  //   // check firebase for user
  //   var user = firebase.auth().currentUser;
  //   if (user) {
  //     // user is signed in
  //     // load firebase data
  //     const dbRT = firebase.database();
  //     const ref = dbRT.ref(user.uid);
  //     const homeRef = ref.child("home");
  //     // get signed in users saved data on load
  //     homeRef.on('value', snapshot => {
  //       if (snapshot.exists()) {
  //         let home = snapshot.val();
  //         console.log(home);
  //         this.setState({
  //           home: home
  //         });
  //       } else {
  //         console.log('No home saved...');
  //       }
  //     });
  //     // no user
  //   }
  // }
  // END component mounted

  // START render SavedLocations
  render() {
    console.log('Inside render from SavedLocations.js...');
    return (
      <View>
        {this.props.savedLocations.map((location, index) => {
          return (
            <View style={savedLocationStyles.locationListWrapper} key={index}>
              {/* <Ionicons
                name='ios-home'
                size={30}
                color={colours.spotYellow}
              /> */}
              <Text
                onPress={this.updateSkyData.bind(this, [
                  location.lat,
                  location.lng,
                  location.location
                ])}
                style={savedLocationStyles.locationListText}>{location.location}
              </Text>
              <Ionicons
                onPress={this.handleAlert.bind(this, location.key)}
                name='ios-close-circle'
                size={30}
                color={colours.white}
              />
            </View>
          );
        })}
      </View>
    );
  }
  // END render SavedLocations
}
// END SavedLocations

export default SavedLocations;

// style
const savedLocationStyles = StyleSheet.create({
  locationListWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  locationListText: {
    fontSize: 19,
    fontFamily: 'allerLt',
    color: colours.white,
    padding: 9,
    marginBottom: 3
  }
});