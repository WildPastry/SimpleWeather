// imports
import AppLoading from 'expo-app-loading';
import { registerRootComponent } from 'expo';
import { Asset } from 'expo-asset';
import React, { Component } from 'react';
// import AppContainer from './navigation';
import Firebase, { FirebaseProvider } from './config/Firebase';
import { StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Login from './screens/Login';

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
		console.log('Inside loadResourcesAsync from Index');
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
		console.log('Inside render from Index...');

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
				<Login />
			</FirebaseProvider>
		);
	}
	// END render Index
}
// END Index

// register
export default registerRootComponent(Index);
