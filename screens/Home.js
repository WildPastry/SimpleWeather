/** @format */

// imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {withFirebaseHOC} from '../config/Firebase';
import Firebase, {FirebaseProvider} from '../config/Firebase';
import App from './../App';

// START Home
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // skip login data
      googleLat: '',
      googleLng: '',
      googleName: '',
    };
  }

  // componentDidMount
  componentDidMount = async () => {
    const {params} = this.props.navigation.state;
    const skipLogin = params.params.options;
    if (skipLogin) {
      this.setState(
        {
          skipLogin: skipLogin,
          googleLat: skipLogin['googleLat'],
          googleLng: skipLogin['googleLng'],
          googleName: skipLogin['googleName'],
        },
        () => {
          console.log(skipLogin, this.state, 'From Home.js...');
        }
      );
    }
  };

  // START render Home
  render() {
    console.log('Inside render from Home.js...');
    return (
      // <View>
      //   <Text>DATA</Text>
      // </View>
      <FirebaseProvider value={Firebase}>
        <App 
        navigation={this.props.navigation} 
        skipLogin={this.state.skipLogin}
        currentLat={this.state.googleLat}
        currentLng={this.state.googleLng}
        currentLocation={this.state.googleName}
        />
      </FirebaseProvider>
    );
  }
  // END render Home
}
// END Home

export default withFirebaseHOC(Home);
