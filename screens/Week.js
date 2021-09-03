// imports
import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import colours from './../assets/colours.json';
import weatherIcons from './../assets/icons.json';
import { Ionicons } from '@expo/vector-icons';

// moment set up
var moment = require('moment');

// START Week
class Week extends Component {
	// START Week render
	render() {
		// grab six days worth of forecast
		const sixDays = this.props.daily.slice(1);

		// set up colour bg variables
		const colourBg = this.props.weekBg;
		const colourBarBg = this.props.weekBarBg;
		const colourBarBgDarkest = this.props.weekBarBgDarkest;

		// set current weather icon based on weather
		return (
			<View
				style={{
					alignSelf: 'stretch',
					backgroundColor: colourBg,
					flex: 4,
					justifyContent: 'center'
				}}>
				<ScrollView>
					{/* weekly weather heading and description */}
					<View
						style={{
							backgroundColor: colourBarBg,
							marginBottom: 10
						}}>
						<View style={{ backgroundColor: colourBarBgDarkest }}>
							<Text style={weekStyles.weekHeading}>Six Day Forecast</Text>
						</View>
					</View>
					{/* START map */}
					<View style={{ marginBottom: 3 }}>
						{sixDays.map((daily) => {
							// set up date variables
							var today = moment.unix(daily.dt);
							var day = moment(today).format('ddd');

							// set up daily summary conversion
							let dailySummaryRaw;

							dailySummaryRaw = daily.weather[0].description;

							// function to render daily summary while the component is still loading
							if (dailySummaryRaw === undefined) {
								console.log('Not loaded yet...');
							} else {
								var dailySummary = dailySummaryRaw.replace(/^\w/, (c) => c.toUpperCase());
							}

							// convert mps to kmph
							var windSpeed = daily.wind_speed * 3.6;

							return (
								// START week display
								<View key={daily.dt}>
									<Collapse
										style={{
											backgroundColor: colourBarBg,
											marginTop: 3,
											marginBottom: 3,
											padding: 10
										}}>
										{/* collapse header */}
										<CollapseHeader>
											<View style={weekStyles.weekIconTempWrap}>
												{/* day */}
												<View style={weekStyles.weekColWrapLeft}>
													<Text
														style={{
															justifyContent: 'center',
															fontSize: 18,
															fontFamily: 'allerRg',
															color: colours.white
														}}>
														{/* chevron icon */}
														<Ionicons
															name='chevron-down-outline'
															size={18}
															color={colours.white}
														/>{' '}
														{day}
													</Text>
												</View>
												{/* daily icon */}
												<View style={weekStyles.weekColWrap}>
													<Text
														style={{
															fontFamily: 'weatherfont',
															fontSize: 24,
															textAlign: 'center',
															color: colours.white
														}}>
														{weatherIcons[daily.weather[0].id].code}
													</Text>
												</View>
												{/* daily low temp */}
												<View style={weekStyles.weekColWrap}>
													<Text style={weekStyles.weekLowTemp}>
														<Ionicons
															name='arrow-down-outline'
															size={16}
															color={colours.white}
														/>{' '}
														{Math.round(daily.temp.min)}°
													</Text>
												</View>
												{/* daily high temp */}
												<View style={weekStyles.weekColWrap}>
													<Text style={weekStyles.weekHighTemp}>
														<Ionicons
															name='arrow-up-outline'
															size={16}
															color={colours.white}
														/>{' '}
														{Math.round(daily.temp.max)}°
													</Text>
												</View>
											</View>
										</CollapseHeader>

										{/* collapse body */}
										<CollapseBody>
											{/* START description */}
											<Text style={weekStyles.weekDesc}>
												{dailySummary} with a high of {Math.round(daily.temp.max)}°
											</Text>
											{/* END description */}

											{/* START wind and humidity */}
											<View style={weekStyles.weekWindHumWrap}>
												{/* START wind speed */}
												<View style={weekStyles.weekWindWrap}>
													<Text
														style={{
															fontFamily: 'weatherfont',
															fontSize: 18,
															color: colours.white
														}}>
														{weatherIcons.windSpeed.code}
													</Text>
													<Text style={weekStyles.weekWindHumDetails}>
														{'  '}
														{Math.round(windSpeed)} km/h
													</Text>
												</View>
												{/* END wind speed */}

												{/* START humidity */}
												<View style={weekStyles.weekHumWrap}>
													<Text
														style={{
															fontFamily: 'weatherfont',
															fontSize: 18,
															color: colours.white
														}}>
														{weatherIcons.humidity.code}
													</Text>
													<Text style={weekStyles.weekWindHumDetails}>
														{'  '}
														{daily.humidity}%
													</Text>
												</View>
												{/* END humidity */}
											</View>
											{/* END wind and humidity */}
										</CollapseBody>
									</Collapse>
								</View>
								// END week display
							);
						})}
						{/* END map */}
					</View>
				</ScrollView>
			</View>
		);
	}
	// END Week render
}
// END Week

export default Week;

// style
const weekStyles = StyleSheet.create({
	weekIconTempWrap: {
		alignItems: 'center',
		flexDirection: 'row',
		height: 45,
		justifyContent: 'space-between'
	},
	weekColWrap: {
		width: 50,
		height: 45,
		justifyContent: 'center'
	},
	weekColWrapLeft: {
		width: 75,
		height: 45,
		justifyContent: 'center'
	},
	weekIcon: {
		alignSelf: 'flex-start',
		height: 30,
		width: 30
	},
	weekLowTemp: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerLt'
	},
	weekHighTemp: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerLt'
	},
	weekHeading: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerBd',
		padding: 12,
		textAlign: 'center'
	},
	weekText: {
		color: colours.white,
		fontSize: 18,
		textAlign: 'center'
	},
	weekTextBot: {
		color: colours.white,
		fontSize: 18,
		textAlign: 'left',
		marginBottom: 12
	},
	weekDesc: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerRg',
		padding: 10,
		textAlign: 'center'
	},
	weekWindHumWrap: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 4
	},
	weekWindWrap: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	weekHumWrap: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	weekWindHumDetails: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerLt',
		paddingTop: 4
	}
});
