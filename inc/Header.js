// imports
import React from 'react';

// default component functions
import { Animated, Button, Easing, Image, Text, View } from 'react-native';

// brand icon
import BrandIcon from './../assets/brand.png';

// colours
import colours from './../assets/colours.json';

// import lottie
import LottieView from 'lottie-react-native';

// stylesheet
var styles = require('../styles.js');

// START header
class Header extends React.Component {
  // default class header constructor
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
    // bind functions to state
    this.handleAnimate = this.handleAnimate.bind(this);
  }

  // START component mounted
  handleAnimate = () => {
    console.log('Animating...');
}

  // handleAnimate() {
  //   console.log('Animating...');
  //   // play animation
  //   // this.animation.play();
  //   // Animated.timing(this.state.progress, {
  //   //   toValue: 1,
  //   //   duration: 5000,
  //   //   easing: Easing.linear,
  //   // }).start();
  // }
  // END component mounted

  // START render header
  render() {

    return (
      // header wrap
      <View style={styles.headerWrap}>
        {/* title display wrapper */}
        {/* <View style={{
          flexDirection: 'row',
          padding: 12
        }}> */}
        <Button
 onPress={this.handleAnimate}
 title="Click ME"
 color="blue"
/>
        <LottieView
          style={{
            alignSelf: "flex-start",
            height: 30,
            width: 30,
            padding: 10
          }}
          ref={animation => {
            this.animation = animation;
          }}
          source={require('./../assets/animations/hamburger.json')}
          progress={this.state.progress}
          
        />

        {/* <View style={{ alignSelf: "center" }}> */}
          {/* logo */}
          {/* <Image
            style={styles.brandIconSmall}
            source={BrandIcon}
            resizeMode='contain'
          /> */}
          {/* text */}
          <View style={{
            // height: 35,
            // justifyContent: 'center'
          }}>
            <Text
              style={{
                color: colours.white,
                fontSize: 23,
                fontFamily: 'allerDisplay',
                textAlign: 'center',
              }}>
              SIMPLE WEATHER
             </Text>
          </View>
        {/* </View> */}

        {/* </View> */}
      </View>
    );
  }
  // END render header
}
// END header

export default Header;
