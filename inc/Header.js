// imports
import React from 'react';

// default component functions
import { Animated, Easing, Image, Text, TouchableOpacity, View } from 'react-native';

// brand icon
import BrandIcon from './../assets/brand.png';

// colours
import colours from './../assets/colours.json';

// import lottie
import LottieView from 'lottie-react-native';

// stylesheet
var styles = require('../styles.js');

// create animated view
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// START header
class Header extends React.Component {
  // default class header constructor
  constructor(props) {
    super(props);
    this.state = {
      progress: false,
    };
    // bind functions to state
    this.handleAnimate = this.handleAnimate.bind(this);
  }

  // handle animation
  handleAnimate = () => {
    console.log('Animating from 20...');
    if (this.state.progress === false) {
      this.setState({
        progress: true
      }, () => { this.animation.play(20, 80); });
    } else {
      console.log('Animating from 110...');
      this.setState({
        progress: false
      }, () => { this.animation.play(110, 150); });
    }
  }

  // START render header
  render() {

    return (
      // header wrap
      <View style={styles.headerWrap}>
        {/* hamburger */}
        <AnimatedTouchable onPress={this.handleAnimate} style={{
          height: 35,
          width: 35,
        }}>
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            source={require('./../assets/animations/hamburger.json')}
            loop={false}
          />
        </AnimatedTouchable>
        {/* brand wrap */}
        <View style={{ flexDirection: 'row' }}>
          {/* brand text */}
          <Text
            style={{
              color: colours.white,
              fontSize: 23,
              fontFamily: 'allerDisplay',
              textAlign: 'center',
              paddingTop: 4
            }}>
            SIMPLE WEATHER
             </Text>
          {/* brand logo */}
          <Image
            style={styles.brandIconSmall}
            source={BrandIcon}
            resizeMode='contain'
          />
        </View>
        {/* right icon for balance */}
        <View style={{
          backgroundColor: '#303030',
          height: 35,
          width: 35
        }} />
      </View>
    );
  }
  // END render header
}
// END header

export default Header;
