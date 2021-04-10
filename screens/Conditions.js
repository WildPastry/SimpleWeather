/** @format */

// imports
import React, {Component} from 'react';
import {
  Modal,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  View,
} from 'react-native';
import FormButton from '../components/FormButton';
import AppLogo from '../components/AppLogo';
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
                {/* terms and conditions */}
                <Text style={conditionStyles.helpTextYellow}>AGREEMENT TO TERMS</Text>
                <Text style={conditionStyles.helpTextWhite}>
                  These Terms and Conditions constitute a legally binding agreement made
                  between you, whether personally or on behalf of an entity (“you”) and
                  [business entity name] (“we,” “us” or “our”), concerning your access to
                  and use of the [website name.com] website as well as any other media
                  form, media channel, mobile website or mobile application related,
                  linked, or otherwise connected thereto (collectively, the “Site”).
                  {'\n\n'}You agree that by accessing the Site, you have read, understood,
                  and agree to be bound by all of these Terms and Conditions. If you do
                  not agree with all of these Terms and Conditions, then you are expressly
                  prohibited from using the Site and you must discontinue use immediately.
                  {'\n\n'}Supplemental terms and conditions or documents that may be
                  posted on the Site from time to time are hereby expressly incorporated
                  herein by reference. We reserve the right, in our sole discretion, to
                  make changes or modifications to these Terms and Conditions at any time
                  and for any reason.{'\n\n'}We will alert you about any changes by
                  updating the “Last updated” date of these Terms and Conditions, and you
                  waive any right to receive specific notice of each such change.{'\n\n'}
                  It is your responsibility to periodically review these Terms and
                  Conditions to stay informed of updates. You will be subject to, and will
                  be deemed to have been made aware of and to have accepted, the changes
                  in any revised Terms and Conditions by your continued use of the Site
                  after the date such revised Terms and Conditions are posted.{'\n\n'}The
                  information provided on the Site is not intended for distribution to or
                  use by any person or entity in any jurisdiction or country where such
                  distribution or use would be contrary to law or regulation or which
                  would subject us to any registration requirement within such
                  jurisdiction or country.
                  {'\n\n'}Accordingly, those persons who choose to access the Site from
                  other locations do so on their own initiative and are solely responsible
                  for compliance with local laws, if and to the extent local laws are
                  applicable.
                </Text>
                <Text style={conditionStyles.helpTextYellow}>USER REGISTRATION</Text>
                <Text style={conditionStyles.helpTextWhite}>
                  You may be required to register with the Site. You agree to keep your
                  password confidential and will be responsible for all use of your
                  account and password. We reserve the right to remove, reclaim, or change
                  a username you select if we determine, in our sole discretion, that such
                  username is inappropriate, obscene, or otherwise objectionable.
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
              fontSize: 16,
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
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'allerLt',
    textAlign: 'left',
    padding: 8,
  },
  helpTextYellowBold: {
    color: colours.spotYellow,
    fontSize: 18,
    fontFamily: 'allerBd',
    textAlign: 'left',
    padding: 8,
  },
  helpTextYellow: {
    color: colours.spotYellow,
    fontSize: 18,
    fontFamily: 'allerLt',
    textAlign: 'left',
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
