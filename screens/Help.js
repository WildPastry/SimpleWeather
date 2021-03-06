// imports
import React, { Component } from 'react';
import {
	Linking,
	Modal,
	Text,
	StyleSheet,
	ScrollView,
	TouchableHighlight,
	View
} from 'react-native';
import FormButton from '../components/FormButton';
import AppLogo from '../components/AppLogo';
import { Ionicons } from '@expo/vector-icons';
import colours from './../assets/colours.json';

// START Help
class Help extends Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false
		};
		this.setModalVisible = this.setModalVisible.bind(this);
		this.dismissModal = this.dismissModal.bind(this);
	}

	// show/hide modal visibility
	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	// dimiss modal
	dismissModal() {
		this.setModalVisible(false);
	}

	// START Help
	render() {
		return (
			<View>
				{/* START modal */}
				<Modal animationType='fade' transparent={true} visible={this.state.modalVisible}>
					{/* container */}
					<View style={helpStyles.modalWrapper}>
						<ScrollView style={{ marginTop: 45, marginBottom: 45 }}>
							{/* logo and heading */}
							<View style={helpStyles.logoContainer}>
								<AppLogo />
							</View>
							<Text style={helpStyles.simpleWeatherWrapper}>
								<Text style={helpStyles.simpleWeather}>SIMPLE </Text>
								<Text style={helpStyles.simpleWeatherBlue}>WEATHER</Text>
							</Text>
							{/* help text */}
							<View style={helpStyles.textWrapper}>
								{/* line break */}
								<View style={helpStyles.border} />
								<Text style={helpStyles.helpTextWhite}>
									A basic weather app designed to give you fast and accurate data to
									thousands of locations worldwide.
								</Text>
								<Text style={helpStyles.helpTextWhite}>
									Once you sign up to the app you will have access to the features below.
								</Text>
								{/* line break */}
								<View style={helpStyles.border} />
								{/* search for a location */}
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}>
									<Text style={helpStyles.helpTextWhite}>Search for a location</Text>
									<Ionicons name='search' size={30} color={colours.white} />
								</View>
								{/* saved locations */}
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}>
									<Text style={helpStyles.helpTextWhite}>Save up to 5 locations</Text>
									<Ionicons name='add-circle' size={30} color={colours.white} />
								</View>
								{/* set location as home */}
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}>
									<Text style={helpStyles.helpTextWhite}>Set a location to home</Text>
									<Ionicons name='home' size={30} color={colours.spotGreen} />
								</View>
								{/* line break */}
								<View style={helpStyles.border} />
								{/* support the dev */}
								<Text style={helpStyles.helpTextBlue}>
									You can send feedback, comments or suggestions to the developer
									<Text
										style={helpStyles.helpTextYellow}
										onPress={() =>
											Linking.openURL(
												'mailto:mykdsn@gmail.com?subject=SendMail&body=Description'
											)
										}>
										{' '}
										HERE
									</Text>
								</Text>
							</View>
							{/* confirm button */}
							<View style={helpStyles.buttonContainer}>
								<FormButton
									onPress={() => {
										this.setModalVisible(!this.state.modalVisible);
									}}
									title='BACK'
								/>
							</View>
						</ScrollView>
					</View>
				</Modal>
				{/* END modal */}
				{/* show modal button */}
				<TouchableHighlight
					onPress={() => {
						this.setModalVisible(true);
					}}>
					<Text style={helpStyles.helpTextYellowBold}>HELP</Text>
				</TouchableHighlight>
			</View>
		);
	}
	// END render Help
}
// END Help

export default Help;

// style
const helpStyles = StyleSheet.create({
	modalWrapper: {
		alignItems: 'center',
		backgroundColor: colours.spotGreyMed,
		flex: 1,
		justifyContent: 'center'
	},
	textWrapper: {
		marginLeft: 25,
		marginRight: 25
	},
	buttonsWrapper: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	border: {
		marginTop: 10,
		marginBottom: 10,
		borderBottomColor: colours.spotGrey,
		borderBottomWidth: 1
	},
	helpTextWhite: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'center',
		padding: 8
	},
	helpTextYellowBold: {
		color: colours.spotYellow,
		fontSize: 18,
		fontFamily: 'allerBd',
		textAlign: 'center',
		padding: 8
	},
	helpTextYellow: {
		color: colours.spotYellow,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'center',
		padding: 8
	},
	helpTextBlue: {
		color: colours.spotBlue,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'center',
		padding: 8
	},
	helpTextGreen: {
		color: colours.spotGreen,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'center',
		padding: 8
	},
	helpTextGreenBold: {
		color: colours.spotGreen,
		fontSize: 18,
		fontFamily: 'allerBd',
		textAlign: 'center',
		padding: 8
	},
	helpTextRed: {
		color: colours.spotRed,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'center',
		padding: 8
	},
	helpTextRedBold: {
		color: colours.spotRed,
		fontSize: 18,
		fontFamily: 'allerBd',
		textAlign: 'center',
		padding: 8
	},
	buttonContainer: {
		alignSelf: 'stretch',
		marginLeft: 25,
		marginRight: 25,
		marginBottom: 10,
		marginTop: 10
	},
	logoContainer: {
		marginBottom: 10,
		alignItems: 'center'
	},
	simpleWeatherWrapper: {
		fontSize: 22,
		textAlign: 'center',
		paddingTop: 4,
		paddingBottom: 30
	},
	simpleWeather: {
		color: colours.white,
		fontFamily: 'merriWeatherLt'
	},
	simpleWeatherBlue: {
		color: colours.spotBlue,
		fontFamily: 'merriWeatherBd'
	}
});
