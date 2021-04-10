/** @format */

// imports
import React, {Component} from 'react';
import {withFirebaseHOC} from '../config/Firebase';
import Firebase, {FirebaseProvider} from '../config/Firebase';
import App from './../App';

// START Home
class Home extends Component {
  // START render Home
  render() {
    console.log('Inside render from Home.js...');
    // check for data from the skip login screen
    let currentData;
    const params = this.props.navigation.state;
    console.log(params, 'from Home.js...');
    if (params.params !== undefined) {
      currentData = params.params.params.options;
    } else {
      currentData = {
        googleName: 'Wellington, New Zealand',
        googleLat: '-41.2865',
        googleLng: '174.7762',
      };
    }
    // send it through and load the main APP
    return (
      <FirebaseProvider value={Firebase}>
        <App navigation={this.props.navigation} currentData={currentData} />
      </FirebaseProvider>
    );
  }
  // END render Home
}
// END Home

export default withFirebaseHOC(Home);
