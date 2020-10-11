// imports
import React, { Component } from 'react';
import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Button } from 'react-native-elements';
import SavedLocations from './SavedLocations';
import colours from './../assets/colours.json';
import LottieView from 'lottie-react-native';
import timeout from './../data/timeout.js';

// firebase
import * as firebase from 'firebase';
import { withFirebaseHOC } from '../config/Firebase';
import 'firebase/firestore';
import 'firebase/auth';

// create animated view
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// run timeout function
{
	timeout;
}

// START Header
class Header extends Component {
	constructor() {
		super();
		this.state = {
			progress: false,
			showMenu: false,
		};
		this.handleAnimate = this.handleAnimate.bind(this);
		this.updateSkyData = this.updateSkyData.bind(this);
	}

	// update sky data function
	updateSkyData(val) {
		let mounted = true;
		if (mounted) {
			console.log('Inside handleLocationChange from Header.js...');
			console.log(val, 'From updateSkyData in Header.js');
			var options = {
				googleLat: val['currentSavedLat'],
				googleLng: val['currentSavedLng'],
				googleName: val['currentSavedName'],
			};
			this.props.updateSkyData(options);
		}
		return () => (mounted = false);
	}

	// handle signout
	handleSignout = async () => {
		try {
			await this.props.firebase.signOut();
			this.props.navigation.navigate('Auth');
			console.log('User has been signed out...');
		} catch (error) {
			console.log(error);
		}
	};

	// handle login
	handleLogin = () => this.props.navigation.navigate('Login');

	// handle animation
	handleAnimate = () => {
		let mounted = true;
		if (mounted) {
			console.log('Inside handleAnimate from Header.js...');
			if (this.state.progress === false) {
				this.animation.play(20, 80);
				this.setState({
					progress: true,
					showMenu: true,
				});
			} else {
				console.log('Inside handleAnimate from Header.js...');
				this.animation.play(110, 150);
				this.setState({
					progress: false,
					showMenu: false,
				});
			}
		}
		return () => (mounted = false);
	};

	// Menu options
	renderMenuOption() {
		// Change menu based on user status
		let menuDisplay;
		// load firebase data
		var user = firebase.auth().currentUser;
		if (user) {
			console.log(
				'Current signed in user email:  ' + user.providerData[0].email
			);
			menuDisplay = (
				<Button
					title='Signout'
					onPress={this.handleSignout}
					titleStyle={headerStyles.menuTitle}
					type='clear'
				/>
			);
		} else {
			console.log('No user is logged in...');
			menuDisplay = (
				<Button
					title='Login or create account'
					onPress={this.handleLogin}
					titleStyle={headerStyles.menuTitle}
					type='clear'
				/>
			);
		}
		return menuDisplay;
	}

	// START componentDidMount
	componentDidMount = async () => {
		let isMounted = true;
		if (isMounted) {
			console.log('inside componentDidMount from Header.js');
		}
		return () => (isMounted = false);
	};
	// END componentDidMount

	// START render Header
	render() {
		console.log('Inside render from Header.js...');
		return (
			// master wrap
			<View>
				{/* header wrap */}
				<View style={headerStyles.headerWrap}>
					{/* hamburger */}
					<AnimatedTouchable
						onPress={this.handleAnimate}
						style={{
							height: 35,
							width: 35,
						}}>
						<LottieView
							ref={(animation) => {
								this.animation = animation;
							}}
							source={require('./../assets/animations/hamburger.json')}
							loop={false}
						/>
					</AnimatedTouchable>
					{/* brand wrap */}
					<View style={{ flexDirection: 'row' }}>
						{/* brand text */}
						<Text style={headerStyles.simpleWeather}>SIMPLE WEATHER</Text>
					</View>
					{/* right icon for balance */}
					<View
						style={{
							backgroundColor: colours.spotGreyMed,
							height: 35,
							width: 35,
						}}
					/>
				</View>
				{/* menu */}
				{this.state.showMenu && (
					<View style={headerStyles.menuWrap}>
						{/* render menu based on user status */}
						<View style={headerStyles.border}>{this.renderMenuOption()}</View>
						{/* saved locations list */}
						<View style={headerStyles.listWrap}>
							<SavedLocations
								style={headerStyles.listItems}
								navigation={this.props.navigation}
								currentLat={this.props.currentLat}
								currentLng={this.props.currentLng}
								currentLocation={this.props.currentLocation}
								updateSkyData={this.updateSkyData}
							/>
						</View>
					</View>
				)}
			</View>
		);
	}
	// END render Header
}
// END Header

export default withFirebaseHOC(Header);

// style
const headerStyles = StyleSheet.create({
	flex: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	menuWrap: {
		backgroundColor: colours.spotGreyDark,
		borderBottomColor: colours.spotGrey,
		borderBottomWidth: 1,
	},
	listWrap: {
		backgroundColor: colours.spotGreyDark,
	},
	listItems: {
		paddingTop: 4,
		paddingBottom: 4,
	},
	menuTitle: {
		color: colours.spotYellow,
		fontSize: 18,
		fontFamily: 'allerRg',
		textAlign: 'center',
		padding: 8,
	},
	border: {
		borderBottomColor: colours.spotGrey,
		borderBottomWidth: 1,
	},
	simpleWeather: {
		color: colours.white,
		fontSize: 22,
		fontFamily: 'allerDisplay',
		textAlign: 'center',
		paddingTop: 4,
	},
	headerWrap: {
		paddingRight: 5,
		paddingLeft: 5,
		paddingBottom: 10,
		paddingTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: colours.spotGreyMed,
		borderBottomColor: colours.spotGrey,
		borderBottomWidth: 1,
	},
});
