// imports
import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import colours from './../assets/colours.json';

// firebase
import * as firebase from 'firebase';
import { withFirebaseHOC } from '../config/Firebase';
import 'firebase/firestore';
import 'firebase/auth';

// START SavedLocations
class SavedLocations extends Component {
	constructor() {
		super();
		this.state = {
			home: [],
			savedLocations: [],
			refreshList: false,
		};
		this.handleHome = this.handleHome.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleLocationAlert = this.handleLocationAlert.bind(this);
		this.updateSkyData = this.updateSkyData.bind(this);
	}

	// START component mounted
	componentDidMount() {
		let mounted = true;
		if (mounted) {
			// set temporary array to check for a saved home location
			var checkHome = this.props.savedLocations;
			// check firebase for user
			var user = firebase.auth().currentUser;
			if (user) {
				// user is signed in
				// load firebase data
				const dbRT = firebase.database();
				const ref = dbRT.ref(user.uid);
				const homeRef = ref.child('home');
				// get signed in users saved data on load
				homeRef.once('value', (snapshot) => {
					if (snapshot.exists()) {
						let home = snapshot.val();
						// set the home location as the conditions to check the array
						const conditions = [home.location];
						// loop through and check each value
						Array.from(checkHome).forEach((arg) => {
							var checkVal = conditions.some((e) => arg.location.includes(e));
							arg.icon = checkVal;
						});
						this.setState({
							home: checkHome,
						});
					} else {
						console.log('No home saved...');
					}
				});
				// no user
			}
		}
		return () => (mounted = false);
	}
	// END component mounted

	// check home value
	checkHome = () => {
		let isMounted = true;
		if (isMounted) {
			console.log('Inside checkHome from SavedLocations.js...');
			// set temporary array to check for a saved home location
			var checkHome = this.state.savedLocations;
			// check firebase for user
			var user = firebase.auth().currentUser;
			if (user) {
				// user is signed in
				// load firebase data
				const db = firebase.firestore(),
					dbRT = firebase.database(),
					ref = dbRT.ref(user.uid),
					homeRef = ref.child('home');
				var docRef = db.collection('users').doc(user.uid);
				// check if the signed in user has data saved
				docRef
					.get()
					.then(function (doc) {
						if (doc.exists) {
							console.log(
								'User',
								doc.data().name,
								'is logged in, From checkHome in SavedLocations.js'
							);
						} else {
							console.log('No docs exist...');
						}
					})
					.catch(function (error) {
						console.log('Error getting document:', error);
					});
				// get signed in users saved data on load
				homeRef.once('value', (snapshot) => {
					if (snapshot.exists()) {
						let home = snapshot.val();
						// set the home location as the conditions to check the array
						const conditions = [home.location];
						// loop through and check each value
						Array.from(checkHome).forEach((arg) => {
							var checkVal = conditions.some((e) => arg.location.includes(e));
							arg.icon = checkVal;
							console.log(checkVal);
						});
						console.log(checkHome, 'From checkHome in SavedLocations.js');
						// Save the new array to display the locations
						this.setState({ home: checkHome });
					} else {
						console.log('No home saved...');
					}
				});
				// no user
			} else {
				console.log('No user is currently logged in...');
			}
		}
		return () => (isMounted = false);
	};

	// handle delete
	handleDelete(val) {
		var user = firebase.auth().currentUser;
		const dbRT = firebase.database();
		let isMounted = true;
		if (isMounted) {
			console.log(val, 'From handleDelete in SavedLocations.js');
			dbRT.ref(user.uid + '/locations/' + val).remove();
			this.setState({ refreshList: true });
		}
		return () => (isMounted = false);
	}

	// handle home
	handleHome(val) {
		let isMounted = true;
		if (isMounted) {
			console.log('Inside handleHome from SavedLocations.js...');
			var options = {
				currentSavedLat: val[0],
				currentSavedLng: val[1],
				currentSavedName: val[2],
			};
			console.log(options);
			// check firebase for user
			var user = firebase.auth().currentUser;
			if (user) {
				console.log('User ID:', user.uid);
				console.log('User email:', user.providerData[0].email);
				// user is signed in
				// load firebase data
				const dbRT = firebase.database();
				console.log(this.state.savedLocations.length, 'locations saved...');
				// save home location
				dbRT.ref(user.uid + '/home').set(
					{
						lat: options.currentSavedLat,
						lng: options.currentSavedLng,
						location: options.currentSavedName,
					},
					function (error) {
						if (error) {
							console.log(error);
						} else {
							// no error and user is signed in so:
							console.log('Home location saved...');
							console.log(options.currentSavedName);
							// this.updateSkyData();
							// Alert
							// Alert.alert(
							// 	'Home Location Set',
							// 	'Location has been set to home',
							// 	[{ text: 'Close', style: 'cancel' }],
							// 	{ cancelable: false }
							// );
						}
						this.setState({ refreshList: true });
					}
				);
			} else {
				// no user is signed in
				console.log('No user is logged in to save details...');
			}
		}
		return () => (isMounted = false);
	}

	// handle login
	handleLogin = () => this.props.navigation.navigate('Login');

	// handle home alert
	handleHomeAlert = (val) => {
		let isMounted = true;
		if (isMounted) {
			console.log('Inside handleHomeAlert from SavedLocations.js...');
			console.log('Value is: ', val),
				'from handleHomeAlert in SavedLocations.js...';
			// Alert
			Alert.alert(
				'Set Location as Home',
				'Are you sure you want to set this location to home?',
				[
					{ text: 'No', style: 'cancel' },
					{ text: 'Yes', onPress: () => this.handleHome(val) },
				],
				{ cancelable: false }
			);
		}
		return () => (isMounted = false);
	};

