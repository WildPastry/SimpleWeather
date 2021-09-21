// imports
import React, { Component } from 'react';
import { AppRegistry, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import configData from './data/config.json';
import Header from './screens/Header';
import Current from './screens/Current';
import Week from './screens/Week';
import Footer from './screens/Footer';
import colours from './assets/colours.json';
import LottieView from 'lottie-react-native';

// firebase
import * as firebase from 'firebase';
import { withFirebaseHOC } from './config/Firebase';
import Firebase, { FirebaseProvider } from './config/Firebase';
import 'firebase/firestore';
import 'firebase/auth';

// firebase globals
import { decode, encode } from 'base-64';
if (!global.btoa) {
	global.btoa = encode;
}
if (!global.atob) {
	global.atob = decode;
}

// set up auth keys
const open = configData.OPEN, geo = configData.GEO;

// set up URLS
const openURL = configData.OPENURL, timezoneURL = configData.TIMEZONEURL;

// get device width
const window = Dimensions.get('window');

// set up image display variables
let imageBg;

// START App
class App extends Component {
	// control requests
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			// loading screen
			isLoaded: false,
			// fonts
			fontLoaded: false,
			// open weather id
			openWeatherId: null,
			// current weather and location data
			currentIcon: '',
			currentLat: null,
			currentLng: null,
			currentLocation: null,
			// weather and location data
			location: '',
			desc: '',
			temp: '',
			high: '',
			low: '',
			humidity: '',
			wind: '',
			icon: '',
			sunset: '',
			sunrise: '',
			feelslike: '',
			// timezone data
			dstOffset: '',
			rawOffset: '',
			timeZoneId: '',
			timeZoneName: '',
			// colour background
			weekBg: null,
			weekBarBg: null,
			weekBarBgDarkest: null,
			// night or day
			night: false
		};
		// bind functions to state
		this.handleLoaded = this.handleLoaded.bind(this);
		this.updateSkyData = this.updateSkyData.bind(this);
		this.getSkyData = this.getSkyData.bind(this);
		this.nightOrDay = this.nightOrDay.bind(this);
		this.setBgDay = this.setBgDay.bind(this);
		this.setBgNight = this.setBgNight.bind(this);
		this.fallback = this.fallback.bind(this);
	}

	// handle loading
	handleLoaded = () => {
		this.setState({ isLoaded: true });
	};

	// update sky data function
	updateSkyData(val) {
		this.setState(
			{
				isLoaded: false,
				currentLat: val['googleLat'],
				currentLng: val['googleLng'],
				currentLocation: val['googleName']
			},
			// call sky data function with new values
			this.getSkyData
		);
	}

	// fallback function
	fallback() {
		if (this.props.currentData !== undefined){
		this.setState(
			{
				currentLocation: this.props.currentData.googleName,
				currentLat: this.props.currentData.googleLat,
				currentLng: this.props.currentData.googleLng
			},
			this.getSkyData
		)} else {
			this.props.navigation.navigate('SelectLocation');
			// this.setState(
			// 	{
			// 		currentLocation: 'Wellington, New Zealand',
			// 		currentLat: '-41.2865',
			// 		currentLng: '174.7762'
			// 	},
			// 	this.getSkyData
			// );
		}
	}

	// START component mounted
	componentDidMount = async () => {
		console.log('Inside APP MOUNT');
		// set component mounted
		this._isMounted = true;
		if (this._isMounted) {
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
								'is logged in, From componentDidMount in App.js'
							);
						}
					})
					.catch(function (error) {
						console.log('Error getting document:', error);
					});
				// get signed in users saved data on load
				homeRef.once('value', (snapshot) => {
					if (snapshot.exists()) {
						let home = snapshot.val();
						var homeLat = home.lat,
							homeLng = home.lng,
							homeLocation = home.location;
						this.setState(
							{
								currentLat: homeLat,
								currentLng: homeLng,
								currentLocation: homeLocation
							},
							this.getSkyData
						);
					} else {
						// run fallback function
						this.fallback();
					}
				});
				// no user
			} else {
				// run fallback function
				this.fallback();
			}
		}
	};
	// END component mounted

	// START sky data function
	getSkyData() {
		const myLat = this.state.currentLat, myLng = this.state.currentLng;
		// promise all data
		Promise.all([
			fetch(openURL + myLat + '&lon=' + myLng + '&units=metric&APPID=' + open)
		])
			// set json
			.then(([weatherData]) => {
				return Promise.all([weatherData.json()]);
			})
			// set state
			.then(([weatherData]) => {
				if (this._isMounted) {
					this.setState(
						{
							// weather data
							temp: Math.round(weatherData.current.temp),
							high: Math.round(weatherData.daily[0].temp.max),
							low: Math.round(weatherData.daily[0].temp.min),
							openWeatherId: weatherData.current.weather[0].id,
							desc: weatherData.current.weather[0].description,
							humidity: weatherData.current.humidity,
							wind: weatherData.current.wind_speed * 3.6,
							icon: weatherData.current.weather[0].icon,
							sunset: weatherData.current.sunset,
							sunrise: weatherData.current.sunrise,
							feelslike: weatherData.current.feels_like,
							hourly: weatherData.hourly,
							daily: weatherData.daily
						},
						this.findUserLocalTime
					);
				}
			})
			.catch((error) => {
				if (error.res) {
				} else if (error.request) {
					console.log(error.request, 'ERROR REQUEST');
				} else {
					console.log('error ', error.message);
				}
				console.log(error.config, 'ERROR CONFIG');
			});
	}
	// END sky data function

	// find users local time
	findUserLocalTime() {
		var myLat = this.state.currentLat,
			myLng = this.state.currentLng;

		// promise all data
		Promise.all([
			fetch(
				timezoneURL +
					myLat +
					',' +
					myLng +
					'&timestamp=' +
					this.state.sunset +
					'&key=' +
					geo
			)
		])
			// set json
			.then(([timezoneData]) => {
				return Promise.all([timezoneData.json()]);
			})
			// set state
			.then(([timezoneData]) => {
				if (this._isMounted) {
					this.setState(
						{
							// timezoneData
							timeZoneId: timezoneData.timeZoneId,
							timeZoneName: timezoneData.timeZoneName,
							dstOffset: timezoneData.dstOffset,
							rawOffset: timezoneData.rawOffset
						},
						this.nightOrDay
					);
				}
			})
			.catch((error) => {
				if (error.res) {
				} else if (error.request) {
					console.log(error.request, 'ERROR REQUEST');
				} else {
					console.log('error ', error.message);
				}
				console.log(error.config, 'ERROR CONFIG');
			});
	}

	// check night or day
	nightOrDay() {
		// night icon conditions
		var conditions = ['01n', '02n', '03n', '04n', '09n', '10n', '11n', '13n', '50n'];
		// loop conditions
		var checkNight = conditions.some((e) => this.state.icon.includes(e));
		// apply function based on result
		checkNight
			? (this.setState({ night: true }), this.setBgNight())
			: (this.setState({ night: false }), this.setBgDay());
	}

	// night colour bg logic
	setBgNight() {
		imageBg = colours.night;
		this.setState({
			weekBg: colours.night,
			weekBarBg: colours.nightDark,
			weekBarBgDarkest: colours.nightDarkest
		});
		// run app loaded function
		this.handleLoaded();
	}

	// day colour bg logic
	setBgDay() {
		let currentBg;
		let currentBarBg;
		let currentBarBgDarkest;

		var currentID = this.state.openWeatherId;

		// group 2xx: thunderstorm
		if (currentID >= 200 && currentID <= 232) {
			currentBg = colours.thunderStormDark;
			currentBarBg = colours.thunderStorm;
			currentBarBgDarkest = colours.thunderStormDarkest;
			// group 3xx: drizzle
		} else if (currentID >= 300 && currentID <= 331) {
			currentBg = colours.drizzleDark;
			currentBarBg = colours.drizzle;
			currentBarBgDarkest = colours.drizzleDarkest;
			// group 5xx: rain
		} else if (currentID >= 500 && currentID <= 531) {
			currentBg = colours.rainDark;
			currentBarBg = colours.rain;
			currentBarBgDarkest = colours.rainDarkest;
			// group 6xx: snow
		} else if (currentID >= 600 && currentID <= 622) {
			currentBg = colours.snowDark;
			currentBarBg = colours.snow;
			currentBarBgDarkest = colours.snowDarkest;
			// group 7xx: atmosphere
		} else if (currentID >= 701 && currentID <= 781) {
			currentBg = colours.atmosphereDark;
			currentBarBg = colours.atmosphere;
			currentBarBgDarkest = colours.atmosphereDarkest;
			// group 800: clear
		} else if (currentID == 800) {
			currentBg = colours.clearSkyDark;
			currentBarBg = colours.clearSky;
			currentBarBgDarkest = colours.clearSkyDarkest;
			// group 80x: clouds
		} else {
			currentBg = colours.cloudsDark;
			currentBarBg = colours.clouds;
			currentBarBgDarkest = colours.cloudsDarkest;
		}

		imageBg = currentBg;

		this.setState({
			weekBg: currentBg,
			weekBarBg: currentBarBg,
			weekBarBgDarkest: currentBarBgDarkest
		});

		// run app loaded function
		this.handleLoaded();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	// START render App
	render() {
		console.log('Inside APP RENDER');
		// declare loading variables in current state
		var { isLoaded } = this.state;

		// START loading function
		if (!isLoaded) {
			return (
				// START loading display
				<View style={appStyles.loader}>
					<LottieView
						style={{
							height: 250,
							width: 250
						}}
						ref={(animation) => {
							this.animation = animation;
						}}
						source={require('./assets/animations/loader.json')}
						autoPlay={true}
					/>
				</View>
				// END loading display
			);
			// END loading function
		} else {
			return (
				// START main container
				<View
					keyboardShouldPersistTaps='handled'
					style={{
						alignItems: 'center',
						backgroundColor: colours.spotGreyMed,
						flex: 1
					}}>
					{/* top bar */}
					<View style={{ height: 22 }} />
					<ScrollView
						loop={false}
						width={window.width}
						keyboardShouldPersistTaps='handled'
						showsButtons={false}
						horizontal={false}
						showsPagination={false}>
						{/* header */}
						<FirebaseProvider value={Firebase}>
							<Header
								navigation={this.props.navigation}
								currentLat={this.state.currentLat}
								currentLng={this.state.currentLng}
								currentLocation={this.state.currentLocation}
								currentBg={this.state.weekBg}
								currentBarBg={this.state.weekBarBg}
								currentBarBgDarkest={this.state.weekBarBgDarkest}
								updateSkyData={this.updateSkyData}
							/>
							{/* current */}
							<View style={{ backgroundColor: imageBg }}>
								<Current
									navigation={this.props.navigation}
									keyboardShouldPersistTaps='handled'
									weatherCode={this.state.openWeatherId}
									currentBg={this.state.weekBg}
									currentBarBg={this.state.weekBarBg}
									currentBarBgDarkest={this.state.weekBarBgDarkest}
									currentLat={this.state.currentLat}
									currentLng={this.state.currentLng}
									currentLocation={this.state.currentLocation}
									wind={this.state.wind}
									humidity={this.state.humidity}
									temp={this.state.temp}
									high={this.state.high}
									low={this.state.low}
									desc={this.state.desc}
									icon={this.state.icon}
									sunset={this.state.sunset}
									sunrise={this.state.sunrise}
									feelslike={this.state.feelslike}
									night={this.state.night}
									dstOffset={this.state.dstOffset}
									rawOffset={this.state.rawOffset}
									timeZoneId={this.state.timeZoneId}
									hourly={this.state.hourly}
									updateSkyData={this.updateSkyData}
								/>
							</View>
						</FirebaseProvider>
						{/* week */}
						<Week
							style={{ backgroundColor: imageBg }}
							weekBg={this.state.weekBg}
							weekBarBg={this.state.weekBarBg}
							weekBarBgDarkest={this.state.weekBarBgDarkest}
							weatherCode={this.state.openWeatherId}
							daily={this.state.daily}
						/>
						{/* footer */}
						<Footer />
					</ScrollView>
				</View>
				// END main container
			);
		}
		// }
	}
	// END render App
}
// END App

export default withFirebaseHOC(App);

// register button functionality
AppRegistry.registerComponent('basic-weather', () => ButtonBasics);

// register swiper functionality
AppRegistry.registerComponent('basic-weather', () => SwiperComponent);

// style
const appStyles = StyleSheet.create({
	loader: {
		alignItems: 'center',
		backgroundColor: colours.spotGreyMed,
		flex: 1,
		justifyContent: 'center'
	}
});
