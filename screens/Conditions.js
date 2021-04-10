/** @format */

// imports
import React, {Component} from 'react';
import {
  Linking,
  Modal,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  View,
} from 'react-native';
import FormButton from '../components/FormButton';
import AppLogo from '../components/AppLogo';
import {Ionicons} from '@expo/vector-icons';
import colours from './../assets/colours.json';

// START Conditions
class Conditions extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
  }

  // componentDidMount
  componentDidMount = async () => {
    console.log('Inside componentDidMount from Conditions.js...');
  };

  // show/hide modal visibility
  setModalVisible(visible) {
    this.setState({modalVisible: visible}, () =>
      console.log('Is modal visible? ' + this.state.modalVisible)
    );
  }

  // dimiss modal
  dismissModal() {
    console.log('Inside dismissModal from Conditions.js...');
    this.setModalVisible(false);
  }

  // START Conditions
  render() {
    console.log('Inside render from Conditions.js...');
    return (
      <View>
        {/* START modal */}
        <Modal animationType='fade' transparent={true} visible={this.state.modalVisible}>
          {/* container */}
          <View style={conditionStyles.modalWrapper}>
            <ScrollView style={{marginTop: 45, marginBottom: 45}}>
              {/* logo and heading */}
              <View style={conditionStyles.logoContainer}>
                <AppLogo />
              </View>
              <Text style={conditionStyles.simpleWeather}>SIMPLE WEATHER</Text>
              {/* text wrapper */}
              <View style={conditionStyles.textWrapper}>
                {/* line break */}
                <View style={conditionStyles.border} />
                {/* support the dev */}
                <Text style={conditionStyles.helpTextYellow}>Terms and conditions</Text>
                {/* terms and conditions */}
                <Text style={conditionStyles.helpTextWhite}>
                  A basic weather app designed to give you fast and accurate data to
                  thousands of locations worldwide.
                </Text>
                <Text style={conditionStyles.helpTextWhite}>
                  Once you sign up to the app you will have access to the features below.
                </Text>
                {/* line break */}
                <View style={conditionStyles.border} />
              </View>
              {/* confirm button */}
              <View style={conditionStyles.buttonContainer}>
                <FormButton
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  title='BACK'
                />
              </View>
            </ScrollView>
          </View>
        </Modal>
        {/* END modal */}
        {/* show modal button */}
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text
            style={{
              color: colours.spotRed,
              textAlign: 'center',
              fontFamily: 'allerLt',
              fontSize: 15,
            }}>
            Read terms and conditions
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
  // END render Conditions
}
// END render Conditions

export default Conditions;

// style
const conditionStyles = StyleSheet.create({
  modalWrapper: {
    alignItems: 'center',
    backgroundColor: colours.spotGreyMed,
    flex: 1,
    justifyContent: 'center',
  },
  textWrapper: {
    marginLeft: 25,
    marginRight: 25,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  border: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: colours.spotGrey,
    borderBottomWidth: 1,
  },
  helpTextWhite: {
    color: colours.white,
    fontSize: 18,
    fontFamily: 'allerLt',
    textAlign: 'center',
    padding: 8,
  },
  helpTextYellowBold: {
    color: colours.spotYellow,
    fontSize: 18,
    fontFamily: 'allerBd',
    textAlign: 'center',
    padding: 8,
  },
  helpTextYellow: {
    color: colours.spotYellow,
    fontSize: 18,
    fontFamily: 'allerLt',
    textAlign: 'center',
    padding: 8,
  },
  helpTextBlue: {
    color: colours.spotBlue,
    fontSize: 18,
    fontFamily: 'allerLt',
    textAlign: 'center',
    padding: 8,
  },
  helpTextGreen: {
    color: colours.spotGreen,
    fontSize: 18,
    fontFamily: 'allerLt',
    textAlign: 'center',
    padding: 8,
  },
  helpTextGreenBold: {
    color: colours.spotGreen,
    fontSize: 18,
    fontFamily: 'allerBd',
    textAlign: 'center',
    padding: 8,
  },
  helpTextRed: {
    color: colours.spotRed,
    fontSize: 18,
    fontFamily: 'allerLt',
    textAlign: 'center',
    padding: 8,
  },
  helpTextRedBold: {
    color: colours.spotRed,
    fontSize: 18,
    fontFamily: 'allerBd',
    textAlign: 'center',
    padding: 8,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    marginTop: 20,
  },
  logoContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  simpleWeather: {
    color: colours.white,
    fontSize: 20,
    fontFamily: 'allerDisplay',
    textAlign: 'center',
    paddingTop: 4,
    marginBottom: 10,
  },
});
