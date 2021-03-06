// imports
import AppLoading from 'expo-app-loading';
import { registerRootComponent } from 'expo';
import { Asset } from 'expo-asset';
import React, { Component } from 'react';
import AppContainer from './navigation';
import Firebase, { FirebaseProvider } from './config/Firebase';
import { StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

// set status bar text colour
StatusBar.setBarStyle('light-content', true);

// START Index
class Index extends Component {
	// control requests
	constructor(props) {
		super(props);
		this.state = {
			isReady: false
		};
	}

	// load resources
	async loadResourcesAsync() {
		await Promise.all([
			Asset.loadAsync([require('./assets/brand.png'), require('./assets/icon.png')]),
			Font.loadAsync({
				...Ionicons.font,
				merriWeatherLt: require('./assets/fonts/MerriweatherSans-Light.ttf'),
				merriWeatherRg: require('./assets/fonts/MerriweatherSans-Regular.ttf'),
				merriWeatherBd: require('./assets/fonts/MerriweatherSans-Bold.ttf'),
				allerLt: require('./assets/fonts/Aller_Lt.ttf'),
				allerRg: require('./assets/fonts/Aller_Rg.ttf'),
				allerBd: require('./assets/fonts/Aller_Bd.ttf'),
				allerDisplay: require('./assets/fonts/AllerDisplay.ttf'),
				weatherfont: require('./assets/fonts/weathericons-regular-webfont.ttf')
			})
		]);
	}

	// START render Index
	render() {
		if (!this.state.isReady) {
			return (
				<AppLoading
					startAsync={() => this.loadResourcesAsync()}
					onFinish={() => this.setState({ isReady: true })}
					onError={console.warn}
				/>
			);
		}
		return (
			<FirebaseProvider value={Firebase}>
				<AppContainer />
			</FirebaseProvider>
		);
	}
	// END render Index
}
// END Index

// register
export default registerRootComponent(Index);
