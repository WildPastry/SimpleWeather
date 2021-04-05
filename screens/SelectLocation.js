/** @format */

// imports
import React, {Component, Fragment} from 'react';
import configData from './../data/config.json';
import {
  Text,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {withFirebaseHOC} from '../config/Firebase';
import colours from '../assets/colours.json';
import {Ionicons} from '@expo/vector-icons';

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
      placeholder: 'Enter Location . . .',
      // google places listview
      listViewDisplayed: true,
      // button display
      isValid: false,
    };
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }

  // navigation function
  goToSignup = () => this.props.navigation.navigate('Login');

  // select location if not signing in
  selectLocation = () => {
    console.log('Ready to load location...');
    var options = {
      googleLat: this.state.googleLat,
      googleLng: this.state.googleLng,
      googleName: this.state.googleName,
    };
    console.log(options);
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
      placeholder: '',
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
    return (
      <SafeAreaView
        keyboardShouldPersistTaps='handled'
        style={SelectLocationStyles.container}>
        <View style={SelectLocationStyles.currentWrap} />
        {/* <Fragment>
          <FormInput
            iconName='ios-search'
            iconColor={colours.white}
          />
        </Fragment> */}
        {/* search button */}
        {/* <View
          pointerEvents='none'
          style={{
            zIndex: 2,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '10%',
            height: 50,
            overflow: 'visible',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name='ios-search' size={30} color={colours.white} />
        </View> */}

        {/* autocomplete input */}
        <View style={SelectLocationStyles.currentWrap}>
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
              zIndex: 1,
              position: 'relative',
              width: '100%',
              overflow: 'visible',
            },
            textInputContainer: {
              alignContent: 'center',
              backgroundColor: colours.spotGreyMed,
              height: 50,
              width: '100%',
            },
            textInput: {
              alignItems: 'center',
              backgroundColor: colours.spotGreyMed,
              borderRadius: 0,
              borderBottomColor: colours.white,
              borderBottomWidth: 1,
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
              top: 50,
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
          debounce={100}
        />
        {/* login button */}
        <View style={SelectLocationStyles.buttonContainer}>
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
        </View>
        <View style={SelectLocationStyles.currentWrap} />
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
    flex: 1
  },
  link: {
    alignItems: 'center',
    margin: 8,
  },
  buttonContainer: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default withFirebaseHOC(SelectLocation);
