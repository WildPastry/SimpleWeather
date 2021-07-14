// imports
import React, { Component } from 'react';
import { Dimensions, Text, Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
import configData from './../data/config.json';
import GlobalModal from '../screens/GlobalModal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import colours from './../assets/colours.json';
import LottieView from 'lottie-react-native';
import weatherIcons from './../assets/icons.json';
import { Ionicons } from '@expo/vector-icons';

// firebase
import { withFirebaseHOC } from '../config/Firebase';
import Firebase, { FirebaseProvider } from '../config/Firebase';

// set up auth key for google data
const geo = configData.GEO;

// moment set up
var moment = require('moment');

// group 2xx: thunderstorm
const thunderStormRain = require('./../assets/animations/weather/thunderStormRain.json');
const thunderStormRainNight = require('./../assets/animations/weather/thunderStormRainNight.json');
const thunderStorm = require('./../assets/animations/weather/thunderStorm.json');
const thunderStormNight = require('./../assets/animations/weather/thunderStormNight.json');
// group 3xx: drizzle
const lightDrizzle = require('./../assets/animations/weather/lightDrizzle.json');
const lightDrizzleNight = require('./../assets/animations/weather/lightDrizzleNight.json');
// group 5xx: rain
const lightRain = require('./../assets/animations/weather/lightRain.json');
const lightRainNight = require('./../assets/animations/weather/lightRainNight.json');
const moderateRain = require('./../assets/animations/weather/moderateRain.json');
const moderateRainNight = require('./../assets/animations/weather/moderateRainNight.json');
const heavyRain = require('./../assets/animations/weather/heavyRain.json');
const heavyRainNight = require('./../assets/animations/weather/heavyRainNight.json');
// group 6xx: snow
const snow = require('./../assets/animations/weather/snow.json');
const snowNight = require('./../assets/animations/weather/snowNight.json');
// group 7xx: atmosphere
const mist = require('./../assets/animations/weather/mist.json');
const mistNight = require('./../assets/animations/weather/mistNight.json');
// group 800: clear
const dayClear = require('./../assets/animations/weather/dayClear.json');
const nightClear = require('./../assets/animations/weather/nightClear.json');
// group 80x: clouds
const fewClouds = require('./../assets/animations/weather/fewClouds.json');
const fewCloudsNight = require('./../assets/animations/weather/fewCloudsNight.json');
const brokenClouds = require('./../assets/animations/weather/brokenClouds.json');
const brokenCloudsNight = require('./../assets/animations/weather/brokenCloudsNight.json');
const scatteredClouds = require('./../assets/animations/weather/scatteredClouds.json');
const scatteredCloudsNight = require('./../assets/animations/weather/scatteredCloudsNight.json');
const overcastClouds = require('./../assets/animations/weather/overcastClouds.json');
const overcastCloudsNight = require('./../assets/animations/weather/overcastCloudsNight.json');

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

// capitalize first char
String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

// remove last char
String.prototype.cutString = function () {
	return this.substring(0, this.length - 1);
};

var night;

// START Current
class Current extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// autocomplete information
			googleLat: '',
			googleLng: '',
			googleName: '',
			// placeholder clear
			placeholder: this.props.currentLocation,
			// google places listview
			listViewDisplayed: true
		};
		this.updateSkyData = this.updateSkyData.bind(this);
		this._keyboardDidShow = this._keyboardDidShow.bind(this);
		this._keyboardDidHide = this._keyboardDidHide.bind(this);
	}

	// render night or day details
	renderSunDetails() {
		// Set up local timestamp for sunrise/sunset
		var sunsetTimeStamp = this.props.sunset,
			sunriseTimeStamp = this.props.sunrise,
			daylightOffset = this.props.dstOffset,
			rawOffset = this.props.rawOffset;

		var sunsetTime = sunsetTimeStamp + daylightOffset + rawOffset;
		var sunriseTime = sunriseTimeStamp + daylightOffset + rawOffset;

		var sunrise = moment.utc(moment(sunriseTime * 1000)).format('h:mm a');
		var sunset = moment.utc(moment(sunsetTime * 1000)).format('h:mm a');

		// Change sun details based on night or day
		let sunDisplay;
		const night = this.props.night;
		if (night) {
			sunDisplay = (
				<View style={currentStyles.currentDetailsWrap}>
					<Text
						style={{
							fontFamily: 'weatherfont',
							fontSize: 18,
							color: colours.spotYellow
						}}>
						{weatherIcons.sunrise.code}
					</Text>
					<Text style={currentStyles.currentDetails}>
						{'  '}Sunrise at {sunrise}
					</Text>
				</View>
			);
		} else {
			sunDisplay = (
				<View style={currentStyles.currentDetailsWrap}>
					<Text
						style={{
							fontFamily: 'weatherfont',
							fontSize: 18,
							color: colours.spotYellow
						}}>
						{weatherIcons.sunset.code}
					</Text>
					<Text style={currentStyles.currentDetails}>
						{'  '}Sunset at {sunset}
					</Text>
				</View>
			);
		}
		return sunDisplay;
	}

	// keyboard did mount function
	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this._keyboardDidShow
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this._keyboardDidHide
		);
	}

	// keyboard will un-mount function
	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	// keyboard shown
	_keyboardDidShow() {
		this.setState({
			placeholder: 'Enter location . . .',
			listViewDisplayed: true
		});
	}

	// keyboard hidden
	_keyboardDidHide() {
		this.setState({
			placeholder: this.props.currentLocation,
			listViewDisplayed: false
		});
	}

	// update sky data function
	updateSkyData() {
		var options = {
			googleLat: this.state.googleLat,
			googleLng: this.state.googleLng,
			googleName: this.state.googleName
		};
		this.props.updateSkyData(options);
	}

	// START render Current
	render() {
		// set up weather code and data
		var weatherCode = this.props.weatherCode;
		const openData = this.props.openWeather.list;
		const night = this.props.night;

		// set up icon display
		let currentWeatherIcon;

		// weather icon logic
		// group 2xx: thunderstorm
		if (weatherCode >= 200 && (weatherCode <= 202) & night) {
			currentWeatherIcon = thunderStormRainNight;
		} else if (weatherCode >= 200 && (weatherCode <= 202) & !night) {
			currentWeatherIcon = thunderStormRain;
		} else if (weatherCode >= 230 && (weatherCode <= 232) & night) {
			currentWeatherIcon = thunderStormNight;
		} else if (weatherCode >= 230 && (weatherCode <= 232) & !night) {
			currentWeatherIcon = thunderStorm;
		} else if (weatherCode >= 210 && (weatherCode <= 221) & night) {
			currentWeatherIcon = thunderStormNight;
		} else if (weatherCode >= 210 && (weatherCode <= 221) & !night) {
			currentWeatherIcon = thunderStorm;
		} else if (weatherCode == 200 && night) {
			currentWeatherIcon = lightRainNight;
		} else if (weatherCode == 201 && !night) {
			currentWeatherIcon = lightRain;
		} else if (weatherCode == 202 && night) {
			currentWeatherIcon = moderateRainNight;
		} else if (weatherCode == 230 && !night) {
			currentWeatherIcon = moderateRain;
		} else if (weatherCode == 230 && !night) {
			currentWeatherIcon = moderateRain;
		} else if (weatherCode == 230 && !night) {
			currentWeatherIcon = moderateRain;
		} else if (weatherCode == 230 && !night) {
			currentWeatherIcon = moderateRain;
		} else if (weatherCode == 230 && !night) {
			currentWeatherIcon = moderateRain;
		} else if (weatherCode == 230 && !night) {
			currentWeatherIcon = moderateRain;
		} else if (weatherCode == 230 && !night) {
			currentWeatherIcon = moderateRain;

			// group 3xx: drizzle
		} else if (weatherCode >= 300 && weatherCode <= 321 && night) {
			currentWeatherIcon = lightDrizzleNight;
		} else if (weatherCode >= 300 && weatherCode <= 321 && !night) {
			currentWeatherIcon = lightDrizzle;
			// group 5xx: rain
		} else if (weatherCode == 500 && night) {
			currentWeatherIcon = lightRainNight;
		} else if (weatherCode == 500 && !night) {
			currentWeatherIcon = lightRain;
		} else if (weatherCode == 501 && night) {
			currentWeatherIcon = moderateRainNight;
		} else if (weatherCode == 501 && !night) {
			currentWeatherIcon = moderateRain;
		} else if (weatherCode >= 502 && weatherCode <= 531 && night) {
			currentWeatherIcon = heavyRainNight;
		} else if (weatherCode >= 502 && weatherCode <= 531 && !night) {
			currentWeatherIcon = heavyRain;
			// group 6xx: snow
		} else if (weatherCode >= 600 && weatherCode <= 622 && night) {
			currentWeatherIcon = snowNight;
		} else if (weatherCode >= 600 && weatherCode <= 622 && !night) {
			currentWeatherIcon = snow;
			// group 7xx: atmosphere
		} else if (weatherCode >= 701 && weatherCode <= 781 && night) {
			currentWeatherIcon = mistNight;
		} else if (weatherCode >= 701 && weatherCode <= 781 && !night) {
			currentWeatherIcon = mist;
			// group 80x: clouds
		} else if (weatherCode == 801 && night) {
			currentWeatherIcon = fewCloudsNight;
		} else if (weatherCode == 801 && !night) {
			currentWeatherIcon = fewClouds;
		} else if (weatherCode == 802 && night) {
			currentWeatherIcon = scatteredCloudsNight;
		} else if (weatherCode == 802 && !night) {
			currentWeatherIcon = scatteredClouds;
		} else if (weatherCode == 803 && night) {
			currentWeatherIcon = brokenCloudsNight;
		} else if (weatherCode == 803 && !night) {
			currentWeatherIcon = brokenClouds;
		} else if (weatherCode == 804 && night) {
			currentWeatherIcon = overcastCloudsNight;
		} else if (weatherCode == 804 && !night) {
			currentWeatherIcon = overcastClouds;
			// group 800: clear
		} else if (weatherCode == 800 && night) {
			currentWeatherIcon = nightClear;
		} else {
			currentWeatherIcon = dayClear;
		}

		// set up date time to local time
		var daylightOffset = this.props.dstOffset;
		var rawOffset = this.props.rawOffset;
		var currentDate = moment().unix() + daylightOffset + rawOffset;
		var currentDateTime = moment
			.utc(moment(currentDate * 1000))
			.format('dddd, MMMM Do, h:mm a');

		// set up colour bg variables
		const colourBg = this.props.currentBg;
		const colourBarBg = this.props.currentBarBg;
		const colourBarBgDarkest = this.props.currentBarBgDarkest;

		// filter data for morning afternoon evening conditions
		let filterMorning = openData.filter((e) => e.dt_txt.includes('09:00:00'));
		let filterAfternoon = openData.filter((e) => e.dt_txt.includes('12:00:00'));
		let filterEvening = openData.filter((e) => e.dt_txt.includes('18:00:00'));

		return (
			<SafeAreaView keyboardShouldPersistTaps='handled' style={currentStyles.currentWrap}>
				{/* search button */}
				<View
					pointerEvents='none'
					style={{
						zIndex: 2,
						position: 'absolute',
						top: 0,
						left: 0,
						width: '10%',
						height: 50,
						overflow: 'visible',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					<Ionicons name='ios-search' size={30} color={colours.white} />
				</View>

				{/* autocomplete input */}
				<GooglePlacesAutocomplete
					keyboardShouldPersistTaps='handled'
					placeholder={this.state.placeholder}
					placeholderTextColor={colours.white}
					minLength={2}
					autoFocus={false}
					returnKeyType={'default'}
					listViewDisplayed={this.state.listViewDisplayed}
					fetchDetails={true}
					renderDescription={(row) => row.description}
					onPress={(data, details = null) => {
						// fix google names
						var updatedAddress = details.formatted_address.replace(/^[\s\d]+/, '');
						this.setState({
							// set state with google details
							googleLat: details.geometry.location.lat.toFixed(5),
							googleLng: details.geometry.location.lng.toFixed(5),
							googleName: updatedAddress
						});
						// update sky data function
						this.updateSkyData();
					}}
					// data query
					query={{
						key: geo,
						language: 'en',
						types: '(cities)'
					}}
					// google styles
					styles={{
						container: {
							zIndex: 1,
							position: 'absolute',
							top: 0,
							width: '100%',
							height: '100%',
							overflow: 'visible'
						},
						textInputContainer: {
							alignContent: 'center',
							backgroundColor: colourBarBg,
							height: 50,
							width: '100%'
						},
						textInput: {
							alignItems: 'center',
							backgroundColor: colourBarBg,
							borderRadius: 0,
							borderTopColor: colours.spotGreyMed,
							borderTopWidth: 0,
							color: colours.white,
							height: 50,
							marginTop: 0,
							marginBottom: 0,
							marginLeft: 0,
							marginRight: 0,
							fontFamily: 'allerLt',
							fontSize: 18,
							textAlign: 'center',
							zIndex: 1
						},
						description: {
							alignItems: 'center',
							color: colours.white,
							fontFamily: 'allerLt',
							textAlign: 'center'
						},
						listView: {
							backgroundColor: colourBarBg,
							color: colours.white,
							fontFamily: 'allerLt',
							fontSize: 18,
							position: 'absolute',
							top: 50,
							elevation: 1
						},
						predefinedPlacesDescription: {
							color: colours.white,
							fontFamily: 'allerLt',
							fontSize: 18
						},
						separator: {
							backgroundColor: colourBg,
							height: 2
						}
					}}
					// google options
					currentLocation={false}
					currentLocationLabel='Current location'
					nearbyPlacesAPI='GooglePlacesSearch'
					GooglePlacesDetailsQuery={{
						fields: 'geometry,formatted_address'
					}}
					filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
					debounce={100}
				/>

				{/* add location button */}
				<View
					style={{
						zIndex: 2,
						position: 'absolute',
						top: 0,
						right: 0,
						width: '10%',
						height: 50,
						overflow: 'visible',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					{/* globalmodal */}
					<FirebaseProvider value={Firebase}>
						<GlobalModal
							navigation={this.props.navigation}
							handleFail={this.handleFail}
							handleSuccess={this.handleSuccess}
							currentLat={this.props.currentLat}
							currentLng={this.props.currentLng}
							currentLocation={this.props.currentLocation}
						/>
					</FirebaseProvider>
				</View>

				<View style={currentStyles.currentIconWrap}>
					{/* main icon */}
					<LottieView
						style={{
							height: iconHeight,
							width: iconWidth
						}}
						ref={(animation) => {
							this.animation = animation;
						}}
						source={currentWeatherIcon}
						autoPlay={true}
					/>
				</View>

				<View style={currentStyles.currentTempWrap}>
					{/* low temp */}
					<View>
						<Text style={currentStyles.currentTempLow}>
							{/* down arrow */}
							<Ionicons
								name='arrow-down-outline'
								size={30}
								color={colours.white}
							/>{' '}
							{this.props.low}°
						</Text>
					</View>
					{/* current temp */}
					<Text style={currentStyles.currentTemp}> {this.props.temp}°</Text>
					{/* high temp */}
					<View>
						<Text style={currentStyles.currentTempHigh}>
							{/* up arrow */}
							<Ionicons name='arrow-up-outline' 
							size={30} 
							color={colours.white} />{' '}
							{this.props.high}°
						</Text>
					</View>
				</View>

				{/* date display */}
				<Text style={currentStyles.currentDateText}>{currentDateTime}</Text>

				{/* Current description */}
				<Text style={currentStyles.currentDesc}>
					Currently {this.props.temp}° with {this.props.desc}
				</Text>

				<Collapse>
					{/* collapse header */}
					<CollapseHeader style={{ marginBottom: 15, marginTop: 5 }}>
						<View style={{ alignItems: 'center' }}>
							{/* more details */}
							<Text
								style={{
									justifyContent: 'center',
									fontSize: 18,
									fontFamily: 'allerBd',
									color: colours.spotYellow
								}}>
								<Ionicons name='arrow-down-outline' 
								size={19} 
								color={colours.spotYellow} />{' '}
								More Details
							</Text>
						</View>
					</CollapseHeader>

					{/* collapse body */}
					<CollapseBody
						style={{
							backgroundColor: colourBarBgDarkest,
							marginBottom: 15
						}}>
						{/* morning afternoon evening icons */}
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingLeft: 25,
								paddingRight: 25,
								paddingBottom: 10,
								paddingTop: 5
							}}>
							{/* Morning */}
							<View
								style={{
									flexDirection: 'column',
									justifyContent: 'center'
								}}>
								<Text
									style={{
										fontFamily: 'weatherfont',
										fontSize: 45,
										textAlign: 'center',
										color: colours.white
									}}>
									{/* 9am */}
									{weatherIcons[filterMorning[0].weather[0].id].code}
								</Text>
								<Text style={currentStyles.currentSecondaryInfoHeading}>9am</Text>
							</View>
							{/* Afternoon */}
							<View
								style={{
									flexDirection: 'column',
									justifyContent: 'center'
								}}>
								<Text
									style={{
										fontFamily: 'weatherfont',
										fontSize: 45,
										textAlign: 'center',
										color: colours.white
									}}>
									{/* 12pm */}
									{weatherIcons[filterAfternoon[0].weather[0].id].code}
								</Text>
								<Text style={currentStyles.currentSecondaryInfoHeading}>mid-day</Text>
							</View>
							<View
								style={{
									flexDirection: 'column',
									justifyContent: 'center'
								}}>
								{/* Evening */}
								<Text
									style={{
										fontFamily: 'weatherfont',
										fontSize: 45,
										textAlign: 'center',
										color: colours.white
									}}>
									{/* 6pm */}
									{weatherIcons[filterEvening[0].weather[0].id].code}
								</Text>
								<Text style={currentStyles.currentSecondaryInfoHeading}>6pm</Text>
							</View>
						</View>
						{/* daily summary */}
						<View style={{ padding: 10 }}>
							<Text style={currentStyles.currentDescSummaryBold}>
								<Ionicons name='md-time' size={19} color={colours.white} /> Daily Summary
							</Text>
							<Text style={currentStyles.currentDescSummary}>
								Feels like {Math.round(this.props.feelslike)}°, {this.props.desc} with{' '}
								{Math.round(this.props.wind)} km/h wind, {this.props.humidity}% humidity
								and an expected high of {this.props.high}°
							</Text>
							{/* sun details */}
							{this.renderSunDetails()}
						</View>
					</CollapseBody>
				</Collapse>
			</SafeAreaView>
		);
	}
	// END render Current
}
// END Current

export default withFirebaseHOC(Current);

// style
const currentStyles = StyleSheet.create({
	currentWrap: {
		alignSelf: 'stretch',
		flex: 1
	},
	currentIconWrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 40
	},
	currentIconSmall: {
		alignSelf: 'center',
		height: 30,
		width: 30
	},
	currentTemp: {
		color: colours.white,
		fontSize: 70,
		fontFamily: 'allerDisplay',
		textAlign: 'center'
	},
	currentTempWrap: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'baseline'
	},
	currentWindHumWrap: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	currentDetailsWrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 8
	},
	currentDetails: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerRg'
	},
	currentTempHigh: {
		color: colours.white,
		fontSize: 30,
		fontFamily: 'allerLt',
		paddingBottom: 12
	},
	currentTempLow: {
		color: colours.white,
		fontSize: 30,
		fontFamily: 'allerLt',
		paddingBottom: 12
	},
	currentDesc: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerBd',
		padding: 10,
		textAlign: 'center'
	},
	currentDescSummary: {
		color: colours.white,
		fontSize: 19,
		lineHeight: 25,
		fontFamily: 'allerLt',
		textAlign: 'center'
	},
	currentDescSummaryBold: {
		color: colours.white,
		fontSize: 19,
		fontFamily: 'allerBd',
		textAlign: 'center',
		paddingBottom: 10
	},
	currentDateText: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerLt',
		padding: 10,
		paddingBottom: 0,
		textAlign: 'center',
		marginTop: 10
	},
	currentSecondaryInfoHeading: {
		color: colours.white,
		fontSize: 18,
		fontFamily: 'allerRg',
		textAlign: 'center'
	},
	border: {
		borderBottomColor: colours.spotYellow,
		borderBottomWidth: 1,
		marginLeft: 25,
		marginRight: 25
	}
});
