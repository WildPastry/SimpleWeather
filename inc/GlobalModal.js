// imports
import React, { Component } from 'react';
import { Modal, Text, StyleSheet, TouchableHighlight, View, Alert } from 'react-native';

// icons
import { Ionicons } from '@expo/vector-icons';

// colours
import colours from './../assets/colours.json';

// START globalmodal
class GlobalModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // handle location
  handleLocation = () => {
    let mounted = true;
    if (mounted) {
      console.log('Handle location pressed...');
    }
    return () => mounted = false;
  }

  // START render globalmodal
  render() {
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
              {/* close modal button */}
              <TouchableHighlight
                style={{ padding: 12 }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Ionicons
                  name='ios-close-circle'
                  size={45}
                  color={colours.white}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={{ padding: 12 }}
                onPress={this.handleLocation}>
                <Ionicons
                  name='ios-checkmark-circle'
                  size={45}
                  color={colours.white}
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
  // END render globalmodal
}
// END globalmodal

export default GlobalModal;

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
    justifyContent: 'center'
  },
  text: {
    color: colours.white,
    fontSize: 19,
    fontFamily: 'allerLt',
    textAlign: 'center'
  }
});