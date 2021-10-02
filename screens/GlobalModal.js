// imports
import React, { Component } from 'react';
import { Modal, Text, StyleSheet, TouchableHighlight, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colours from './../assets/colours.json';

// firebase
import * as firebase from 'firebase';
import { withFirebaseHOC } from '../config/Firebase';
import 'firebase/firestore';
import 'firebase/auth';

// START GlobalModal
class GlobalModal extends Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
			locationCheck: []
		};
		this.setModalVisible = this.setModalVisible.bind(this);
		this.dismissModal = this.dismissModal.bind(this);
		this.handleFail = this.handleFail.bind(this);
		this.handleSuccess = this.handleSuccess.bind(this);
		this.handleDuplicate = this.handleDuplicate.bind(this);
		this.locationCheck = this.locationCheck.bind(this);
	}

	componentDidMount = async () => {
		let isMounted = true;
		if (isMounted) {
			// check firebase for user
			var user = firebase.auth().currentUser;
			if (user) {
				// user is signed in
				// load firebase data
				const dbRT = firebase.database();
				const ref = dbRT.ref(user.uid);
				const locationRef = ref.child('locations');
				// get signed in users saved data on click
				locationRef.once('value', (snapshot) => {
					if (snapshot.exists()) {
						let data = snapshot.val();
						let locations = Object.values(data);
						this.setState({ locationCheck: locations });
					}
				});
			}
		}
		return () => (isMounted = false);
	};

	// show/hide modal visibility
	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	// dimiss modal
	dismissModal() {
		this.setModalVisible(false);
	}

	// handle login
	handleLogin = () => this.props.navigation.navigate('Login');

	// handle signup
	handleSignup = () => this.props.navigation.navigate('Signup');

	// handle alert fail
	handleFail = () => {
		let isMounted = true;
		if (isMounted) {
			// Alert
			Alert.alert(
				'Not Logged In',
				'Please login or signup to save locations',
				[
					{ text: 'Cancel', onPress: this.dismissModal, style: 'cancel' },
					{ text: 'Login', onPress: this.handleLogin },
					{ text: 'Signup', onPress: this.handleSignup }
				],
				{ cancelable: false }
			);
		}
		return () => (isMounted = false);
	};

	// handle alert success
	handleSuccess = () => {
		let isMounted = true;
		if (isMounted) {
			// Alert
			Alert.alert(
				'Success',
				'Location details have been saved',
				[{ text: 'OK', onPress: this.dismissModal, style: 'cancel' }],
				{ cancelable: false }
			);
		}
		return () => (isMounted = false);
	};

	// handle alert duplicate
	handleDuplicate = () => {
		let isMounted = true;
		if (isMounted) {
			// Alert
			Alert.alert(
				'Duplicate',
				'This location has already been saved.',
				[{ text: 'OK', onPress: this.dismissModal, style: 'cancel' }],
				{ cancelable: false }
			);
		}
		return () => (isMounted = false);
	};

	// handle location limit
	handleLimit = () => {
		let isMounted = true;
		if (isMounted) {
			// Alert
			Alert.alert(
				'Limit Reached',
				'Maximum saved locations reached, remove one to save another.',
				[{ text: 'OK', onPress: this.dismissModal, style: 'cancel' }],
				{ cancelable: false }
			);
		}
		return () => (isMounted = false);
	};

	// location check
	locationCheck = (val) => {
		let isMounted = true;
		if (isMounted) {
			// check firebase for user
			var user = firebase.auth().currentUser;
			if (user) {
				// user is signed in
				// load firebase data
				const dbRT = firebase.database();
				const ref = dbRT.ref(user.uid);
				const locationRef = ref.child('locations');
				// get signed in users saved data on click
				locationRef.on('value', (snapshot) => {
					if (snapshot.exists()) {
						let data = snapshot.val();
						let locations = Object.values(data);
						this.setState({ locationCheck: locations });
					}
				});
			}
			// check location length to limit it to 5
			if (this.state.locationCheck.length < 5) {
				// compare current location to the saved locations
				const e = this.state.locationCheck.some((location) => val == location.location);
				if (e != true) {
					this.handleLocation();
				} else {
					this.handleDuplicate();
				}
			} else {
				this.handleLimit();
			}
		}
		return () => (isMounted = false);
	};

	// handle location
	handleLocation = () => {
		let isMounted = true;
		if (isMounted) {
			// check firebase for user
			var user = firebase.auth().currentUser;
			if (user) {
				// user is signed in
				// load firebase data
				const dbRT = firebase.database();
				const ref = dbRT.ref(user.uid);
				const locationRef = ref.child('locations');
				// get the unique key generated
				var newLocationId = locationRef.push({}).key;
				// save location details to database
				dbRT.ref(user.uid + '/locations/' + newLocationId).set(
					{
						key: newLocationId,
						lat: this.props.currentLat,
						lng: this.props.currentLng,
						location: this.props.currentLocation
					},
					function (error) {
						if (error) {
							console.log(error);
						}
					}
				);
				// save home location
				if (this.state.locationCheck.length === 0) {
				dbRT.ref(user.uid + '/home').set(
					{
						lat: this.props.currentLat,
						lng: this.props.currentLng,
						location: this.props.currentLocation
					},
					function (error) {
						if (error) {
							console.log(error, 'ERROR');
						}
					}
				);
				}
			} else {
				// no user is signed in
				this.handleFail();
			}
		}
		if (user) {
			this.handleSuccess();
		}
		return () => (isMounted = false);
	};

	// START render GlobalModal
	render() {
		var currentLocation = this.props.currentLocation;
		return (
			<View>
				{/* START modal */}
				<Modal animationType='fade' transparent={true} visible={this.state.modalVisible}>
					<View style={globalModalStyles.modalWrapper}>
						<View style={globalModalStyles.buttonsWrapper}>
							{/* text */}
							<Text style={globalModalStyles.text}>Save this location?</Text>
						</View>
						<View style={globalModalStyles.buttonsWrapper}>
							{/* close modal buttons */}
							<TouchableHighlight
								style={{ padding: 12 }}
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}>
								{/* cancel */}
								<Ionicons name='close-circle' size={45} color={colours.spotRed} />
							</TouchableHighlight>
							<TouchableHighlight
								style={{ padding: 12 }}
								onPress={this.locationCheck.bind(this, currentLocation)}>
								{/* save */}
								<Ionicons name='checkmark-circle' size={45} color={colours.spotGreen} />
							</TouchableHighlight>
						</View>
					</View>
				</Modal>
				{/* END modal */}
				{/* show modal button */}
				<TouchableHighlight
					onPress={() => {
						this.setModalVisible(true);
					}}>
					<Ionicons name='add-circle' size={30} color={colours.white} />
				</TouchableHighlight>
			</View>
		);
	}
	// END render GlobalModal
}
// END GlobalModal

export default withFirebaseHOC(GlobalModal);

// style
const globalModalStyles = StyleSheet.create({
	modalWrapper: {
		alignItems: 'center',
		backgroundColor: colours.spotGreyMed,
		flex: 1,
		justifyContent: 'center'
	},
	buttonsWrapper: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	text: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'center'
	}
});
