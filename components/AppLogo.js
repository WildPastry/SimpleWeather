// imports
import React from 'react';
import { Dimensions, View } from 'react-native';
import { Image } from 'react-native-elements';

// size function for the main logo
const { width } = Dimensions.get('window');

var iconSize;

width < 300 ? iconSize = 90 : iconSize = 125;

const AppLogo = () => (
	<View>
		{/* main icon */}
		<Image
			source={require('../assets/brand.png')}
			style={{ width: iconSize, height: iconSize }}
		/>
	</View>
);

export default AppLogo;
