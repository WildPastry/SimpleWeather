/** @format */

// imports
import React, {Component} from 'react';
import configData from './../data/config.json';
import {
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import {Dimensions} from 'react-native';
import FormButton from '../components/FormButton';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {withFirebaseHOC} from '../config/Firebase';
import colours from '../assets/colours.json';

// set up auth key for google data
const geo = configData.GEO;

// START SelectLocation
class SelectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // autocomplete information
      googleLat: '',
      googleLng: '',
      googleName: '',
      // placeholder clear
      placeholder: 'Enter Location',
      // google places listview
      listViewDisplayed: true,
      // button display
      isValid: false,
    };
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }

  // navigation functions
  goToSignup = () => this.props.navigation.navigate('Login');
  goToHome = (options) =>
    this.props.navigation.navigate('Home', {
      type: 'Navigate',
      routeName: 'Home',
      params: {options: options},
    });

  // select location if not signing in
  selectLocation = () => {
    console.log('Ready to load location...');
    var options = {
      googleLat: this.state.googleLat,
      googleLng: this.state.googleLng,
      googleName: this.state.googleName,
    };
    console.log(options);
    this.goToHome(options);
  };

  // keyboard did mount function
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  // keyboard will un-mount function
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  // keyboard shown
  _keyboardDidShow() {
    this.setState({
      listViewDisplayed: true,
    });
  }

  // keyboard hidden
  _keyboardDidHide() {
    this.setState({
      listViewDisplayed: false,
    });
  }

  // START render SelectLocation
  render() {
    console.log('Inside render from SelectLocation...');
    var width = Dimensions.get('window').width;
    return (
      <SafeAreaView
        keyboardShouldPersistTaps='handled'
        style={SelectLocationStyles.container}>
        {/* autocomplete input */}
        <GooglePlacesAutocomplete
          keyboardShouldPersistTaps='handled'
          placeholder={this.state.placeholder}
          placeholderTextColor={colours.white}
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          listViewDisplayed={this.state.listViewDisplayed}
          fetchDetails={true}
          renderDescription={(row) => row.description}
          onPress={(data, details = null) => {
            // fix google names
            var updatedAddress = details.formatted_address.replace(/^[\s\d]+/, '');
            // send sky data to the the app
            this.setState({
              // set state with google details
              googleLat: details.geometry.location.lat.toFixed(5),
              googleLng: details.geometry.location.lng.toFixed(5),
              googleName: updatedAddress,
              isValid: true,
            });
          }}
          // data query
          query={{
            key: geo,
            language: 'en',
            types: '(cities)',
          }}
          // google styles
          styles={{
            container: {
              overflow: 'visible',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
            },
            textInputContainer: {
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: colours.spotGreyMed,
              height: 50,
              marginBottom: 35,
              width: '85%',
            },
            textInput: {
              alignItems: 'center',
              backgroundColor: colours.spotGreyMed,
              borderRadius: 0,
              borderBottomColor: colours.spotGrey,
              borderBottomWidth: 0.8,
              borderTopColor: colours.spotGreyMed,
              borderTopWidth: 1,
              color: colours.white,
              height: 50,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              fontFamily: 'allerLt',
              fontSize: 18,
              textAlign: 'center',
              zIndex: 1,
            },
            description: {
              alignItems: 'center',
              color: colours.white,
              fontFamily: 'allerLt',
              textAlign: 'center',
            },
            listView: {
              backgroundColor: colours.spotGreyDark,
              color: colours.white,
              fontFamily: 'allerLt',
              fontSize: 18,
              position: 'absolute',
              marginTop: 50,
              bottom: 0,
              elevation: 1,
            },
            predefinedPlacesDescription: {
              color: colours.white,
              fontFamily: 'allerLt',
              fontSize: 18,
            },
            separator: {
              backgroundColor: colours.spotGreyMed,
              height: 2,
            },
          }}
          // google options
          currentLocation={false}
          currentLocationLabel='Current location'
          nearbyPlacesAPI='GooglePlacesSearch'
          GooglePlacesDetailsQuery={{
            fields: 'geometry,formatted_address',
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          debounce={100}>
          {/* login button */}
          <View
            style={{
              width: width * 0.85,
              marginBottom: 25,
              marginTop: 10,
            }}>
            <FormButton
              onPress={this.selectLocation}
              title='GO'
              disabled={!this.state.isValid}
            />
          </View>
          {/* back to login */}
          <TouchableOpacity style={SelectLocationStyles.link} onPress={this.goToSignup}>
            <Text
              style={{
                color: colours.spotYellow,
                fontFamily: 'allerLt',
                fontSize: 18,
              }}>
              Back to login
            </Text>
          </TouchableOpacity>
        </GooglePlacesAutocomplete>
      </SafeAreaView>
    );
  }
  // END render SelectLocation
}
// END SelectLocation

// style
const SelectLocationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.spotGreyMed,
    justifyContent: 'center',
  },
  currentWrap: {
    flex: 1,
  },
  masterWrap: {
    flex: 1,
  },
  link: {
    alignItems: 'center',
    margin: 8,
  },
});

export default withFirebaseHOC(SelectLocation);
