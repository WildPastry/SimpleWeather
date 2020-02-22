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
  state = {
    modalVisible: false,
  };
  // show/hide modal visibility
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // handle login
  handleLogin = () => this.props.navigation.navigate('Login');

  // handle location
  handleLocation = () => {
    let mounted = true;
    if (mounted) {
      console.log('Handle location pressed...');
      // check firebase for user
      var user = firebase.auth().currentUser;
      console.log(user);
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
            console.log(locations);
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
            console.log('Location details saved...');
          }
        });

      } else {
        // no user is signed in
        Alert.alert(
          'Not Logged In',
          'Please login or signup to save locations',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      }
    }
    this.setModalVisible(false);
    return () => mounted = false;
  }

  // START render GlobalModal
  render() {
    console.log('Inside render from GlobalModal...');
    return (
      <View>
        {/* START modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
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
                  color={colours.niceRed}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={{ padding: 12 }}
                onPress={this.handleLocation}>
                {/* save */}
                <Ionicons
                  name='ios-checkmark-circle'
                  size={45}
                  color={colours.niceGreen}
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
    backgroundColor: '#303030',
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