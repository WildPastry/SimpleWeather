// imports
import React, { Component } from 'react';
import { Modal, Text, StyleSheet, TouchableHighlight, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colours from './../assets/colours.json';

// firebase
import * as firebase from 'firebase';
import { withFirebaseHOC } from '../config/Firebase';
import 'firebase/firestore';
import 'firebase/auth';

// START GlobalModal
class GlobalModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
    this.handleFail = this.handleFail.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  // show/hide modal visibility
  setModalVisible(visible) {
    this.setState({ modalVisible: visible }, () => console.log(this.state.modalVisible));
  }

  // dimiss modal
  dismissModal() {
    console.log('Inside dismissModal from GlobalModal.js...');
    this.setModalVisible(false);
  }

  // handle login
  handleLogin = () => this.props.navigation.navigate('Login');

  // handle alert fail
  handleFail = () => {
    console.log('Inside handleFail from GlobalModal.js...');
    // Alert
    Alert.alert(
      'Not Logged In',
      'Please login or signup to save locations',
      [
        { text: 'Cancel', onPress: this.dismissModal, style: 'cancel' },
        { text: 'Login', onPress: this.handleLogin },
      ],
      { cancelable: false },
    );
  }

  // handle alert success
  handleSuccess = () => {
    console.log('Inside handleSuccess from GlobalModal.js...');
    // Alert
    Alert.alert(
      'Success',
      'Location details have been saved',
      [
        { text: 'OK', onPress: this.dismissModal, style: 'cancel' },
      ],
      { cancelable: false },
    );
  }

  // handle location
  handleLocation = () => {
    let mounted = true;
    if (mounted) {
      console.log('Inside handleLocation from GlobalModal.js...');
      // check firebase for user
      var user = firebase.auth().currentUser;
      console.log('Current user is: ' + user);
      if (user) {
        console.log('User ID:  ' + user.uid);
        console.log('User email:  ' + user.providerData[0].email);
        // user is signed in
        // load firebase data
        const dbRT = firebase.database();
        const ref = dbRT.ref(user.uid);
        const locationRef = ref.child("locations");
        // get signed in users saved data on click
        locationRef.on('value', snapshot => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            let locations = Object.values(data);
            console.log('Location check before saving');
            locations.map((location, index) => {
              console.log(index + ' : ' + location);
            })
            // console.log(locations.location);
            console.log('this.props.currentLocation: ' + this.props.currentLocation);
          } else {
            console.log('No snapshots exist...');
          }
        })
        // get the unique key generated
        var newLocationId = locationRef.push({}).key;
        // save location details to database
        dbRT.ref(user.uid + '/locations/' + newLocationId).set({
          key: newLocationId,
          lat: this.props.currentLat,
          lng: this.props.currentLng,
          location: this.props.currentLocation
        }, function (error) {
          if (error) {
            console.log(error);
          } else {
            // no error and user is signed in so:
            console.log('Location details saved...');
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

  // START render GlobalModal
  render() {
    console.log('Inside render from GlobalModal.js...');
    return (
      <View>
        {/* START modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={globalModalStyles.modalWrapper}>
            <View style={globalModalStyles.buttonsWrapper}>
              {/* text */}
              <Text style={globalModalStyles.text}>
                Save this location?
              </Text>
            </View>
            <View style={globalModalStyles.buttonsWrapper}>
              {/* close modal buttons */}
              <TouchableHighlight
                style={{ padding: 12 }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                {/* cancel */}
                <Ionicons
                  name='ios-close-circle'
                  size={45}
                  color={colours.spotOrange}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={{ padding: 12 }}
                onPress={this.handleLocation}>
                {/* save */}
                <Ionicons
                  name='ios-checkmark-circle'
                  size={45}
                  color={colours.spotGreen}
                />
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        {/* END modal */}
        {/* show modal button */}
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Ionicons
            name='ios-add-circle'
            size={30}
            color={colours.white}
          />
        </TouchableHighlight>
      </View>
    );
  }
  // END render GlobalModal
}
// END GlobalModal

export default withFirebaseHOC(GlobalModal);

// style
const globalModalStyles = StyleSheet.create({
  modalWrapper: {
    alignItems: 'center',
    backgroundColor: colours.simpleWeather,
    flex: 1,
    justifyContent: 'center'
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: colours.white,
    fontSize: 19,
    fontFamily: 'allerLt',
    textAlign: 'center'
  }
});