	// handle location alert
	handleLocationAlert = (val) => {
		let isMounted = true;
		if (isMounted) {
			console.log('Inside handleLocationAlert from SavedLocations.js...');
			console.log('Value is: ', val),
				'from handleLocationAlert in SavedLocations.js...';
			// Alert
			Alert.alert(
				'Remove Location',
				'Are you sure you want to remove this saved location?',
				[
					{ text: 'No', style: 'cancel' },
					{ text: 'Yes', onPress: () => this.handleDelete(val) },
				],
				{ cancelable: false }
			);
		}
		return () => (isMounted = false);
	};

	// handle login alert
	handleLoginAlert = () => {
		let isMounted = true;
		if (isMounted) {
			console.log('Inside handleLoginAlert from SavedLocations.js...');
			// Alert
			Alert.alert(
				'Not Logged In',
				'Please login or signup to save locations',
				[
					{ text: 'Cancel', style: 'cancel' },
					{ text: 'Login', onPress: this.handleLogin },
				],
				{ cancelable: false }
			);
		}
		return () => (isMounted = false);
	};

	// update sky data function
	updateSkyData = (val) => {
		let isMounted = true;
		if (isMounted) {
			var options = {
				currentSavedLat: val[0],
				currentSavedLng: val[1],
				currentSavedName: val[2],
			};
			this.props.updateSkyData(options);
		}
		return () => (isMounted = false);
	};

	// START component mounted
	componentDidMount = async () => {
		let isMounted = true;
		if (isMounted) {
			// check firebase for user
			var user = firebase.auth().currentUser;
			if (user) {
				// user is signed in
				// load firebase data
				const db = firebase.firestore();
				const dbRT = firebase.database();
				const ref = dbRT.ref(user.uid);
				// const homeRef = ref.child('home');
				const locationRef = ref.child('locations');
				const docRef = db.collection('users').doc(user.uid);
				// check if the signed in user has data saved
				docRef
					.get()
					.then(function (doc) {
						if (doc.exists) {
							console.log(
								'User',
								doc.data().name,
								'is logged in, From componentDidMount in SavedLocations.js'
							);
						} else {
							console.log('No docs exist...');
						}
					})
					.catch(function (error) {
						console.log('Error getting document:', error);
					});
				// get signed in users saved data on load
				locationRef.once('value', (snapshot) => {
					if (snapshot.exists()) {
						let data = snapshot.val();
						let locations = Object.values(data);
						this.setState({ savedLocations: locations }, () => {
							console.log('Locations loaded in SavedLocations.js...');
							console.log(this.state.savedLocations);
							this.checkHome();
						});
					} else {
						// if they have no locations saved set state to null
						this.setState({
							savedLocations: '',
						});
					}
				});
				// no user
				console.log('No user is currently logged in...');
			}
		}
		return () => (isMounted = false);
	};
	// END component mounted

	// START render SavedLocations
	render() {
		console.log('Inside render from SavedLocations.js...');
		return (
			<View>
				{this.state.savedLocations.length > 0 ? (
					<View>
						{this.state.home.map((location, index) => {
							return (
								<View
									style={savedLocationStyles.locationListWrapper}
									key={index}>
									<Text
										onPress={this.updateSkyData.bind(this, [
											location.lat,
											location.lng,
											location.location,
										])}
										style={savedLocationStyles.locationListText}>
										{location.location}
									</Text>
									<View style={savedLocationStyles.locationIconWrapper}>
										{/* home icon */}
										{location.icon ? (
											<Ionicons
												style={{ marginRight: 15 }}
												name='ios-home'
												size={30}
												color={colours.spotGreen}
											/>
										) : (
											<Ionicons
												style={{ marginRight: 15 }}
												name='ios-home'
												size={30}
												color={colours.spotGrey}
												onPress={this.handleHomeAlert.bind(this, [
													location.lat,
													location.lng,
													location.location,
												])}
											/>
										)}
										{/* remove location icon */}
										<Ionicons
											onPress={this.handleLocationAlert.bind(
												this,
												location.key
											)}
											name='ios-close-circle'
											size={30}
											color={colours.white}
										/>
									</View>
								</View>
							);
						})}
					</View>
				) : (
					<View>
						<Text
							style={savedLocationStyles.menuTextYellow}
							onPress={this.handleLoginAlert}>
							No saved locations
						</Text>
					</View>
				)}
			</View>
		);
	}
	// END render SavedLocations
}
// END SavedLocations

export default withFirebaseHOC(SavedLocations);

// style
const savedLocationStyles = StyleSheet.create({
	locationListWrapper: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 8,
		paddingRight: 8,
	},
	locationListText: {
		fontSize: 18,
		fontFamily: 'allerLt',
		color: colours.white,
		padding: 9,
		marginBottom: 3,
	},
	locationIconWrapper: {
		alignItems: 'flex-end',
		flexDirection: 'row',
	},
	menuTextYellow: {
		color: colours.spotYellow,
		fontSize: 18,
		fontFamily: 'allerRg',
		textAlign: 'center',
		paddingRight: 8,
		paddingLeft: 8,
		paddingBottom: 10,
		paddingTop: 10,
	},
});
