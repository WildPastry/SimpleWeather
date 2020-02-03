import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { withFirebaseHOC } from '../config/Firebase';

// START Initial
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

  // START Initial
  render() {
    console.log('Inside render from Initial...');
    return (
      <AppLoading />
    );
  }
   // END render Initial
}
// END render Initial

export default withFirebaseHOC(Initial);