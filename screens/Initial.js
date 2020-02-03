import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import { withFirebaseHOC } from '../config/Firebase';
import colours from './../assets/colours.json';

// START render Initial
class Initial extends Component {

  componentDidMount = async () => {
    try {
      await this.props.firebase.checkUserAuth(user => {
        if (user) {
          // save details if recently logged in
          this.props.navigation.navigate('App');
        } else {
          // if logged out show the login screen
          this.props.navigation.navigate('Auth');
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  // START render Initial
  render() {
    return (
      <AppLoading style={initialStyles.loader} />
    );
  }
   // END render Initial
}
// END render Initial

export default withFirebaseHOC(Initial);

// style
const initialStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: colours.simpleWeather,
    flex: 1,
    justifyContent: 'center'
  }
});