// imports
import React, { Component } from 'react';
import {
	Modal,
	Text,
	StyleSheet,
	TouchableHighlight,
	View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colours from './../assets/colours.json';

// START Help
class Help extends Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
		};
		this.setModalVisible = this.setModalVisible.bind(this);
		this.dismissModal = this.dismissModal.bind(this);
	}

	// componentDidMount
	componentDidMount = async () => {
		console.log('Inside componentDidMount from Help.js...');
	};

	// show/hide modal visibility
	setModalVisible(visible) {
		this.setState({ modalVisible: visible }, () =>
			console.log('Is modal visible? ' + this.state.modalVisible)
		);
	}

	// dimiss modal
	dismissModal() {
		console.log('Inside dismissModal from Help.js...');
		this.setModalVisible(false);
	}

	// START Help
	render() {
		console.log('Inside render from Help.js...');
		return (
			<View>
				{/* START modal */}
				<Modal
					animationType='fade'
					transparent={true}
					visible={this.state.modalVisible}>
					<View style={helpStyles.modalWrapper}>
					<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingLeft: 25,
								paddingRight: 25,
								paddingBottom: 10,
								paddingTop: 5,
							}}>
							{/* Morning */}
							<View
								style={{
									flexDirection: 'column',
									justifyContent: 'center',
								}}>
								<Text
									style={{
										fontFamily: 'weatherfont',
										fontSize: 45,
										textAlign: 'center',
										color: colours.white,
									}}>
								</Text>
								<Text style={helpStyles.helpTextYellow}>
									HELP
								</Text>
							</View>
							{/* Afternoon */}
							<View
								style={{
									flexDirection: 'column',
									justifyContent: 'center',
								}}>
								<Text
									style={{
										fontFamily: 'weatherfont',
										fontSize: 45,
										textAlign: 'center',
										color: colours.white,
									}}>
								</Text>
								<Text style={helpStyles.helpTextWhite}>
									SCREEN
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'column',
									justifyContent: 'center',
								}}>
								{/* Evening */}
								<Text
									style={{
										fontFamily: 'weatherfont',
										fontSize: 45,
										textAlign: 'center',
										color: colours.white,
									}}>
								</Text>
								<Text style={helpStyles.helpTextYellow}>
									TEXT
								</Text>
							</View>
						</View>
						<View style={helpStyles.buttonsWrapper}>
							{/* close modal buttons */}
							<TouchableHighlight
								style={{ padding: 12 }}
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}>
								{/* cancel */}
								<Ionicons
									name='ios-close-circle'
									size={45}
									color={colours.spotRed}
								/>
							</TouchableHighlight>
							<TouchableHighlight
								style={{ padding: 12 }}
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}>
								{/* save */}
								<Ionicons
									name='ios-checkmark-circle'
									size={45}
									color={colours.spotGreen}
								/>
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
					<Text style={helpStyles.helpTextYellow}>Help</Text>
				</TouchableHighlight>
			</View>
		);
	}
	// END render Help
}
// END render Help

export default Help;

// style
const helpStyles = StyleSheet.create({
	modalWrapper: {
		alignItems: 'center',
		backgroundColor: colours.spotGreyMed,
		flex: 1,
		justifyContent: 'center',
	},
	buttonsWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	helpTextWhite: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'center',
		padding: 8,
	},
	helpTextYellow: {
		color: colours.spotYellow,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'center',
		padding: 8,
	},
	helpTextBlue: {
		color: colours.spotBlue,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'center',
		padding: 8,
	},
	helpTextGreen: {
		color: colours.spotGreen,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'center',
		padding: 8,
	},
	helpTextRed: {
		color: colours.spotRed,
		fontSize: 18,
		fontFamily: 'allerLt',
		textAlign: 'center',
		padding: 8,
	},
});
