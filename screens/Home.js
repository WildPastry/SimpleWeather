// imports
import React, { Component } from 'react';
import { withFirebaseHOC } from '../config/Firebase';
import Firebase, { FirebaseProvider } from '../config/Firebase';
import App from './../App';

// START Home
class Home extends Component {
  componentDidMount = async () => {
  }
// START render Home
  render() {
    console.log('Inside render from Home.js...');
    return (
      <FirebaseProvider value={Firebase}>
        <App navigation={ this.props.navigation } />
      </FirebaseProvider>
    )
  }
  // END render Home
}
// END Home

export default withFirebaseHOC(Home);
