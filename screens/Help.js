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
  TouchableOpacity,
  View,
} from 'react-native';
import FormButton from '../components/FormButton';
import AppLogo from '../components/AppLogo';
import {Ionicons} from '@expo/vector-icons';
import colours from './../assets/colours.json';

// START Help
class Help extends Component {
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
    console.log('Inside componentDidMount from Help.js...');
  };

  // show/hide modal visibility
  setModalVisible(visible) {
    this.setState({modalVisible: visible}, () =>
      console.log('Is modal visible? ' + this.state.modalVisible)
    );
  }

  // dimiss modal
  dismissModal() {
    console.log('Inside dismissModal from Help.js...');
    this.setModalVisible(false);
  }

  // START Help
  render() {
    console.log('Inside render from Help.js...');
    return (
      <View>
        {/* START modal */}
        <Modal animationType='fade' transparent={true} visible={this.state.modalVisible}>
          {/* container */}
          <View style={helpStyles.modalWrapper}>
            <ScrollView style={{marginTop: 45, marginBottom: 45}}>
              {/* logo and heading */}
              <View style={helpStyles.logoContainer}>
                <AppLogo />
              </View>
              <Text style={helpStyles.simpleWeather}>SIMPLE WEATHER</Text>
              {/* help text */}
              <View style={helpStyles.textWrapper}>
                {/* line break */}
                <View style={helpStyles.border} />
                <Text style={helpStyles.helpTextWhite}>
                  A basic weather app designed to give you fast and accurate data to
                  thousands of locations worldwide.
                </Text>
                <Text style={helpStyles.helpTextWhite}>
                  Once you sign up to the app you will have access to the features below.
                </Text>
                {/* line break */}
                <View style={helpStyles.border} />
                {/* intro line */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={helpStyles.helpTextWhite}>Search for a location</Text>
                  <Ionicons name='ios-search' size={30} color={colours.white} />
                </View>
                {/* saved locations */}
                {/* <Text style={helpStyles.helpTextYellowBold}>SAVED LOCATIONS</Text> */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={helpStyles.helpTextWhite}>Save up to 5 locations</Text>
                  <Ionicons name='ios-add-circle' size={30} color={colours.white} />
                </View>
                {/* set location as home */}
                {/* <Text style={helpStyles.helpTextGreenBold}>HOME LOCATION</Text> */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={helpStyles.helpTextWhite}>Set a location to home</Text>
                  <Ionicons name='ios-home' size={30} color={colours.spotGreen} />
                </View>
                {/* line break */}
                <View style={helpStyles.border} />
                {/* support the dev */}
                <Text style={helpStyles.helpTextYellow}>
                  If you enjoy the app you can support the developer
                  <Text
                    style={helpStyles.helpTextRedBold}
                    onPress={() => Linking.openURL('https://mikeparker.co.nz/')}>
                    {' '}
                    HERE
                  </Text>
                </Text>
                {/* <TouchableOpacity
									onPress={() => Linking.openURL('mailto:support@example.com')}>
									<Text>support@example.com</Text>
								</TouchableOpacity> */}
              </View>
              {/* confirm button */}
              <View style={helpStyles.buttonContainer}>
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
          <Text style={helpStyles.helpTextYellowBold}>SUPPORT / HELP</Text>
        </TouchableHighlight>
      </View>
    );
  }
  // END render Help
}
// END render Help

export default Help;

// style
const helpStyles = StyleSheet.create({
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
    marginTop: 10,
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
