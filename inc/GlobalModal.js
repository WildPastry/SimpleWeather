// imports
import React, { Component } from 'react';
import { Modal, Text, StyleSheet, TouchableHighlight, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colours from './../assets/colours.json';
// import configData from './../data/config.json';

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

  // componentDidMount = async () => {
  //   let mounted = true;
  //   if (mounted) {
  //     // load firebase data
  //     const user = firebase.auth().currentUser;
  //     const db = firebase.firestore();
  //     // check for logged in users on load
  //     if (user) {
  //       var docRef = db.collection("users").doc(user.uid);
  //       docRef.get().then(function (doc) {
  //         if (doc.exists) {
  //           console.log("User", doc.data().name, "is logged in");
  //         } else {
  //           console.log("No docs exist...");
  //         }
  //       }).catch(function (error) {
  //         console.log("Error getting document:", error);
  //       });
  //     } else {
  //       console.log('No user is currently logged in...');
  //     }
  //     // get users saved data on load
  //     // locationRef.on('value', snapshot => {
  //     //   if (snapshot.exists()) {
  //     //     let data = snapshot.val();
  //     //     let locations = Object.values(data);
  //     //     this.setState({ savedLocations: locations }, function () {
  //     //       console.log(this.state.savedLocations);
  //     //     })
  //     //   } else {
  //     //     this.setState({
  //     //       savedLocations: ''
  //     //     });
  //     //   }
  //     // })
  //   }
  //   return () => mounted = false;
  // }

  // handle location
  handleLocation = () => {
    let mounted = true;
    if (mounted) {
      console.log('Handle location pressed...');
      // load firebase data
      const user = firebase.auth().currentUser;
      const db = firebase.database();
      const ref = db.ref(user.uid);
      const locationRef = ref.child("locations");
      // get the unique key generated
      var newLocationId = locationRef.push({}).key;
      // save location details to database
      db.ref(user.uid + '/locations/' + newLocationId).set({
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