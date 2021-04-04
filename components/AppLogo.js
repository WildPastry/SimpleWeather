import React from 'react';
import { Dimensions, View } from 'react-native';
import { Image } from 'react-native-elements';
import LottieView from 'lottie-react-native';

// Size function for the main icon
const { width, height } = Dimensions.get('window');

var iconHeight, iconWidth;

if (width < 300) {
	iconHeight = 190;
	iconWidth = 190;
} else {
	iconHeight = 215;
	iconWidth = 215;
}

const AppLogo = () => (
	<View>
		<Image
			source={require('../assets/brand.png')}
			style={{ width: 100, height: 100 }}
		/>
		{/* main icon */}
		{/* <LottieView
			style={{
				height: iconHeight,
				width: iconWidth,
			}}
			ref={(animation) => {
				this.animation = animation;
			}}
			source={currentWeatherIcon}
			autoPlay={true}
		/> */}
	</View>
);

export default AppLogo;
